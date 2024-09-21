import { BaseModelDto } from '@adocasts.com/dto/base'
import EmailHistory from '#models/email_history'

export default class EmailHistoryDto extends BaseModelDto {
  declare id: number
  declare userId: number
  declare emailOld: string
  declare emailNew: string
  declare createdAt: string
  declare updatedAt: string

  constructor(emailHistory?: EmailHistory) {
    super()

    if (!emailHistory) return
    this.id = emailHistory.id
    this.userId = emailHistory.userId
    this.emailOld = emailHistory.emailOld
    this.emailNew = emailHistory.emailNew
    this.createdAt = emailHistory.createdAt.toISO()!
    this.updatedAt = emailHistory.updatedAt.toISO()!
  }
}