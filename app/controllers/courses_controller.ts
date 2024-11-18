import GetCourses from '#actions/courses/get_courses'
import CourseDto from '#dtos/course'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  async index({ inertia, organization }: HttpContext) {
    const courses = await GetCourses.handle({ organization })

    return inertia.render('courses/index', {
      courses: CourseDto.fromArray(courses),
    })
  }
}
