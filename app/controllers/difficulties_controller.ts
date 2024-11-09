import StoreDifficulty from '#actions/difficulties/store_difficulty'
import DifficultyDto from '#dtos/difficulty'
import { difficultyValidator } from '#validators/difficulty'
import type { HttpContext } from '@adonisjs/core/http'

export default class DifficultiesController {
  async index({ inertia, organization }: HttpContext) {
    const difficulties = await organization.getDifficulties().withCount('courses')

    return inertia.render('difficulties/index', {
      difficulties: DifficultyDto.fromArray(difficulties),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(difficultyValidator)

    await StoreDifficulty.handle({ organization, data })

    return response.redirect().back()
  }
}
