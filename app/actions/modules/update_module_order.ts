import Organization from '#models/organization'
import db from '@adonisjs/lucid/services/db'

type Params = {
  organization: Organization
  courseId: number
  ids: number[]
}

export default class UpdateModuleOrder {
  static async handle({ organization, courseId, ids }: Params) {
    const course = await organization.related('courses').query().where('id', courseId).firstOrFail()
    let modules = await course.related('modules').query()

    await db.transaction(async (trx) => {
      for (const module of modules) {
        const order = ids.indexOf(module.id) + 1

        module.useTransaction(trx)

        await module.merge({ order }).save()
      }
    })

    modules = modules.sort((a, b) => a.order - b.order)

    return modules
  }
}
