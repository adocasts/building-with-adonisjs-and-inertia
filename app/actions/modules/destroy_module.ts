import Organization from '#models/organization'
import db from '@adonisjs/lucid/services/db'

type Params = {
  organization: Organization
  courseId: number
  id: number
}

export default class DestroyModule {
  static async handle({ organization, courseId, id }: Params) {
    const course = await organization.related('courses').query().where('id', courseId).firstOrFail()
    const module = await course.related('modules').query().where({ id }).firstOrFail()

    await db.transaction(async (trx) => {
      course.useTransaction(trx)
      module.useTransaction(trx)

      await module.delete()
      await course.related('modules').query().where('order', '>', module.order).decrement('order')
    })

    return module
  }
}
