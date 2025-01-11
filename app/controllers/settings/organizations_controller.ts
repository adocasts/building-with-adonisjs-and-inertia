import GetOrganizationUsers from '#actions/organizations/get_organization_users'
import SendOrganizationInvite from '#actions/organizations/send_organization_invite'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
import Role from '#models/role'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { organizationInviteValidator } from '#validators/organization'
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

  async inviteUser({ request, response, organization, session, auth }: HttpContext) {
    const data = await request.validateUsing(
      organizationInviteValidator,
      withOrganizationMetaData(organization.id)
    )

    await SendOrganizationInvite.handle({
      organization,
      invitedByUserId: auth.use('web').user!.id,
      data,
    })

    session.flash('success', 'Invitation has been sent')

    return response.redirect().back()
  }

  async cancelInvite({}: HttpContext) {}

  async removeUser({}: HttpContext) {}
}
