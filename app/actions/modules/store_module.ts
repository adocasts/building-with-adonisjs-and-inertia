import Course from '#models/course'
import Organization from '#models/organization'
import { moduleValidator } from '#validators/module'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  courseId: number
  data: Infer<typeof moduleValidator>
}

export default class StoreModule {
  static async handle({ organization, courseId, data }: Params) {
    const course = await organization.related('courses').query().where('id', courseId).firstOrFail()

    return course.related('modules').create({
      ...data,
      organizationId: organization.id,
      order: await this.#findNextOrder(course),
    })
  }

  static async #findNextOrder(course: Course) {
    const lastModule = await course
      .related('modules')
      .query()
      .select('order')
      .orderBy('order', 'desc')
      .first()

    return lastModule ? lastModule.order + 1 : 1
  }
}
