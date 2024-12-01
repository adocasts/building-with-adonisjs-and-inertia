import Course from '#models/course'
import Organization from '#models/organization'

type Params = {
  id: number
  organization: Organization
}

export default class GetCourse {
  static async handle({ id, organization }: Params) {
    const course = await organization
      .related('courses')
      .query()
      .preload('accessLevel')
      .preload('difficulty')
      .preload('status')
      .withCount('lessons')
      .where({ id })
      .firstOrFail()

    const modules = await this.#getModules(course)

    return { course, modules }
  }

  static async #getModules(course: Course) {
    return course
      .related('modules')
      .query()
      .preload('status')
      .preload('lessons', (query) =>
        query.preload('accessLevel').preload('status').orderBy('order')
      )
      .orderBy('order')
  }
}
