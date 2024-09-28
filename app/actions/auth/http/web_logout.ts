import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WebLogout {
  constructor(protected ctx: HttpContext) {}

  async handle() {
    await this.ctx.auth.use('web').logout()
  }
}
