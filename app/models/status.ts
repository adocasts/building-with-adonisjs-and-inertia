import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Course from './course.js'
import Lesson from './lesson.js'
import Organization from './organization.js'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'

export default class Status extends compose(BaseModel, WithOrganization) {
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
