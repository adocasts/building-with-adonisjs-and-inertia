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
  router.put('/organizations/:id', [OrganizationsController, 'update']).as('organizations.update')
  router.get('/organizations/:id', [OrganizationsController, 'active']).as('organizations.active')
  router.delete('/organizations/:id', [OrganizationsController, 'destroy']).as('organizations.destroy')

}).use(middleware.auth())
