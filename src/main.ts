import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App5.vue";
import router from './router';
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
// import { md2 } from 'vuetify/blueprints'

// load vuetify default setup
const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  // blueprint: md2,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          background: '#fffff5',
          surface: '#FFFFFF',
          third: '8f8f8f',
          button: "#2f9f2f",
        }
      },
      dark: {
        colors: {
          primary: '#ff51b5',
        }
      },
    },
  },
});

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app");
