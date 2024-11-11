import { BaseModelDto } from '@adocasts.com/dto/base'
import Status from '#models/status'
import CourseDto from '#dtos/course'
import OrganizationDto from './organization.js'

export default class StatusDto extends BaseModelDto {
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

  constructor(status?: Status) {
    super()

    if (!status) return
    this.id = status.id
    this.name = status.name
    this.color = status.color
    this.order = status.order
    this.isDefault = status.isDefault
    this.createdAt = status.createdAt.toISO()!
    this.updatedAt = status.updatedAt.toISO()!
    this.courses = CourseDto.fromArray(status.courses)

    this.organizationId = status.organizationId
    this.organization = status.organization && new OrganizationDto(status.organization)

    this.meta = status.$extras
  }
}
