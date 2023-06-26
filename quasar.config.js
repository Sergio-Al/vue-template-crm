/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function (ctx) {
  if (ctx.dev) {
    var dotenv = require('dotenv').config({ path: '.env.development' });
  } else {
    var dotenv = require('dotenv').config({ path: '.env.quality' });
  }
  return {
    eslint: {
      // fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['axios', 'global-components', ''],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      server: {
        type: 'https', // NECESSARY (alternative is type 'http')

        options: {
          // Use ABSOLUTE paths or path.join(__dirname, 'root/relative/path')
          key: path.join(__dirname, '/src/cert/server.key'),
          //pfx: "/path/to/server.pfx",
          cert: path.join(__dirname, '/src/cert/server.crt'),
          //ca: "/path/to/ca.pem",
          //passphrase: 'webpack-dev-server' // do you need it?
        },
      },
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      env: {
        HANSACRM3_URL: dotenv.parsed.HANSACRM3_URL,
        CRM4_LB_01: dotenv.parsed.CRM4_LB_01,
        CRM4_LB_03: dotenv.parsed.CRM4_LB_03,
        CRM4_LB_04: dotenv.parsed.CRM4_LB_04,
        CRM4_LB_05: dotenv.parsed.CRM4_LB_05,
        CRM4_LB_GLOBAL: dotenv.parsed.CRM4_LB_GLOBAL,
        CRM4_LB_USERS_PREFERENCES: dotenv.parsed.CRM4_LB_USERS_PREFERENCES,
        CRM4_NS_07: dotenv.parsed.CRM4_NS_07,
        CRM_REP_01: dotenv.parsed.CRM_REP_01,
      },
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      //extendViteConf(viteConf) {},
      // viteVuePluginOptions: {},

      vitePlugins: [
        [
          'rollup-plugin-copy',
          {
            targets: [
              {
                // Syntax code, check doc in https://www.npmjs.com/package/rollup-plugin-copy
                src: '/src',
                dest: '/dist',
              },
              {
                dest: 'dest/Custom', // example when building SPA
              },
            ],
          },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      server: {
        type: 'https', // NECESSARY (alternative is type 'http')

        options: {
          // Use ABSOLUTE paths or path.join(__dirname, 'root/relative/path')
          key: path.join(__dirname, '/src/cert/server.key'),
          //pfx: "/path/to/server.pfx",
          cert: path.join(__dirname, '/src/cert/server.crt'),
          //ca: "/path/to/ca.pem",
          //passphrase: 'webpack-dev-server' // do you need it?
        },
      },
      https: false,
      open: true, // opens browser window automatically
      port: dotenv.parsed.PORT,
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        loadingBar: {
          color: 'white',
          size: '3px',
        },
        loading: {
          spinner: 'QSpinnerPuff',
          spinnerSize: '40px',
          backgroundColor: 'grey-8',
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      lang: 'es', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: [
        'QInput',
        'QSelect',
        'QTable',
        'QList',
        'QItem',
        'QSeparator',
        'QExpansionItem',
      ],
      // directives: [],

      // Quasar plugins
      plugins: [
        'AppFullscreen',
        'Notify',
        'Dialog',
        'Loading',
        'BottomSheet',
        'Dark',
        'LoadingBar',
        'Meta',
        'AppFullscreen',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: 'all',

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    // rootComponent: 'src/App.vue',
    // router: 'src/router/index',
    // store: 'src/store/index',
    // registerServiceWorker: 'src-pwa/register-service-worker',
    // serviceWorker: 'src-pwa/custom-service-worker',
    // pwaManifestFile: 'src-pwa/manifest.json',
    // electronMain: 'src-electron/electron-main',
    // electronPreload: 'src-electron/electron-preload'
    //},

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'frontend',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ['my-content-script'],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
