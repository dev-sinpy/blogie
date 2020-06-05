export default function() {
  return {
    loginPopup: false,
    registerPopup: false,
    interestsPopup: false,
    initialPopup: false,
    deleteAccountPopup: false,
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
}
