/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { registerValidator } from '#validators/auth'
import router from '@adonisjs/core/services/router'

let renderCount = 0
let refreshCount1 = 0
let refreshCount2 = 0
let lazyCount = 0

router.on('/').renderInertia('home', { version: 6 })

router.get('/register', async (ctx) => {
  ctx.inertia.share({
    sharedFromRoute: true,
  })
  return ctx.inertia.render('auth/register', { stuff: 'here' })
})

router.get('/login', async (ctx) => {
  return ctx.inertia.render('auth/login', {
    renderCount: ++renderCount,
    refreshCount1: () => ++refreshCount1,
    refreshCount2: () => ++refreshCount2,
    lazyCount: ctx.inertia.lazy(() => ++lazyCount),
  })
})

router.post('/register', async (ctx) => {
  // const data = await ctx.request.validateUsing(registerValidator)
  // console.log({ data })

  ctx.session.flash('success', 'This is a message from AdonisJS')

  return ctx.response.redirect().back()
})
