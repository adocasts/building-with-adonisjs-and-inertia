import WebRegister from '#actions/auth/http/web_register'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  @inject()
  async store({ request, response }: HttpContext, webRegister: WebRegister) {
    const data = await request.validateUsing(registerValidator)

    // register the user
    await webRegister.handle({ data })

    return response.redirect().toPath('/')
  }
}
