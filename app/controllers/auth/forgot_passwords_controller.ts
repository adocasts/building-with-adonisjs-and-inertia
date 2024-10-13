import ResetPassword from '#actions/auth/password_reset/reset_password'
import TrySendPasswordResetEmail from '#actions/auth/password_reset/try_send_password_reset_email'
import VerifyPasswordResetToken from '#actions/auth/password_reset/verify_password_reset_token'
import { passwordResetSendValidator, passwordResetValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class ForgotPasswordsController {
  #sentSessionKey = 'FORGOT_PASSWORD_SENT'

  async index({ inertia, session }: HttpContext) {
    const isSent = session.flashMessages.has(this.#sentSessionKey)

    return inertia.render('auth/forgot_password/index', { isSent })
  }

  async send({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(passwordResetSendValidator)

    await TrySendPasswordResetEmail.handle(data)

    session.flash(this.#sentSessionKey, true)

    return response.redirect().back()
  }

  async reset({ params, inertia }: HttpContext) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({
      encryptedValue: params.value,
    })

    return inertia.render('auth/forgot_password/reset', {
      value: params.value,
      email: user?.email,
      isValid,
    })
  }

  async update({ request, response, session, auth }: HttpContext) {
    const data = await request.validateUsing(passwordResetValidator)
    const user = await ResetPassword.handle({ data })

    await auth.use('web').login(user)

    session.flash('success', 'Your password has been updated')

    return response.redirect().toPath('/')
  }
}
