const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/* ignore formatting, I find it easier to scan single-line route definitions */
/* prettier-ignore-start */
/* eslint-disable */

router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router.get('/login', async (ctx) => {
  return ctx.inertia.render('auth/login')
}).as('login.show')
