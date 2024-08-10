/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home', { version: 6 })

router.get('/register', async (ctx) => {
  ctx.inertia.share({
    sharedFromRoute: true,
  })
  return ctx.inertia.render('auth/register', { stuff: 'here' })
})
