import UpdateUserEmail from '#actions/settings/update_user_email'
import { updateEmailValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('settings/account')
  }

  async updateEmail({ request, response, session, auth }: HttpContext) {
    const data = await request.validateUsing(updateEmailValidator)
    const user = await auth.use('web').user!

    if (data.email === user.email) {
      session.flash('success', 'You are already using the submitted email')
      return response.redirect().back()
    }

    await UpdateUserEmail.handle({ user, data })

    session.flash('success', 'Your email has been updated')

    return response.redirect().back()
  }

  async destroy({}: HttpContext) {}
}
