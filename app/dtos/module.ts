import { BaseModelDto } from '@adocasts.com/dto/base'
import Module from '#models/module'
import StatusDto from '#dtos/status'
import OrganizationDto from './organization.js'
import LessonDto from './lesson.js'

export default class ModuleDto extends BaseModelDto {
  declare id: number
  declare statusId: number
  declare name: string
  declare notes: string | null
  declare order: number
  declare createdAt: string
  declare updatedAt: string
  declare status: StatusDto | null

  declare organizationId: number
  declare organization: OrganizationDto | null
  declare lessons: LessonDto[]

  constructor(module?: Module) {
    super()

    if (!module) return
    this.id = module.id
    this.statusId = module.statusId
    this.name = module.name
    this.notes = module.notes
    this.order = module.order
    this.createdAt = module.createdAt.toISO()!
    this.updatedAt = module.updatedAt.toISO()!
    this.status = module.status && new StatusDto(module.status)

    this.organizationId = module.organizationId
    this.organization = module.organization && new OrganizationDto(module.organization)
    this.lessons = LessonDto.fromArray(module.lessons)
  }
}
