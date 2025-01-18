import Organization from '#models/organization'
import db from '@adonisjs/lucid/services/db'

type Params = {
  organization: Organization
  removeUserId: number
}

export default class RemoveOrganizationUser {
  static async handle({ organization, removeUserId }: Params) {
    const otherUserCount = await organization
      .related('users')
      .query()
      .whereNot('users.id', removeUserId)
      .count('users.id')
      .firstOrFail()

    await db.transaction(async (trx) => {
      organization.useTransaction(trx)

      await organization.related('users').detach([removeUserId])

      if (otherUserCount.$extras.count === '0') {
        await organization.delete()
      }
    })
  }
}
