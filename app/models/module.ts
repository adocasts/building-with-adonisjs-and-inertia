import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Status from './status.js'
import Lesson from './lesson.js'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'

export default class Module extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number

  @column()
  declare name: string

  @column()
  declare notes: string | null

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @hasMany(() => Lesson)
  declare lessons: HasMany<typeof Lesson>
}
