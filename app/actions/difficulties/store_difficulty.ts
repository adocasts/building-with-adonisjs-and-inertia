import Organization from '#models/organization'
import { difficultyValidator } from '#validators/difficulty'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  data: Infer<typeof difficultyValidator>
}

export default class StoreDifficulty {
  static async handle({ organization, data }: Params) {
    const lastDifficulty = await organization
      .related('difficulties')
      .query()
      .orderBy('order', 'desc')
      .first()

    return organization.related('difficulties').create({
      ...data,
      order: lastDifficulty ? lastDifficulty.order + 1 : 0,
    })
  }
}
