import StoreOrganization from '#actions/organizations/store_organization'
import { organizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
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
