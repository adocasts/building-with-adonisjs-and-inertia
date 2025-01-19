import GetAbilities, { Abilities } from '#actions/abilities/get_abilities'
import GetOrganizationUserRoleId from '#actions/organizations/get_organization_user_role_id'
import GetActiveOrganization from '#actions/organizations/http/get_active_organization'
import { activeCookieName } from '#config/organization'
import OrganizationDto from '#dtos/organization'
import Organization from '#models/organization'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class OrganizationMiddleware {
  constructor(protected getActiveOrganization: GetActiveOrganization) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user!

    try {
      ctx.organizationId = ctx.request.cookie(activeCookieName)

      const organization = await this.getActiveOrganization.handle()
      const roleId = await GetOrganizationUserRoleId.handle({
        organizationId: organization.id,
        userId: user.id,
      })

      ctx.organization = organization
      ctx.roleId = roleId
      ctx.can = GetAbilities.handle({ roleId })
    } catch (_) {
      ctx.session.reflash()
      return ctx.response.redirect().toRoute('organizations.create')
    }

    const organizations = await user.related('organizations').query().orderBy('name')

    ctx.inertia.share({
      organization: new OrganizationDto(ctx.organization),
      organizations: OrganizationDto.fromArray(organizations),
      can: ctx.can,
    })

    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    organizationId?: number
    organization: Organization
    roleId: number
    can: Abilities
  }
}
