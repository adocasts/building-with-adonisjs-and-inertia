import WebLogout from '#actions/auth/http/web_logout'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  @inject()
  async handle({ response, session }: HttpContext, webLogout: WebLogout) {
    await webLogout.handle()

    session.flash('success', 'Cya next time')

    return response.redirect().toRoute('login.show')
  }
}
