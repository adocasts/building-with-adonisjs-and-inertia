import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Course from './course.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Lesson from './lesson.js'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'

export default class AccessLevel extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare order: number

  @column()
  declare isDefault: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @hasMany(() => Lesson)
  declare lessons: HasMany<typeof Lesson>
}
