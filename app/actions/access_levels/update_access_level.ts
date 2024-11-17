import Organization from '#models/organization'
import { accessLevelValidator } from '#validators/access_level'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof accessLevelValidator>
}

export default class UpdateAccessLevel {
  static async handle({ organization, id, data }: Params) {
    const accessLevel = await organization
      .related('accessLevels')
      .query()
      .where({ id })
      .firstOrFail()

    await accessLevel.merge(data).save()

    return accessLevel
  }
}
