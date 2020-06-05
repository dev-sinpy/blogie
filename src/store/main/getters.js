export function enabledTags(state) {
  return state.tags.filter((tag) => tag.enabled);
}

export function isDarkMode(state) {
  return state.darkMode;
}

export function getEnabledTags(state) {
  let tags = Array();
  let enabledTags = state.tags.filter((tag) => tag.enabled);
  enabledTags.forEach((val) => {
    tags.push(val.tag);
  });
  return tags;
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

export function login(state) {
  return state.loginPopup;
}

export function register(state) {
  return state.registerPopup;
}

export function interests(state) {
  return state.interestsPopup;
}

export function initialSetup(state) {
  return state.initialPopup;
}

export function isAuthenticated(state) {
  return !!state.user.email;
}
