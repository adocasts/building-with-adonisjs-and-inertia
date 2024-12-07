import Organization from '#models/organization'
import { lessonValidator } from '#validators/lesson'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof lessonValidator>
}

export default class UpdateLesson {
  static async handle({ organization, id, data }: Params) {
    const lesson = await organization.related('lessons').query().where({ id }).firstOrFail()

    await lesson.merge(data).save()

    return lesson
  }
}
