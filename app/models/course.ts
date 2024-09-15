import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import AccessLevel from './access_level.js'
import type { BelongsTo, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Difficulty from './difficulty.js'
import Status from './status.js'
import Module from './module.js'
import Lesson from './lesson.js'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'

export default class Course extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accessLevelId: number

  @column()
  declare difficultyId: number

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

  @belongsTo(() => AccessLevel)
  declare accessLevel: BelongsTo<typeof AccessLevel>

  @belongsTo(() => Difficulty)
  declare difficulty: BelongsTo<typeof Difficulty>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @hasMany(() => Module)
  declare modules: HasMany<typeof Module>

  @hasManyThrough([() => Lesson, () => Module])
  declare lessons: HasManyThrough<typeof Lesson>
}
