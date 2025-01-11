import vine from '@vinejs/vine'
import { OrganizationMetaData } from './helpers/organizations.js'
import { emailRule } from './auth.js'

export const organizationValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
  })
)

export const organizationInviteValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    email: emailRule.clone().unique(async (db, value, field) => {
      // 1. make sure there isn't already a pending invite
      const inviteMatch = await db
        .from('organization_invites')
        .where('organization_id', field.meta.organizationId)
        .where('email', value)
        .whereNull('accepted_at')
        .whereNull('canceled_at')
        .select('id')
        .first()

      if (inviteMatch) return false

      // 2. make sure the user isn't already an organization member
      const orgMatch = await db
        .from('organization_users')
        .join('users', 'organization_users.user_id', 'users.id')
        .where('organization_users.organization_id', field.meta.organizationId)
        .where('users.email', value)
        .select('users.id')
        .first()

      return !orgMatch
    }),
    roleId: vine.number().exists(async (db, value) => {
      const match = await db.from('roles').where('id', value).select('id').first()
      return !!match
    }),
  })
)
