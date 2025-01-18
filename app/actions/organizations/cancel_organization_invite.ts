import Organization from '#models/organization'
import { DateTime } from 'luxon'

type Params = {
  organization: Organization
  canceledByUserId: number
  inviteId: number
}

export default class CancelOrganizationInvite {
  static async handle({ organization, canceledByUserId, inviteId }: Params) {
    const invite = await organization.related('invites').query().where('id', inviteId).firstOrFail()

    invite.canceledAt = DateTime.now()
    invite.canceledByUserId = canceledByUserId

    await invite.save()

    return invite
  }
}
