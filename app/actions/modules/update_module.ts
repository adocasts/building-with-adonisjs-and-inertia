import Organization from '#models/organization'
import { moduleValidator } from '#validators/module'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof moduleValidator>
}

export default class UpdateModule {
  static async handle({ organization, id, data }: Params) {
    const module = await organization.related('modules').query().where({ id }).firstOrFail()

    await module.merge(data).save()

    return module
  }
}
