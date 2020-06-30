import { LocalStorage } from "quasar";
import { AUTH } from "../../boot/firebase";
import { API } from "../../boot/axios";

export async function fetchUser({ commit }, payload) {
  if (payload) {
    let response = await API.get(`createtoken/${payload.email}`);
    payload.apiKey = response.data.api_key;
    commit("SET_USER", payload);
  } else {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        // Signed in. Let Vuex know.
        API.get(`createtoken/${user.email}`).then((response) => {
          user.apiKey = response.data.api_key;
          commit("SET_USER", user);
        });
      } else {
        // Signed out. Let Vuex know.
        commit("RESET_USER");
        LocalStorage.remove("tags");
        //LocalStorage.remove("feed");
      }
    });
  }
}

export function toggleTheme({ commit, getters }, payload) {
  if (getters.isDarkMode) {
    commit("SET_LIGHT_MODE");
  } else {
    commit("SET_DARK_MODE");
  }
}

export function fetchTags({ commit, getters }, payload) {
  //fetch tags of the current user from the API

  //let hasTags = LocalStorage.has("tags");

  commit("SET_STATUS", { status: "tags_loading", flag: true });
  if (payload.reload) {
    console.log("refreshing tags");

    let email = getters.user;
    API.get(`user/${email}`, {
      headers: { apikey: getters.getUser.apiKey },
    }).then((response) => {
      let tags = response.data.data.preferences;
      let newTags = Array();
      tags.forEach((val) => {
        newTags.push({
          tag: val,
          enabled: true,
        });
      });

      commit("SET_TAGS", newTags);
      commit("SET_STATUS", { status: "tags_loading", flag: false });
    });
  } else {
    let email = getters.user;
    API.get(`user/${email}`, {
      headers: { apikey: getters.getUser.apiKey },
    }).then((response) => {
      let tags = response.data.data.preferences;
      let newTags = Array();
      tags.forEach((val) => {
        newTags.push({
          tag: val,
          enabled: true,
        });
      });
      commit("SET_TAGS", newTags);
      commit("SET_STATUS", { status: "tags_loading", flag: false });
    });
  }
  // else if (hasTags) {
  //   //if tags are cached then use them instead
  //   let tags = LocalStorage.getItem("tags");
  //   commit("SET_TAGS", tags);
  //   commit("SET_STATUS", { status: "tags_loading", flag: false });
  // }
}

export function fetchDefaultTags({ commit, getters }, payload) {
  commit("SET_STATUS", { status: "tags_loading", flag: true });
  API.get(`tags/`).then((response) => {
    commit("SET_DEFAULT_TAGS", response.data.data);
    commit("SET_STATUS", { status: "tags_loading", flag: false });
  });
}
