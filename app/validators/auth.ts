import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254),
    email: vine.string().maxLength(254).email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
