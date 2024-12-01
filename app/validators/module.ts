import vine from '@vinejs/vine'
import { existsInOrganization, OrganizationMetaData } from './helpers/organizations.js'

export const moduleValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    name: vine.string().maxLength(100),
    statusId: vine.number().exists(existsInOrganization('statuses')),
  })
)
