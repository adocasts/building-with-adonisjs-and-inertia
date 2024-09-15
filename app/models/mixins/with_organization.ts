import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import Organization from '#models/organization'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export const WithOrganization = <T extends NormalizeConstructor<typeof BaseModel>>(
  superclass: T
) => {
  class MixinClass extends superclass {
    @column()
    declare organizationId: number

    @belongsTo(() => Organization)
    declare organization: BelongsTo<typeof Organization>
  }

  return MixinClass
}
