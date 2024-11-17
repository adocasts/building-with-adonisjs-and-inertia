import Organization from '#models/organization'
import { statusValidator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof statusValidator>
}

export default class UpdateStatus {
  static async handle({ organization, id, data }: Params) {
    const status = await organization.related('statuses').query().where({ id }).firstOrFail()

    await status.merge(data).save()

    return status
  }
}
