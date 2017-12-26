import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import ListModule from "./list";
import ScanModule from "./scan";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coffees: []
  },
  actions: {
    fetchCoffees({ commit, state }) {
      if (!state.coffees.length) {
        axios.get("/assets/data-v1.json")
          .then(response => {
            commit("fetchCoffees", response.data);
          });
      }
    }
  },
  mutations: {
    fetchCoffees(state, payload) {
      state.coffees = payload;
    }
  },
  getters: {
    sortedCoffees(state) {
      const intensityGroup = state.coffees.reduce((result, current) => {
        result[current.intensity] = result[current.intensity] || [];
        result[current.intensity].push(current);
        return result;
      }, {});

      const flatten = [];
      for (const key in intensityGroup) {
        const group = intensityGroup[key].sort(
          (a, b) => (a.name <= b.name ? -1 : 1)
        );
        flatten.push(...group);
      }

      return flatten;
    }
  },
  modules: {
    list: ListModule,
    scan: ScanModule
  }
});
