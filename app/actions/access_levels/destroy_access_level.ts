import Organization from '#models/organization'
import { accessLevelDestroyValidator } from '#validators/access_level'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof accessLevelDestroyValidator>
}

export default class DestroyAccessLevel {
  static async handle({ organization, id, data }: Params) {
    await db.transaction(async (trx) => {
      organization.useTransaction(trx)

      await organization.related('courses').query().where('accessLevelId', id).update({
        accessLevelId: data.replacementId,
      })

      await organization.related('lessons').query().where('accessLevelId', id).update({
        accessLevelId: data.replacementId,
      })

      const accessLevel = await organization
        .related('accessLevels')
        .query()
        .where({ id })
        .firstOrFail()

      await accessLevel.delete()

      return accessLevel
    })
  }
}
