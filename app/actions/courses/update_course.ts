import Organization from '#models/organization'
import { courseValidator } from '#validators/course'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof courseValidator>
}

export default class UpdateCourse {
  static async handle({ organization, id, data }: Params) {
    const course = await organization.related('courses').query().where({ id }).firstOrFail()

    await course.merge(data).save()

    return course
  }
}
