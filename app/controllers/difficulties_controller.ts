import DestroyDifficulty from '#actions/difficulties/destroy_difficulty'
import StoreDifficulty from '#actions/difficulties/store_difficulty'
import UpdateDifficulty from '#actions/difficulties/update_difficulty'
import UpdateDifficultyOrder from '#actions/difficulties/update_difficulty_order'
import DifficultyDto from '#dtos/difficulty'
import { difficultyDestroyValidator, difficultyOrderValidator, difficultyValidator } from '#validators/difficulty'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
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

  async update({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(difficultyValidator)

    await UpdateDifficulty.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async order({ request, response, organization }: HttpContext) {
    const { ids } = await request.validateUsing(difficultyOrderValidator)
    
    await UpdateDifficultyOrder.handle({
      organization,
      ids
    })

    return response.redirect().back()
  }

  async destroy({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      difficultyDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    await DestroyDifficulty.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }
}
