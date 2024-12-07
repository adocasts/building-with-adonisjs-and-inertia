import { DateTime } from 'luxon'
import LessonDto from './lesson.js'

export default class LessonFormDto {
  declare moduleId?: number
  declare accessLevelId?: number
  declare statusId?: number
  declare name: string
  declare publishAtDate: string | null
  declare publishAtTime: string | null

  constructor(lesson?: LessonDto) {
    if (!lesson) return

    const publishAt = lesson.publishAt ? DateTime.fromISO(lesson.publishAt) : null

    this.moduleId = lesson.moduleId
    this.accessLevelId = lesson.accessLevelId
    this.statusId = lesson.statusId
    this.name = lesson.name
    this.publishAtDate = publishAt ? publishAt.toFormat('yyyy-MM-dd') : null
    this.publishAtTime = publishAt ? publishAt.toFormat('HH:mm') : null
  }
}
