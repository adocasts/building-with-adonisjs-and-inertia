import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareExampleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)

    ctx.inertia.share({
      sharedFromMiddleware: 'from middleware',
    })

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
