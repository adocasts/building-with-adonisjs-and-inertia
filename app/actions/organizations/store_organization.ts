import User from '#models/user'
import { organizationValidator } from '#validators/organization'
import { Infer } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import Organization from '#models/organization'
import Roles from '#enums/roles'
import { defaults } from '#config/organization'

type Params = {
  user: User
  data: Infer<typeof organizationValidator>
}

export default class StoreOrganization {
  static async handle({ user, data }: Params) {
    return db.transaction(async (trx) => {
      // 1. create our organization
      const organization = await Organization.create(data, { client: trx })

      // 2. make this user the admin
      const rolePromise = this.#assignAdmin(organization, user)
      const defaultsPromise = this.#createDefaults(organization)

      await Promise.all([rolePromise, ...defaultsPromise])

      return organization
    })
  }

  static async #assignAdmin(organization: Organization, user: User) {
    return organization.related('users').attach({
      [user.id]: {
        role_id: Roles.ADMIN,
      },
    })
  }

  static #createDefaults(organization: Organization) {
    return [
      organization.related('difficulties').createMany(defaults.difficulties),
      organization.related('statuses').createMany(defaults.statuses),
      organization.related('accessLevels').createMany(defaults.accessLevel),
    ]
  }
}
