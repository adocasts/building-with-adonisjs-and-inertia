import Status from '#models/status'
import Organization from '#models/organization'

type Params = {
  organization: Organization
  ids: number[]
}

export default class UpdateStatusOrder {
  static async handle({ organization, ids }: Params) {
    const statuses = await organization.getStatuses()

    return this.#updateOrder(statuses, ids)
  }

  static async #updateOrder(statuses: Status[], ids: number[]) {
    const promises = ids.map((id, order) => {
      const status = statuses.find((record) => record.id === id)
      const isDefault = order === 0

      status?.merge({
        order,
        isDefault,
      })

      return status?.save()
    })

    return Promise.all(promises)
  }
}
