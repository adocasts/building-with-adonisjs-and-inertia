import db from '@adonisjs/lucid/services/db'

type Params = {
  organizationId: number
  userId: number
}

export default class GetOrganizationUserRoleId {
  static async handle({ organizationId, userId }: Params) {
    const { roleId } = await db
      .from('organization_users')
      .where('organization_id', organizationId)
      .where('user_id', userId)
      .select('role_id as roleId')
      .firstOrFail()

    return roleId
  }
}
