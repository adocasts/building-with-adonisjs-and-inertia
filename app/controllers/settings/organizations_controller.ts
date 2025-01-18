import CancelOrganizationInvite from '#actions/organizations/cancel_organization_invite'
import GetOrganizationPendingInvites from '#actions/organizations/get_organization_pending_invites'
import GetOrganizationUsers from '#actions/organizations/get_organization_users'
import SendOrganizationInvite from '#actions/organizations/send_organization_invite'
import OrganizationInviteDto from '#dtos/organization_invite'
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
      invites: async () => {
        const pendingInvites = await GetOrganizationPendingInvites.handle({ organization })
        return OrganizationInviteDto.fromArray(pendingInvites)
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

  async cancelInvite({ response, organization, params, session, auth }: HttpContext) {
    await CancelOrganizationInvite.handle({
      organization,
      canceledByUserId: auth.use('web').user!.id,
      inviteId: params.id,
    })

    session.flash('success', 'The invitation has been canceled')

    return response.redirect().back()
  }

  async removeUser({}: HttpContext) {}
}
