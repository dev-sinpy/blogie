import Vue from 'vue'
import axios from 'axios'

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const API = axios.create({
  baseURL: 'https://blogie-api.now.sh/api/'
})

// for use inside Vue files through this.$axios
Vue.prototype.$api = API

// Here we define a named export
// that we can later use inside .js files:
export { API }
