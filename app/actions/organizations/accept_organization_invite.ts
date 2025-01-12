import UnauthorizedException from '#exceptions/unauthorized_exception'
import OrganizationInvite from '#models/organization_invite'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type Params = {
  inviteId: number
  user: User
}

export default class AcceptOrganizationInvite {
  static async handle({ inviteId, user }: Params) {
    const invite = await OrganizationInvite.findOrFail(inviteId)

    if (invite.email !== user.email) {
      throw new UnauthorizedException('Your email does not match the invitation')
    }

    if (invite.acceptedAt || invite.canceledAt) {
      return {
        invite: null,
        state: 'errorsBag',
        message: 'This invitation is no longer valid',
      }
    }

    await db.transaction(async (trx) => {
      invite.useTransaction(trx)

      const organization = await invite.related('organization').query().firstOrFail()

      await organization.related('users').attach({
        [user.id]: {
          role_id: invite.roleId,
        },
      })

      invite.acceptedAt = DateTime.now()

      await invite.save()
    })

    return {
      invite,
      state: 'success',
      message: `Invitation successfully accepted`,
    }
  }
}
