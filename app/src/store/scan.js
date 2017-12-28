import "@/../node_modules/tracking/build/tracking-min";

export default {
  state: {
    showResult: false,
    result: [],
    notSupported: false,
    trackingJs: {
      tracker: null,
      task: null
    },
    startTaskHandler: () => { throw Error("startTaskHandler not set!"); }
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
