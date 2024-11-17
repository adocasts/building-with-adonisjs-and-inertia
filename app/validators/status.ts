import vine from '@vinejs/vine'
import { existsInOrganization, OrganizationMetaData } from './helpers/organizations.js'

export const statusValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(20).hexCode(),
  })
)

export const statusDestroyValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    replacementId: vine.number().exists(existsInOrganization('statuses')),
  })
)

export const statusOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
