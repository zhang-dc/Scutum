import Vue from 'vue'
import Vuetify, {
  VApp,
  VInput,
  VTextField,
  VBtn,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VApp,
    VInput,
    VTextField,
    VBtn,
  },
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4181a1',
        secondary: '#86c1e0',
        accent: '#554475',
        error: '#d1534f',
        info: '#fee0a1',
        success: '#6cb77e',
        warning: '#f08264',
      },
    },
  },
  rtl: false,
})
