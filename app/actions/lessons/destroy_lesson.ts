import Organization from '#models/organization'
import db from '@adonisjs/lucid/services/db'

type Params = {
  organization: Organization
  id: number
}

export default class DestroyLesson {
  static async handle({ organization, id }: Params) {
    const lesson = await organization.related('lessons').query().where({ id }).firstOrFail()

    await db.transaction(async (trx) => {
      lesson.useTransaction(trx)
      organization.useTransaction(trx)

      await lesson.delete()
      await organization
        .related('lessons')
        .query()
        .where('moduleId', lesson.moduleId)
        .where('order', '>', lesson.order)
        .decrement('order')
    })

    return lesson
  }
}
