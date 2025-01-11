import AcceptOrganizationInvite from '#actions/organizations/accept_organization_invite'
import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof registerValidator>
}

@inject()
export default class WebRegister {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.create(data)

    await this.ctx.auth.use('web').login(user)

    const invite = await this.#checkForOrganizationInvite(user)

    return { user, invite }
  }

  async #checkForOrganizationInvite(user: User) {
    const inviteId = this.ctx.session.get('invite_id')

    if (!inviteId) return

    const result = await AcceptOrganizationInvite.handle({
      inviteId,
      user,
    })

    this.ctx.session.forget('invite_id')
    this.ctx.session.flash('success', result.message)

    return result.invite
  }
}
