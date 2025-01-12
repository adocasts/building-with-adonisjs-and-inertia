const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const ForgotPasswordsController = () => import('#controllers/auth/forgot_passwords_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/* ignore formatting, I find it easier to scan single-line route definitions */
/* prettier-ignore-start */
/* eslint-disable */

router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

router.group(() => {

  router.get('/', [ForgotPasswordsController, 'index']).as('index')
  router.post('/', [ForgotPasswordsController, 'send']).as('send')
  router.get('/reset/:value', [ForgotPasswordsController, 'reset']).as('reset')
  router.post('/reset', [ForgotPasswordsController, 'update']).as('update')

})
  .prefix('/forgot-password')
  .as('forgot_password')
  .use(middleware.guest())