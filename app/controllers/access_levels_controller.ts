import DestroyAccessLevel from '#actions/access_levels/destroy_access_level'
import StoreAccessLevel from '#actions/access_levels/store_access_level'
import UpdateAccessLevel from '#actions/access_levels/update_access_level'
import UpdateAccessLevelOrder from '#actions/access_levels/update_access_level_order'
import AccessLevelDto from '#dtos/access_level'
import {
  accessLevelDestroyValidator,
  accessLevelOrderValidator,
  accessLevelValidator,
} from '#validators/access_level'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccessLevelsController {
  async index({ inertia, organization }: HttpContext) {
    const accessLevels = await organization
      .getAccessLevels()
      .withCount('courses')
      .withCount('lessons')

    return inertia.render('access_levels/index', {
      accessLevels: AccessLevelDto.fromArray(accessLevels),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(accessLevelValidator)

    await StoreAccessLevel.handle({ organization, data })

    return response.redirect().back()
  }

  async update({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(accessLevelValidator)

    await UpdateAccessLevel.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async order({ request, response, organization }: HttpContext) {
    const { ids } = await request.validateUsing(accessLevelOrderValidator)

    await UpdateAccessLevelOrder.handle({
      organization,
      ids,
    })

    return response.redirect().back()
  }

  async destroy({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      accessLevelDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    await DestroyAccessLevel.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }
}
