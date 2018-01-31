export default {
  state: {
    showResult: false,
    result: [],
    notSupported: false,
    startTaskHandler: function() { throw Error("startTaskHandler is not set!"); }
  },
  mutations: {
    setResult(state, payload) {
      state.result = [...payload];
    },
    setShowResult(state, payload) {
      state.showResult = payload;
    },
    setNotSupported(state, payload) {
      state.notSupported = payload;
    },
    setStartTaskHandler(state, payload) {
      state.startTaskHandler = payload;
    }
  }
};
