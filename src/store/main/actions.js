import { LocalStorage } from "quasar";
import { AUTH } from "../../boot/firebase";
import { API } from "../../boot/axios";
import { Dark } from "quasar";

export function setDarkMode({ commit }, payload) {
  commit("SET_DARK_MODE", payload);
}

export function fetchUser({ commit }, payload) {
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
}

export function fetchTags({ commit, getters }, payload) {
  //fetch tags of the current user from the API

  //let hasTags = LocalStorage.has("tags");

  commit("SET_STATUS", { status: "tags_loading", flag: true });
  if (payload.reload) {
    console.log("refreshing tags");

    let email = getters.user;
    API.get(`user/${email}`).then((response) => {
      let tags = response.data.data.preferences;
      let newTags = Array();
      tags.forEach((val) => {
        newTags.push({
          tag: val,
          enabled: true,
        });
      });

      commit("SET_TAGS", newTags);
      LocalStorage.set("tags", newTags);
      commit("SET_STATUS", { status: "tags_loading", flag: false });
    });
  } else {
    let email = getters.user;
    API.get(`user/${email}`).then((response) => {
      let tags = response.data.data.preferences;
      let newTags = Array();
      tags.forEach((val) => {
        newTags.push({
          tag: val,
          enabled: true,
        });
      });
      commit("SET_TAGS", newTags);
      LocalStorage.set("tags", newTags);
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
