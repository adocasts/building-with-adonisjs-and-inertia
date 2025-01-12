import WebRegister from '#actions/auth/http/web_register'
import OrganizationInviteDto from '#dtos/organization_invite'
import OrganizationInvite from '#models/organization_invite'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ inertia, session }: HttpContext) {
    const inviteId = session.get('invite_id')

    if (inviteId) {
      const invite = await OrganizationInvite.find(inviteId)

      if (!invite) {
        session.forget('invite_id')
      } else {
        inertia.share({ invite: new OrganizationInviteDto(invite) })
      }
    }

    return inertia.render('auth/register')
  }

  @inject()
  async store({ request, response, session }: HttpContext, webRegister: WebRegister) {
    const data = await request.validateUsing(registerValidator)

    // register the user
    const { invite } = await webRegister.handle({ data })

    session.flash('success', 'Welcome to PlotMyCourse')

    if (invite) {
      return response.redirect().toRoute('courses.index')
    }

    return response.redirect().toRoute('organizations.create')
  }
}
