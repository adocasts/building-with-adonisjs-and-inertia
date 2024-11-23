import DestroyCourse from '#actions/courses/destroy_course'
import GetCourse from '#actions/courses/get_course'
import GetCourses from '#actions/courses/get_courses'
import StoreCourse from '#actions/courses/store_course'
import UpdateCourse from '#actions/courses/update_course'
import UpdateCourseTag from '#actions/courses/update_course_tag'
import CourseDto from '#dtos/course'
import { coursePatchTagValidator, courseValidator } from '#validators/course'
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

    return response.redirect().toRoute('courses.show', { id: course.id })
  }

  async show({ params, inertia, organization }: HttpContext) {
    const { course } = await GetCourse.handle({
      id: params.id,
      organization,
    })

    return inertia.render('courses/show', {
      course: new CourseDto(course),
    })
  }

  async update({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      courseValidator,
      withOrganizationMetaData(organization.id)
    )

    await UpdateCourse.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async tag({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      coursePatchTagValidator,
      withOrganizationMetaData(organization.id)
    )

    await UpdateCourseTag.handle({
      id: params.id,
      organization,
      data,
    })

    return response.redirect().back()
  }

  async destroy({ params, response, organization }: HttpContext) {
    await DestroyCourse.handle({
      id: params.id,
      organization,
    })

    return response.redirect().toRoute('courses.index')
  }
}
