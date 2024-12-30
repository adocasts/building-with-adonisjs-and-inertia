import vine from '@vinejs/vine'
import { newEmailRule } from './auth.js'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254),
  })
)

export const updateEmailValidator = vine.compile(
  vine.object({
    email: newEmailRule.clone(),
    password: vine.string(),
  })
)
