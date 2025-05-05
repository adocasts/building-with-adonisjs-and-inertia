import { passwordResetValidator } from '#validators/auth'
import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'
import ExpirePasswordResetTokens from './expire_password_reset_tokens.js'
import VerifyPasswordResetToken from './verify_password_reset_token.js'

type Params = {
  data: Infer<typeof passwordResetValidator>
  token: string
}

export default class ResetPassword {
  static async handle({ data, token }: Params) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: token })

    if (!isValid) {
      throw new Exception('The password reset token provided is invalid or expired', {
        status: 403,
        code: 'E_UNAUTHORIZED',
      })
    }

    await user!.merge({ password: data.password }).save()
    await ExpirePasswordResetTokens.handle({ user: user! })

    return user!
  }
}
