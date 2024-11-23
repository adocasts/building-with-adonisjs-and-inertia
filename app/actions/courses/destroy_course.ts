import Organization from '#models/organization'

type Params = {
  organization: Organization
  id: number
}

export default class DestroyCourse {
  static async handle({ organization, id }: Params) {
    const course = await organization.related('courses').query().where({ id }).firstOrFail()

    await course.delete()

    return course
  }
}
