import PasswordResetToken from '#models/password_reset_token'
import encryption from '@adonisjs/core/services/encryption'

type Params = {
  encryptedValue: string
}

export default class VerifyPasswordResetToken {
  static async handle({ encryptedValue }: Params) {
    const value = encryption.decrypt(encryptedValue)
    const token = await PasswordResetToken.findBy({ value })
    const user = await token?.related('user').query().first()

    return {
      isValid: token?.isValid,
      token,
      user,
    }
  }
}
