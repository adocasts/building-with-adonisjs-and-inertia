import User from '#models/user'

type Params = {
  user: User
  id: number
}

export default class DestroyOrganization {
  static async handle({ user, id }: Params) {
    const organization = await user
      .related('organizations')
      .query()
      .where('organizations.id', id)
      .firstOrFail()

    await organization.delete()

    return organization
  }
}
