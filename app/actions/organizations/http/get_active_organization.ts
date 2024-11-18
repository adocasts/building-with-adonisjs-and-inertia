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
    let organization = await this.#query()
      .if(activeId, (query) => query.where('organizations.id', activeId!))
      .first()

    if (!organization) {
      organization = await this.#query().firstOrFail()
    }

    if (!activeId || organization.id !== activeId) {
      this.setActiveOrganization.handle({ id: organization.id })
    }

    return organization
  }

  #query() {
    return this.ctx.auth
      .use('web')
      .user!.related('organizations')
      .query()
      .preload('accessLevels', (query) => query.orderBy('order'))
      .preload('difficulties', (query) => query.orderBy('order'))
      .preload('statuses', (query) => query.orderBy('order'))
  }
}
