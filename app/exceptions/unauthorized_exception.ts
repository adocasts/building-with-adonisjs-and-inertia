import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  static status = 403
  static code = 'E_UNAUTHORIZED'
}
