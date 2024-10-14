import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import SetActiveOrganization from './set_active_organization.js'

@inject()
export default class GetActiveOrganization {
  constructor(
    protected ctx: HttpContext,
    protected setActiveOrganization: SetActiveOrganization
  ) {}

  async handle() {
    const activeId = this.ctx.organizationId
    const organization = await this.ctx.auth
      .use('web')
      .user!.related('organizations')
      .query()
      .if(activeId, (query) => query.where('organizations.id', activeId!))
      .firstOrFail()

    if (!activeId || organization.id !== activeId) {
      this.setActiveOrganization.handle({ id: organization.id })
    }

    return organization
  }
}
