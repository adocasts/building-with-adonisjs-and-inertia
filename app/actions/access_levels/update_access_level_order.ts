import AccessLevel from '#models/access_level'
import Organization from '#models/organization'

type Params = {
  organization: Organization
  ids: number[]
}

export default class UpdateAccessLevelOrder {
  static async handle({ organization, ids }: Params) {
    const accessLevels = await organization.getAccessLevels()

    return this.#updateOrder(accessLevels, ids)
  }

  static async #updateOrder(accessLevels: AccessLevel[], ids: number[]) {
    const promises = ids.map((id, order) => {
      const accessLevel = accessLevels.find((record) => record.id === id)
      const isDefault = order === 0

      accessLevel?.merge({
        order,
        isDefault,
      })

      return accessLevel?.save()
    })

    return Promise.all(promises)
  }
}
