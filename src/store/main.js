import axios from 'axios'
import { LocalStorage } from 'quasar'
import { AUTH } from '../plugins/firebase'
import { Dark } from 'quasar'

const state = {
  tags: [
    {
      tag: 'android',
      popularity: 1,
      enabled: true
    },
    {
      tag: 'ios',
      popularity: 1,
      enabled: true
    },
    {
      tag: 'windows',
      popularity: 1,
      enabled: true
    },
    {
      tag: 'programming',
      popularity: 1,
      enabled: true
    },
    {
      tag: 'news',
      popularity: 1,
      enabled: true
    },
    {
      tag: 'random',
      popularity: 1,
      enabled: false
    },
    ],
    
    user: {
      email: null,
      verified: null,
      preferences: null,
    },
    isAuthenticated: false,
    articles: null,
    status: null,
    darkMode: true,
    defaultTags: null
    }

const mutations = {
      
    SET_USER(state, user) {
      
      state.isAuthenticated = true;
      state.user.email = user.email;
      state.user.verified = user.emailVerified;

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
    
    SET_FEED(state, data) {
      state.articles = data;
    },
    
    SET_MORE_FEED(state, data) {
      state.articles.push(...data)
    },
    
    SET_STATUS(state, status) {
      state.status = status;
    },
      
    RESET_USER(state) {
      state.status = 'user not found';
      state.user.email = null;
      state.user.verified = null;
      state.user.preferences = null;
    }
}

const actions = {
    fetchUser({ commit }, payload) {
      console.log('getting user');
      if (payload) {
        console.log('payload is provided');
        commit("SET_USER", payload);
      }
      else {
        AUTH.onAuthStateChanged(user => {
        if (user) {
          // Signed in. Let Vuex know.
          commit("SET_USER", user);
        } else {
          // Signed out. Let Vuex know.
          commit("RESET_USER");
          LocalStorage.remove('tags');
          LocalStorage.remove('feed');
        }
      })
      }
    },
    
    fetchTags({ commit, getters}, payload) {
      console.log('fetching tags');
      let hasTags = LocalStorage.has('tags');
      if (hasTags) {
        console.log('found tags in local storage');
        let tags = LocalStorage.getItem('tags');
        commit("SET_TAGS", tags)
      }
      else {
        console.log('did not find tags in local storage');
        let email = getters.user;
        axios
        .get(`https://blogie.now.sh/api/user/?email=${email}`)
        .then((response) => {
          commit("SET_TAGS", response.data.data.preferences);
          LocalStorage.set('tags', response.data.data.preferences)
          })
      }
    },
    
    fetchDefaultTags({ commit, getters}, payload) {
      console.log('fetching default tags');
      commit("SET_STATUS", 'loading');
      axios
      .get(`https://blogie.now.sh/api/tags/`)
      .then((response) => {
        commit("SET_DEFAULT_TAGS", response.data.data.tags);
        commit("SET_STATUS", 'loaded');
        })
    },
    
    fetchFeed({ commit, getters }, payload) {
      console.log('Getting articles');
      
      if (payload.reload) {
        commit("SET_STATUS", 'loading');
        let tags = getters.getEnabledTags;
        for (let i = tags.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tags[i], tags[j]] = [tags[j], tags[i]];
        }
        let finalTags = tags.join();
        axios
        .get(`https://blogie.now.sh/api/?q=${finalTags}&limit=${payload.limit}&page=${payload.page}`)
        .then((response) => {
          commit("SET_FEED", response.data.content);
          commit("SET_STATUS", 'loaded');
          LocalStorage.set('feed', response.data.content)
          })
      }
      
      let feed = LocalStorage.has('feed');
      if (feed && !payload.reload) {
        console.log('using local storage');
        const data = LocalStorage.getItem('feed');
        commit("SET_FEED", data);
        commit("SET_STATUS", 'loaded');
      }
      else {
        console.log('not using local storage');
        let tags = getters.getEnabledTags;
        for (let i = tags.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tags[i], tags[j]] = [tags[j], tags[i]];
        }
        let finalTags = tags.join();
        axios
        .get(`https://blogie.now.sh/api/?q=${finalTags}&limit=${payload.limit}&page=${payload.page}`)
        .then((response) => {
          commit("SET_FEED", response.data.content);
          commit("SET_STATUS", 'loaded');
          LocalStorage.set('feed', response.data.content)
          })
        }
      },
      
    fetchMoreFeed({ commit, getters }, payload) {
      console.log('Getting more articles');
      commit("SET_STATUS", 'loading');
      let tags = getters.getEnabledTags;
      for (let i = tags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tags[i], tags[j]] = [tags[j], tags[i]];
      }
      let finalTags = tags.join();
      axios
      .get(`https://blogie.now.sh/api/?q=${finalTags}&limit=${payload.limit}&page=${payload.page}`)
      .then((response) => {
        commit("SET_MORE_FEED", response.data.content);
        commit("SET_STATUS", 'loaded');
        })
      
    },
    
    setDarkMode({ commit }, payload) {
      commit("SET_DARK_MODE", payload);
      
    },
  }
  
const getters = {
  enabledTags: state => {
      return state.tags.filter(tag => tag.enabled)
    },
    
  isDarkMode: state => {
      return state.darkMode
    },
    
  getEnabledTags: state => {
    let tags = Array();
    let enabledTags = state.tags.filter(tag => tag.enabled)
    enabledTags.forEach((val)=> {
      tags.push(val.tag);
    });
      return tags
    },
    
  getDefaultTags: state => {
    return state.defaultTags
    },
    
  status: state => {
      return state.status
    },
    
  Tags: state => {
      return state.tags
    },
    
  user: state => {
      return state.user.email
    },
    
  isAuthenticated: state => {
    return !!state.user.email
  },
    
  feed: (state, getters) => {
    let tags = Array();
    getters.enabledTags.forEach((val)=> {
      tags.push(val.tag);
    });
    
    return state.articles.filter(article => tags.includes(article.tags))
  },
  
  
  articles: (state, getters) => {
    let tags = Array();
    getters.enabledTags.forEach((val)=> {
      tags.push(val.tag);
    });
    
    return state.articles.filter(article => tags.includes(article.searched_for))
  },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
