import { computed } from 'vue';
import { menu } from './models'; //*definition of types TS

const navigationMenu = () => {
  //* menu date
  const menuListApi: menu[] = [
    {
      groupTitle: 'Modulos CRm',
      enabledGroup: true,
      separatorGroup: true,
      positionGroup: 1,
      listOptions: [
        {
          caption: 'quasar.dev',
          enabled: true,
          icon: 'payments',
          link: 'https://quasar.dev',
          route: '',
          separator: false,
          title: 'Ventas',
          type: 'multiple',
          listOptions1: [
            {
              title: 'Prospectos',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Leads',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Cuentas',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'accounts',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Contactos',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'contacts',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Oportunidades',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Cotizaciones',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
          ],
        },
        {
          caption: 'quasar.dev',
          enabled: true,
          icon: 'shopping_cart',
          link: 'https://quasar.dev',
          route: '',
          separator: false,
          title: 'Mercadeo',
          type: 'multiple',
          listOptions1: [
            {
              title: 'Campañas',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Público objetivo',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
          ],
        },
        // {
        //   caption: 'quasar.dev',
        //   enabled: true,
        //   icon: 'shopping_cart',
        //   link: 'https://quasar.dev',
        //   route: '',
        //   separator: false,
        //   title: 'Mercadeo',
        //   type: 'multiple',
        //   listOptions1: [
        //     {
        //       title: 'Gestión de talento humano',
        //       caption: 'quasar.dev',
        //       icon: 'analytics',
        //       link: 'https://quasar.dev',
        //       separator: false,
        //       enabled: true,
        //       type: 'multiple',
        //       listOptions2: [
        //         {
        //           title: 'Satisfaccion',
        //           caption: 'quasar.dev',
        //           icon: 'noise_control_off',
        //           link: 'https://quasar.dev',
        //           separator: false,
        //           enabled: true,
        //           type: 'only',
        //         },
        //         {
        //           title: 'ST',
        //           caption: 'quasar.dev',
        //           icon: 'noise_control_off',
        //           link: 'https://quasar.dev',
        //           separator: false,
        //           enabled: true,
        //           type: 'only',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Oportunidades',
        //       caption: 'quasar.dev',
        //       icon: 'analytics',
        //       link: 'https://quasar.dev',
        //       separator: false,
        //       enabled: true,
        //       type: 'multiple',
        //       listOptions2: [],
        //     },
        //   ],
        // },
        // {
        //   caption: 'quasar.dev',
        //   enabled: true,
        //   icon: 'maps_home_work',
        //   link: 'https://quasar.dev',
        //   route: 'dashboard',
        //   separator: false,
        //   title: 'Otros',
        //   type: 'only',
        //   listOptions1: [],
        // },
      ],
    },
    {
      groupTitle: 'Modulos más utilizados',
      enabledGroup: true,
      separatorGroup: true,
      positionGroup: 2,
      listOptions: [
        {
          caption: 'github.com/quasarframework',
          enabled: true,
          icon: 'account_circle',
          link: 'https://chat.quasar.dev',
          route: 'accounts',
          separator: false,
          title: 'Cuentas',
          type: 'only',
          listOptions1: [
            {
              title: 'Listado de cuentas',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              separator: false,
              enabled: true,
              type: 'multiple',
              listOptions2: [
                {
                  title: 'Satisfaccion',
                  caption: 'quasar.dev',
                  icon: 'noise_control_off',
                  link: 'https://quasar.dev',
                  separator: false,
                  enabled: true,
                  type: 'only',
                },
                {
                  title: 'ST',
                  caption: 'quasar.dev',
                  icon: 'noise_control_off',
                  link: 'https://quasar.dev',
                  separator: false,
                  enabled: true,
                  type: 'only',
                },
              ],
            },
            {
              title: 'Oportunidades',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              separator: false,
              enabled: true,
              type: 'multiple',
              listOptions2: [],
            },
          ],
        },
        {
          caption: 'chat.quasar.dev',
          enabled: true,
          icon: 'perm_contact_calendar',
          link: 'https://chat.quasar.dev',
          route: 'contacts',
          separator: false,
          title: 'Contactos',
          type: 'only',
        },
        {
          title: 'Prospectos',
          caption: 'quasar.dev',
          icon: 'analytics',
          link: 'https://quasar.dev',
          route: 'prospects',
          separator: false,
          enabled: true,
          type: 'only',
        },
        {
          title: 'Leads',
          caption: 'quasar.dev',
          icon: 'groups_2',
          link: 'https://quasar.dev',
          route: 'leads',
          separator: false,
          enabled: true,
          type: 'only',
        },
        // {
        //   caption: 'forum.quasar.dev',
        //   enabled: true,
        //   icon: 'work',
        //   link: 'https://forum.quasar.dev',
        //   route: 'contact',
        //   separator: false,
        //   title: 'Oportunidades',
        //   type: 'only',
        // },
        // {
        //   caption: '@quasarframework',
        //   enabled: true,
        //   icon: 'category',
        //   link: 'https://twitter.quasar.dev',
        //   route: 'contact',
        //   separator: false,
        //   title: 'Productos',
        //   type: 'only',
        // },
        // {
        //   caption: '@QuasarFramework',
        //   enabled: true,
        //   icon: 'local_offer',
        //   link: 'https://facebook.quasar.dev',
        //   route: 'contact',
        //   separator: false,
        //   title: 'Cotizaciones',
        //   type: 'only',
        // },
        // {
        //   caption: 'Community Quasar projects',
        //   enabled: false,
        //   icon: 'inventory',
        //   link: 'https://awesome.quasar.dev',
        //   route: 'contact',
        //   separator: false,
        //   title: 'Reservas',
        //   type: 'only',
        // },
        // {
        //   caption: 'Community Quasar projects',
        //   enabled: true,
        //   icon: 'inventory',
        //   link: 'https://awesome.quasar.dev',
        //   route: 'surveys',
        //   separator: false,
        //   title: 'Encuestas',
        //   type: 'only',
        // },
        // {
        //   caption: 'Template emails',
        //   enabled: true,
        //   icon: 'dynamic_feed',
        //   link: 'https://awesome.quasar.dev',
        //   route: 'emails',
        //   separator: false,
        //   title: 'Emails',
        //   type: 'only',
        // },
      ],
    },
    {
      groupTitle: 'Todos',
      enabledGroup: true,
      separatorGroup: true,
      positionGroup: 3,
      listOptions: [
        {
          caption: 'quasar.dev',
          enabled: true,
          icon: 'laptop',
          link: 'https://quasar.dev',
          route: 'laptop',
          separator: false,
          title: 'Mostrar todos',
          type: 'multiple',
          listOptions1: [
            {
              title: 'Campañas',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Público objetivo',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Prospectos',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Leads',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Cuentas',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'accounts',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Contactos',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'contacts',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Oportunidades',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
            {
              title: 'Cotizaciones',
              caption: 'quasar.dev',
              icon: 'analytics',
              link: 'https://quasar.dev',
              route: 'name',
              separator: false,
              enabled: true,
              type: 'only',
            },
          ],
        },
        // {
        //   caption: 'quasar.dev',
        //   enabled: true,
        //   icon: 'view_column',
        //   link: 'https://quasar.dev',
        //   route: '',
        //   separator: false,
        //   title: 'Negociaciones',
        //   type: 'multiple',
        // },
      ],
    },
  ];
  return {
    contentStyle: {
      backgroundColor: 'rgba(0,0,0,0.02)',
      color: '#555',
    },
    contentActiveStyle: {
      backgroundColor: '#eee',
      color: 'black',
    },
    thumbStyle: {
      right: '2px',
      borderRadius: '5px',
      backgroundColor: '#919191',
      width: '7px',
      opacity: '0.75',
    },
    listOrderMenu: computed(() =>
      menuListApi.sort((a, b) => (a.positionGroup > b.positionGroup ? 1 : -1))
    ), //* Computed: sort groups acending
  };
};

export default navigationMenu;
