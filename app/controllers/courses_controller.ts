import GetCourses from '#actions/courses/get_courses'
import StoreCourse from '#actions/courses/store_course'
import CourseDto from '#dtos/course'
import { courseValidator } from '#validators/course'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  async index({ inertia, organization }: HttpContext) {
    const courses = await GetCourses.handle({ organization })

    return inertia.render('courses/index', {
      courses: CourseDto.fromArray(courses),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      courseValidator,
      withOrganizationMetaData(organization.id)
    )

    const course = await StoreCourse.handle({
      organization,
      data,
    })

    return response.redirect().back() // TODO
  }
}
