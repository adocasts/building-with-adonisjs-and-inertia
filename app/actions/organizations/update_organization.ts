import User from '#models/user'
import { organizationValidator } from '#validators/organization'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  id: number
  data: Infer<typeof organizationValidator>
}

export default class UpdateOrganization {
  static async handle({ user, id, data }: Params) {
    const organization = await user
      .related('organizations')
      .query()
      .where('organizations.id', id)
      .firstOrFail()

    await organization.merge(data).save()

    return organization
  }
}
