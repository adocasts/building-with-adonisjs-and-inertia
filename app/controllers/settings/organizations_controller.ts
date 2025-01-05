import GetOrganizationUsers from '#actions/organizations/get_organization_users'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
import Role from '#models/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  async index({ inertia, organization }: HttpContext) {
    return inertia.render('settings/organization', {
      users: async () => {
        const users = await GetOrganizationUsers.handle({ organization })
        return UserDto.fromArray(users)
      },
      roles: async () => {
        const roles = await Role.query().orderBy('name')
        return RoleDto.fromArray(roles)
      },
    })
  }

  async inviteUser({}: HttpContext) {}

  async cancelInvite({}: HttpContext) {}

  async removeUser({}: HttpContext) {}
}
