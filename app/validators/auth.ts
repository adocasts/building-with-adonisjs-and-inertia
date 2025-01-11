import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
    remember: vine.boolean().optional(),
  })
)
export const emailRule = vine.string().maxLength(254).email().normalizeEmail()

export const newEmailRule = emailRule.clone().unique(async (db, value) => {
  const exists = await db.from('users').where('email', value).select('id').first()
  return !exists
})

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254),
    email: newEmailRule.clone(),
    password: vine.string().minLength(8),
  })
)

export const passwordResetSendValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)

export const passwordResetValidator = vine.compile(
  vine.object({
    value: vine.string(),
    password: vine.string().minLength(8),
  })
)
