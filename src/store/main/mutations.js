import { LocalStorage } from "quasar";
import { Dark } from "quasar";

export function SAVE_DATA(state, data) {
  state.savedData.push(data);
}

export function SET_USER(state, user) {
  //Set the current logged in user
  let hasSavedData = LocalStorage.has("savedData");
  if (!hasSavedData) {
    LocalStorage.set("savedData", []);
  }
  let savedData = LocalStorage.getItem("savedData");
  state.savedData = savedData;
  state.isAuthenticated = true;
  state.user.avatar = user.photoURL;
  state.user.email = user.email;
  state.user.name = user.displayName;
  state.user.verified = user.emailVerified;
}

export function SET_POPUP(state, payload) {
  //For displaying popups
  state.popups[`${payload.popup}`] = payload.flag;
}

export function SET_TAGS(state, tags) {
  //Set tags of the current logged in user
  state.tags = tags;
}

export function SET_DEFAULT_TAGS(state, tags) {
  state.defaultTags = tags;
}

export function SET_LIGHT_MODE(state, payload) {
  state.userSettings.darkMode = false;
  Dark.set(false);
  LocalStorage.set("userSettings", state.userSettings);
}

export function SET_DARK_MODE(state, payload) {
  state.userSettings.darkMode = true;
  Dark.set(true);
  LocalStorage.set("userSettings", state.userSettings);
}

export function SET_STATUS(state, payload) {
  state.status[`${payload.status}`] = payload.flag;
}

export function RESET_USER(state) {
  state.user.email = null;
  state.user.verified = null;
  state.user.preferences = null;
}
