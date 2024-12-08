import vine from '@vinejs/vine'
import { existsInOrganization, OrganizationMetaData } from './helpers/organizations.js'
import { DateTime } from 'luxon'

export const lessonValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    name: vine.string().maxLength(150),
    publishAt: vine
      .date({ formats: { utc: true } })
      .nullable()
      .optional()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
    moduleId: vine.number().exists(existsInOrganization('modules')),
    accessLevelId: vine.number().exists(existsInOrganization('access_levels')),
    statusId: vine.number().exists(existsInOrganization('statuses')),
  })
)

export const lessonPatchTagValidator = vine.withMetaData<OrganizationMetaData>().compile(
  vine.object({
    statusId: vine
      .number()
      .exists(existsInOrganization('statuses'))
      .optional()
      .requiredIfMissing(['accessLevelId']),
    accessLevelId: vine
      .number()
      .exists(existsInOrganization('access_levels'))
      .optional()
      .requiredIfMissing(['statusId']),
  })
)
