// Todo: add more comments and refactor all this shit

import { LocalStorage } from "quasar";
import { AUTH } from "../boot/firebase";
import { API } from "../boot/axios";
import { Dark } from "quasar";

const state = {
  //popups
  loginPopup: false,
  registerPopup: false,
  interestsPopup: false,
  initialPopup: false,
  //end poppups

  tags: null, //user tags
  user: {
    avatar: null,
    email: null,
    name: null,
    verified: null,
  },
  isAuthenticated: false,
  status: {
    //global status of the app. Change these statuses when fetching some data
    loading: false,
    tags_loading: false,
    feed_loading: false,
    popup_loading: false,
    data_posting: false,
  },
  darkMode: true,
  defaultTags: null, // default tags from the server, fetch only if used in multiple components
  savedData: [],
};

const mutations = {
  
  SAVE_DATA(state, data) {
    state.savedData.push(data)
  },
  
  SET_USER(state, user) {
    //Set the current logged in user
    let hasSavedData = LocalStorage.has('savedData')
    if (!hasSavedData) {
      LocalStorage.set('savedData', [])
    }
    let savedData = LocalStorage.getItem('savedData')
    state.savedData = savedData
    state.isAuthenticated = true;
    state.user.avatar = user.photoURL;
    state.user.email = user.email;
    state.user.name = user.displayName;
    state.user.verified = user.emailVerified;
  },

  SET_POPUP(state, payload) {
    //For displaying popups
    state[`${payload.popup}`] = payload.flag;
  },

  SET_TAGS(state, tags) {
    //Set tags of the current logged in user
    state.tags = tags;
  },

  SET_DEFAULT_TAGS(state, tags) {
    state.defaultTags = tags;
  },

  SET_DARK_MODE(state, darkMode) {
    state.darkMode = !state.darkMode;
  },

  SET_STATUS(state, payload) {
    state.status[`${payload.status}`] = payload.flag;
  },

  RESET_USER(state) {
    state.user.email = null;
    state.user.verified = null;
    state.user.preferences = null;
  },
};

const actions = {
  fetchUser({ commit }, payload) {
    if (payload) {
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
          //LocalStorage.remove("feed");
        }
      });
    }
  },

  fetchTags({ commit, getters }, payload) {
    //fetch tags of the current user from the API
    let hasTags = LocalStorage.has("tags");

    commit("SET_STATUS", { status: "tags_loading", flag: true });
    if (payload.reload) {
      console.log("refreshing tags");

      let email = getters.user;
      API.get(`user/?email=${email}`).then((response) => {
        commit("SET_TAGS", response.data.data.preferences);
        LocalStorage.set("tags", response.data.data.preferences);
        commit("SET_STATUS", { status: "tags_loading", flag: false });
      });
    } else if (hasTags) {
      //if tags are cached then use them instead
      let tags = LocalStorage.getItem("tags");
      commit("SET_TAGS", tags);
      commit("SET_STATUS", { status: "tags_loading", flag: false });
    } else {
      let email = getters.user;
      API.get(`user/?email=${email}`).then((response) => {
        commit("SET_TAGS", response.data.data.preferences);
        LocalStorage.set("tags", response.data.data.preferences);
        commit("SET_STATUS", { status: "tags_loading", flag: false });
      });
    }
  },

  fetchDefaultTags({ commit, getters }, payload) {
    commit("SET_STATUS", { status: "tags_loading", flag: true });
    API.get(`tags/`).then((response) => {
      commit("SET_DEFAULT_TAGS", response.data.data.tags);
      commit("SET_STATUS", { status: "tags_loading", flag: false });
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

  getUser: (state) => {
    return state.user;
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
