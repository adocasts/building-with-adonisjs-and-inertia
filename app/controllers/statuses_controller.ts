import DestroyStatus from '#actions/statuses/destroy_status'
import StoreStatus from '#actions/statuses/store_status'
import UpdateStatus from '#actions/statuses/update_status'
import UpdateStatusOrder from '#actions/statuses/update_status_order'
import StatusDto from '#dtos/status'
import { statusDestroyValidator, statusOrderValidator, statusValidator } from '#validators/status'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import type { HttpContext } from '@adonisjs/core/http'

export default class StatusesController {
  async index({ inertia, organization }: HttpContext) {
    const statuses = await organization
      .getStatuses()
      .withCount('courses')
      .withCount('modules')
      .withCount('lessons')

    return inertia.render('statuses/index', {
      statuses: StatusDto.fromArray(statuses),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(statusValidator)

    await StoreStatus.handle({ organization, data })

    return response.redirect().back()
  }

  async update({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(statusValidator)

    await UpdateStatus.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async order({ request, response, organization }: HttpContext) {
    const { ids } = await request.validateUsing(statusOrderValidator)

    await UpdateStatusOrder.handle({
      organization,
      ids,
    })

    return response.redirect().back()
  }

  async destroy({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      statusDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    await DestroyStatus.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }
}
