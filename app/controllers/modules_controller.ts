import DestroyModule from '#actions/modules/destroy_module'
import StoreModule from '#actions/modules/store_module'
import UpdateModule from '#actions/modules/update_module'
import UpdateModuleTag from '#actions/modules/update_module_tag'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { modulePatchTagValidator, moduleValidator } from '#validators/module'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModulesController {
  async store({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      moduleValidator,
      withOrganizationMetaData(organization.id)
    )

    await StoreModule.handle({
      courseId: params.courseId,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async update({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      moduleValidator,
      withOrganizationMetaData(organization.id)
    )

    await UpdateModule.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async tag({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      modulePatchTagValidator,
      withOrganizationMetaData(organization.id)
    )

    await UpdateModuleTag.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async destroy({ params, response, organization }: HttpContext) {
    await DestroyModule.handle({
      courseId: params.courseId,
      id: params.id,
      organization,
    })

    return response.redirect().back()
  }
}
