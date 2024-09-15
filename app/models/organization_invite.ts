import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Role from './role.js'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'

export default class OrganizationInvite extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invitedByUserId: number

  @column()
  declare canceledByUserId: number | null

  @column()
  declare roleId: number

  @column()
  declare email: string

  @column.dateTime()
  declare acceptedAt: DateTime | null

  @column.dateTime()
  declare canceledAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'invitedByUserId',
  })
  declare invitedByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'canceledByUserId',
  })
  declare canceledByUser: BelongsTo<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
