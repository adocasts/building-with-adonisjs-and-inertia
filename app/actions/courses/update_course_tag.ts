import Organization from '#models/organization'
import { coursePatchTagValidator } from '#validators/course'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof coursePatchTagValidator>
}

export default class UpdateCourseTag {
  static async handle({ organization, id, data }: Params) {
    const course = await organization.related('courses').query().where({ id }).firstOrFail()

    await course.merge(data).save()

    return course
  }
}
