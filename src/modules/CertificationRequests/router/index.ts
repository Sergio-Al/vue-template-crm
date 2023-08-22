export default {
    name: 'Requests',
    component: () => import('src/layouts/HomeLayout.vue'),
    meta: {
      nameLabel: 'Solicitudes',
      requireAuth: false,
      isComplete: true,
    },
    children: [
      {
        path: '',
        name: 'requests',
        meta: {
          isComplete: true,
          nameLabel: 'Solicitudes',
        },
        component: () => import('../views/ViewList.vue'),
        props: (route: { query: { iduser: string; menu: boolean } }) => {
          return {
            nameModule: 'Solicitudes',
            idUser: route.query.iduser,
            menu: route.query.menu,
          };
        },
      },
    ],
  };
  