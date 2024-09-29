import vine from '@vinejs/vine'

export const organizationValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
  })
)
