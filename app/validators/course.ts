import vine from '@vinejs/vine'
import { existsInOrganization, OrganizationMetaData } from './helpers/organizations.js'

export const courseValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    name: vine.string().maxLength(150),
    statusId: vine.number().exists(existsInOrganization('statuses')),
    difficultyId: vine.number().exists(existsInOrganization('difficulties')),
    accessLevelId: vine.number().exists(existsInOrganization('access_levels')),
    notes: vine.string().optional(),
  })
)
