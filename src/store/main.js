//import axios from "axios";
import { LocalStorage } from "quasar";
import { AUTH } from "../boot/firebase";
import { API } from "../boot/axios";
import { Dark } from "quasar";

//let domain = "https://blogie-api.now.sh/api";

const state = {
  loginPopup: false,
  registerPopup: false,
  interestsPopup: false,
  initialPopup: false,
  tags: [
    {
      tag: "android",
      popularity: 1,
      enabled: true,
    },
    {
      tag: "ios",
      popularity: 1,
      enabled: true,
    },
    {
      tag: "windows",
      popularity: 1,
      enabled: true,
    },
    {
      tag: "programming",
      popularity: 1,
      enabled: true,
    },
    {
      tag: "news",
      popularity: 1,
      enabled: true,
    },
    {
      tag: "random",
      popularity: 1,
      enabled: false,
    },
  ],

  user: {
    email: null,
    verified: null,
    preferences: null,
  },
  isAuthenticated: false,
  status: null,
  loadingButton: false,
  darkMode: true,
  defaultTags: null,
};

const mutations = {
  SET_USER(state, user) {
    state.isAuthenticated = true;
    state.user.email = user.email;
    state.user.verified = user.emailVerified;
  },

  SET_POPUP(state, payload) {
    state[`${payload.popup}`] = payload.flag;
  },

  SET_TAGS(state, tags) {
    state.tags = tags;
  },

  SET_DEFAULT_TAGS(state, tags) {
    state.defaultTags = tags;
  },

  SET_DARK_MODE(state, darkMode) {
    state.darkMode = !state.darkMode;
  },

  SET_STATUS(state, status) {
    state.status = status;
  },

  SET_LOADING(state, status) {
    state.status = status;
  },

  RESET_USER(state) {
    state.status = "user not found";
    state.user.email = null;
    state.user.verified = null;
    state.user.preferences = null;
  },
};

const actions = {
  fetchUser({ commit }, payload) {
    console.log("getting user");
    if (payload) {
      console.log("payload is provided");
      commit("SET_USER", payload);
    } else {
      AUTH.onAuthStateChanged((user) => {
        if (user) {
          // Signed in. Let Vuex know.
          commit("SET_USER", user);
        } else {
          // Signed out. Let Vuex know.
          commit("RESET_USER");
          LocalStorage.remove("tags");
          LocalStorage.remove("feed");
        }
      });
    }
  },

  fetchTags({ commit, getters }, payload) {
    console.log("fetching tags");
    let hasTags = LocalStorage.has("tags");

    if (payload.reload) {
      console.log("refreshing tags");
      let email = getters.user;
      API.get(`user/?email=${email}`).then((response) => {
        commit("SET_TAGS", response.data.data.preferences);
        LocalStorage.set("tags", response.data.data.preferences);
      });
    } else if (hasTags) {
      console.log("found tags in local storage");
      let tags = LocalStorage.getItem("tags");
      commit("SET_TAGS", tags);
    } else {
      console.log("did not find tags in local storage");
      let email = getters.user;
      API.get(`user/?email=${email}`).then((response) => {
        commit("SET_TAGS", response.data.data.preferences);
        LocalStorage.set("tags", response.data.data.preferences);
      });
    }
  },

  fetchDefaultTags({ commit, getters }, payload) {
    console.log("fetching default tags");
    commit("SET_STATUS", "loading");
    API.get(`tags/`).then((response) => {
      commit("SET_DEFAULT_TAGS", response.data.data.tags);
      commit("SET_STATUS", "loaded");
    });
  },


  setDarkMode({ commit }, payload) {
    commit("SET_DARK_MODE", payload);
  },
};

const getters = {
  enabledTags: (state) => {
    return state.tags.filter((tag) => tag.enabled);
  },

  loadingButton: (state) => {
    return state.loadingButton;
  },

  isDarkMode: (state) => {
    return state.darkMode;
  },

  getEnabledTags: (state) => {
    let tags = Array();
    let enabledTags = state.tags.filter((tag) => tag.enabled);
    enabledTags.forEach((val) => {
      tags.push(val.tag);
    });
    return tags;
  },

  getDefaultTags: (state) => {
    return state.defaultTags;
  },

  status: (state) => {
    return state.status;
  },

  Tags: (state) => {
    return state.tags;
  },

  user: (state) => {
    return state.user.email;
  },

  login: (state) => {
    return state.loginPopup;
  },

  register: (state) => {
    return state.registerPopup;
  },

  interests: (state) => {
    return state.interestsPopup;
  },

  initialSetup: (state) => {
    return state.initialPopup;
  },

  isAuthenticated: (state) => {
    return !!state.user.email;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
