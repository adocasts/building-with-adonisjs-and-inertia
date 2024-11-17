import vine from '@vinejs/vine'
import { existsInOrganization, OrganizationMetaData } from './helpers/organizations.js'

export const accessLevelValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(20).hexCode(),
  })
)

export const accessLevelDestroyValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    replacementId: vine.number().exists(existsInOrganization('access_levels')),
  })
)

export const accessLevelOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
