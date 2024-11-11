import Organization from '#models/organization'
import { difficultyDestroyValidator } from '#validators/difficulty'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof difficultyDestroyValidator>
}

export default class DestroyDifficulty {
  static async handle({ organization, id, data }: Params) {
    await db.transaction(async (trx) => {
      organization.useTransaction(trx)

      await organization.related('courses').query().where('difficultyId', id).update({
        difficultyId: data.replacementId,
      })

      const difficulty = await organization
        .related('difficulties')
        .query()
        .where({ id })
        .firstOrFail()

      await difficulty.delete()

      return difficulty
    })
  }
}
