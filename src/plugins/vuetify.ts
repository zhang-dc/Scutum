import Vue from 'vue'
import Vuetify, {
  VInput,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VInput,
  },
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4181a1',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
})
