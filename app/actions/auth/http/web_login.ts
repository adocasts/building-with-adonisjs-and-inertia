import AcceptOrganizationInvite from '#actions/organizations/accept_organization_invite'
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import limiter from '@adonisjs/limiter/services/main'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof loginValidator>
}

@inject()
export default class WebLogin {
  constructor(protected ctx: HttpContext) {}

  get limit() {
    return limiter.use({
      requests: 3,
      duration: '3 hours',
      blockDuration: '24 hours',
    })
  }

  async handle({ data }: Params) {
    const key = this.getRateKey(data.email)

    const [error, user] = await this.limit.penalize(key, () => {
      return User.verifyCredentials(data.email, data.password)
    })

    if (error) {
      this.ctx.session.flashAll()
      this.ctx.session.flashErrors({
        E_TOO_MANY_REQUESTS: 'Too many login attempts, please try again later',
      })
      return null
    }

    await this.ctx.auth.use('web').login(user, data.remember)
    await this.#checkForOrganizationInvite(user)

    return user
  }

  getRateKey(email: string) {
    return `login_${this.ctx.request.ip()}_${email}`
  }

  async clearRateLimits(email: string) {
    return this.limit.delete(this.getRateKey(email))
  }

  async #checkForOrganizationInvite(user: User) {
    const inviteId = this.ctx.session.get('invite_id')

    if (!inviteId) return

    const result = await AcceptOrganizationInvite.handle({
      inviteId,
      user,
    })

    this.ctx.session.forget('invite_id')
    this.ctx.session.flash(result.state, result.message)
  }
}
