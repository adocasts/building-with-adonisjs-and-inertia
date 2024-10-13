import User from '#models/user'
import { DateTime } from 'luxon'

type Params = {
  user: User
}

export default class ExpirePasswordResetTokens {
  static async handle({ user }: Params) {
    await user
      .related('passwordResetTokens')
      .query()
      .where('expiresAt', '>=', DateTime.now().toSQL())
      .update({
        expiresAt: DateTime.now().toSQL(),
        updatedAt: DateTime.now().toSQL(),
      })
  }
}
