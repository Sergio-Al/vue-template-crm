import { RouteRecordRaw } from 'vue-router';

import certificationsRouter from 'src/modules/Certifications/router';
import companiesRouter from 'src/modules/Companies/router';
import productsRouter from 'src/modules/ProductTypes/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/certifications',
    ...certificationsRouter,
  },
  {
    path: '/companies',
    ...companiesRouter,
  },
  {
    path: '/products',
    ...productsRouter,
  },
  {
    path: '/login',
    component: () => import('../pages/LoginView.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default routes;
