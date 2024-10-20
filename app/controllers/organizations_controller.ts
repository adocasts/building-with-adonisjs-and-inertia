import SetActiveOrganization from '#actions/organizations/http/set_active_organization'
import StoreOrganization from '#actions/organizations/store_organization'
import { organizationValidator } from '#validators/organization'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrganizationsController {
  constructor(protected setActiveOrganization: SetActiveOrganization) {}

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('organizations/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)
    const organization = await StoreOrganization.handle({
      user: auth.use('web').user!,
      data,
    })

    this.setActiveOrganization.handle({ id: organization.id })

    return response.redirect().toPath('/')
  }

  async active({ response, params }: HttpContext) {
    this.setActiveOrganization.handle({ id: params.id })

    return response.redirect().toPath('/')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
