/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#controllers/auth/register_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home', { version: 6 })

router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())

router.get('/login', async (ctx) => {
  return ctx.inertia.render('auth/login')
})
