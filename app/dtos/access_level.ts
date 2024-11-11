import { BaseModelDto } from '@adocasts.com/dto/base'
import AccessLevel from '#models/access_level'
import CourseDto from '#dtos/course'
import OrganizationDto from './organization.js'

export default class AccessLevelDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare color: string
  declare order: number
  declare isDefault: boolean
  declare createdAt: string
  declare updatedAt: string
  declare courses: CourseDto[]

  declare organizationId: number
  declare organization: OrganizationDto | null

  declare meta: Record<string, any>

  constructor(accessLevel?: AccessLevel) {
    super()

    if (!accessLevel) return
    this.id = accessLevel.id
    this.name = accessLevel.name
    this.color = accessLevel.color
    this.order = accessLevel.order
    this.isDefault = accessLevel.isDefault
    this.createdAt = accessLevel.createdAt.toISO()!
    this.updatedAt = accessLevel.updatedAt.toISO()!
    this.courses = CourseDto.fromArray(accessLevel.courses)

    this.organizationId = accessLevel.organizationId
    this.organization = accessLevel.organization && new OrganizationDto(accessLevel.organization)

    this.meta = accessLevel.$extras
  }
}
