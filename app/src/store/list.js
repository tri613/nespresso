export default {
  state: {
    keywords: ""
  },
  mutations: {
    setKeywords(state, payload) {
      state.keywords = payload;
    }
  }
};
