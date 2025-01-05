import Organization from '#models/organization'

type Params = {
  organization: Organization
}

export default class GetOrganizationUsers {
  static async handle({ organization }: Params) {
    return organization.related('users').query().orderBy('createdAt')
  }
}
