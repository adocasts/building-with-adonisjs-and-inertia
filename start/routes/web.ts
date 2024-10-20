const OrganizationsController = () => import('#controllers/organizations_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/* ignore formatting, I find it easier to scan single-line route definitions */
/* prettier-ignore-start */
/* eslint-disable */


router.group(() => {
  
  router.on('/').renderInertia('home', { version: 6 }).use(middleware.organization())
  router.get('/organizations/create', [OrganizationsController, 'create']).as('organizations.create')
  router.post('/organizations', [OrganizationsController, 'store']).as('organizations.store')
  router.get('/organizations/:id', [OrganizationsController, 'active']).as('organizations.active')

}).use(middleware.auth())
