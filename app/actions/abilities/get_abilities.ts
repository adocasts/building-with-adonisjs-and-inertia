import GetOrganizationAbilities, { OrganizationAbilities } from './get_organization_abilities.js'

type Params = {
  roleId: number
}

export type Abilities = {
  organization: OrganizationAbilities
}

export default class GetAbilities {
  static handle({ roleId }: Params): Abilities {
    return {
      organization: GetOrganizationAbilities.handle({ roleId }),
    }
  }
}
