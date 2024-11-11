import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'

export type OrganizationMetaData = {
  organizationId: number
}

export function withOrganizationMetaData(id: number) {
  return {
    meta: {
      organizationId: id,
    },
  }
}

export function existsInOrganization(table: string, column: string = 'id') {
  return async (db: Database, value: string | number, field: FieldContext) => {
    const result = await db
      .from(table)
      .select(column)
      .where(column, value)
      .where('organization_id', field.meta.organizationId)
      .first()

    return !!result
  }
}
