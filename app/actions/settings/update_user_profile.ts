import User from '#models/user'
import { updateProfileValidator } from '#validators/setting'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  data: Infer<typeof updateProfileValidator>
}

export default class UpdateUserProfile {
  static async handle({ user, data }: Params) {
    await user.merge(data).save()
  }
}
