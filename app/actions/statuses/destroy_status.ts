import Organization from '#models/organization'
import { statusDestroyValidator } from '#validators/status'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof statusDestroyValidator>
}

export default class DestroyStatus {
  static async handle({ organization, id, data }: Params) {
    await db.transaction(async (trx) => {
      organization.useTransaction(trx)

      await organization.related('courses').query().where('statusId', id).update({
        statusId: data.replacementId,
      })

      await organization.related('modules').query().where('statusId', id).update({
        statusId: data.replacementId,
      })

      await organization.related('lessons').query().where('statusId', id).update({
        statusId: data.replacementId,
      })

      const status = await organization.related('statuses').query().where({ id }).firstOrFail()

      await status.delete()

      return status
    })
  }
}
