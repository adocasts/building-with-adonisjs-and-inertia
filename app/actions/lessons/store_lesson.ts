import Lesson from '#models/lesson'
import Organization from '#models/organization'
import { lessonValidator } from '#validators/lesson'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  data: Infer<typeof lessonValidator>
}

export default class StoreLesson {
  static async handle({ organization, data }: Params) {
    return organization.related('lessons').create({
      ...data,
      order: await this.#findNextOrder(data.moduleId),
    })
  }

  static async #findNextOrder(moduleId: number) {
    const lastModuleLesson = await Lesson.query()
      .where({ moduleId })
      .select('order')
      .orderBy('order', 'desc')
      .first()

    return lastModuleLesson ? lastModuleLesson.order + 1 : 0
  }
}
