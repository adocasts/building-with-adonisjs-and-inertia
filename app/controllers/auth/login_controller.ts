import WebLogin from '#actions/auth/http/web_login'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  @inject()
  async store({ request, response }: HttpContext, webLogin: WebLogin) {
    const data = await request.validateUsing(loginValidator)

    const user = await webLogin.handle({ data })

    if (!user) {
      return response.redirect().back()
    }

    return response.redirect().toRoute('courses.index')
  }
}
