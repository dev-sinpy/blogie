import Vue from "vue";
import axios from "axios";

// We create our own axios instance and set a custom base URL.
//Primary api for blogie, all the network requests are done from this instance
const API = axios.create({
  baseURL: "https://blogie-api.now.sh/api/",
});

// for using inside Vue files through this.$axios
Vue.prototype.$api = API;

// Here we define a named export
// that we can later use inside .js files:
export { API };
