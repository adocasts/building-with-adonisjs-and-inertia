import UpdateUserProfile from '#actions/settings/update_user_profile'
import { updateProfileValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('settings/profile')
  }

  async update({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)

    await UpdateUserProfile.handle({
      user: auth.use('web').user!,
      data,
    })

    session.flash('success', 'Your profile has been updated')

    return response.redirect().back()
  }
}
