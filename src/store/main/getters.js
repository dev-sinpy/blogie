export function enabledTags(state) {
  return state.tags.filter((tag) => tag.enabled);
}

export function isDarkMode(state) {
  return state.userSettings.darkMode;
}

export function getEnabledTags(state) {
  let tags = Array();
  let enabledTags = state.tags.filter((tag) => tag.enabled);
  enabledTags.forEach((val) => {
    tags.push(val.tag);
  });
  return tags;
}

export function getUserSettings(state) {
  return state.userSettings;
}

export function leftSidebar(state) {
  return state.userSettings.hideLeftSidebar;
}

export function rightSidebar(state) {
  return state.userSettings.hideRightSidebar;
}

export function getDefaultTags(state) {
  return state.defaultTags;
}

export function getUser(state) {
  return state.user;
}

export function status(state) {
  return state.status;
}

export function Tags(state) {
  return state.tags;
}

export function user(state) {
  return state.user.email;
}

export function deleteAccount(state) {
  return state.popups.deleteAccountPopup;
}

export function login(state) {
  return state.popups.loginPopup;
}

export function register(state) {
  return state.popups.registerPopup;
}

export function interests(state) {
  return state.popups.interestsPopup;
}

export function initialSetup(state) {
  return state.popups.initialPopup;
}

export function isAuthenticated(state) {
  return !!state.user.email;
}
