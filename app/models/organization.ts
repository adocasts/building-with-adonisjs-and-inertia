import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Course from './course.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Module from './module.js'
import Lesson from './lesson.js'
import AccessLevel from './access_level.js'
import Difficulty from './difficulty.js'
import Status from './status.js'
import OrganizationInvite from './organization_invite.js'
import User from './user.js'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @hasMany(() => Module)
  declare modules: HasMany<typeof Module>

  @hasMany(() => Lesson)
  declare lessons: HasMany<typeof Lesson>

  @hasMany(() => AccessLevel)
  declare accessLevels: HasMany<typeof AccessLevel>

  @hasMany(() => Difficulty)
  declare difficulties: HasMany<typeof Difficulty>

  @hasMany(() => Status)
  declare statuses: HasMany<typeof Status>

  @hasMany(() => OrganizationInvite)
  declare invites: HasMany<typeof OrganizationInvite>

  @manyToMany(() => User, {
    pivotTable: 'organization_users',
    pivotColumns: ['role_id'],
  })
  declare users: ManyToMany<typeof User>

  getDifficulties() {
    return (<Organization>this).related('difficulties').query().orderBy('order')
  }

  getAccessLevels() {
    return (<Organization>this).related('accessLevels').query().orderBy('order')
  }

  getStatuses() {
    return (<Organization>this).related('statuses').query().orderBy('order')
  }
}
