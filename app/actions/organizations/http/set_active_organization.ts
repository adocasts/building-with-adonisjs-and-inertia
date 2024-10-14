import { activeCookieName } from '#config/organization'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

type Params = {
  id: number
}

@inject()
export default class SetActiveOrganization {
  constructor(protected ctx: HttpContext) {}

  async handle({ id }: Params) {
    this.ctx.organizationId = id
    this.ctx.response.cookie(activeCookieName, id)
  }
}
