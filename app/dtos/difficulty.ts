import { BaseModelDto } from '@adocasts.com/dto/base'
import Difficulty from '#models/difficulty'
import CourseDto from '#dtos/course'
import OrganizationDto from './organization.js'

export default class DifficultyDto extends BaseModelDto {
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

  constructor(difficulty?: Difficulty) {
    super()

    if (!difficulty) return
    this.id = difficulty.id
    this.name = difficulty.name
    this.color = difficulty.color
    this.order = difficulty.order
    this.isDefault = difficulty.isDefault
    this.createdAt = difficulty.createdAt.toISO()!
    this.updatedAt = difficulty.updatedAt.toISO()!
    this.courses = CourseDto.fromArray(difficulty.courses)

    this.organizationId = difficulty.organizationId
    this.organization = difficulty.organization && new OrganizationDto(difficulty.organization)

    this.meta = difficulty.$extras
  }
}
