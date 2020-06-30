export default function() {
  return {
    popups: {
      loginPopup: false,
      registerPopup: false,
      interestsPopup: false,
      initialPopup: false,
      deleteAccountPopup: false,
    },
    //end poppups
    user: {
      avatar: null,
      email: null,
      name: null,
      apiKey: null,
      verified: null,
    },
    userSettings: {
      darkMode: true,
      layoutSettings: "default",
      hideLeftSidebar: false,
      hideRightSidebar: false,
    },
    status: {
      //global status of the app. Change these statuses when fetching some data
      loading: false,
      tags_loading: false,
      feed_loading: false,
      popup_loading: false,
      data_posting: false,
    },
    savedData: [],
    darkMode: true,
    defaultTags: null, // default tags from the server, fetch only if used in multiple components
    isAuthenticated: false,
    tags: null, //user tags
  };
}
