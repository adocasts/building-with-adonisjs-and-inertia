import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('settings/organization')
  }

  async inviteUser({}: HttpContext) {}

  async cancelInvite({}: HttpContext) {}

  async removeUser({}: HttpContext) {}
}
