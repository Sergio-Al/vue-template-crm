export default {
  name: 'Certifcations',
  component: () => import('src/layouts/HomeLayout.vue'),
  meta: {
    nameLabel: 'Certificaciones',
    requireAuth: false,
    isComplete: true,
  },
  children: [
    {
      path: '',
      name: 'certifications',
      meta: {
        isComplete: true,
        nameLabel: 'Certificaciones',
      },
      component: () => import('../views/ViewList.vue'),
      props: (route: { query: { iduser: string; menu: boolean } }) => {
        return {
          nameModule: 'Certificaciones',
          idUser: route.query.iduser,
          menu: route.query.menu,
        };
      },
    },
    {
      path: 'requests',
      name: 'certifications-request',
      meta: {
        isComplete: true,
        nameLabel: 'Solicitudes de Certificación',
      },
      component: () => import('../views/ViewListCertificationsRequest.vue'),
      props: (route: { query: { iduser: string; menu: boolean } }) => {
        return {
          nameModule: 'CertificationsRequest',
          idUser: route.query.iduser,
          menu: route.query.menu,
        };
      },
    },
    {
      path: 'main',
      name: 'certificationsMain',
      meta: {
        isComplete: true,
        nameLabel: 'Certificaciones',
      },
      component: () => import('../views/ViewList.vue'),
      props: (route: { query: { iduser: string; menu: boolean } }) => {
        const { iduser = '', menu = true } = route.query;
        return {
          nameModule: 'CertificationsRequest',
          idUser: iduser,
          menu: menu,
        };
      },
    },
  ],
};
