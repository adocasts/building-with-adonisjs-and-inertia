import User from '#models/user'
import { updateEmailValidator } from '#validators/setting'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  data: Infer<typeof updateEmailValidator>
}

export default class UpdateUserEmail {
  static async handle({ user, data }: Params) {
    const emailOld = user.email

    await User.verifyCredentials(emailOld, data.password)

    await db.transaction(async (trx) => {
      user.useTransaction(trx)
      user.email = data.email

      await user.save()
      await user.related('emailHistories').create({
        emailNew: data.email,
        emailOld,
      })
    })

    return user
  }
}
