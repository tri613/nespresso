import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import ListModule from "./list";
import ScanModule from "./scan";

Vue.use(Vuex);

const prefix = process.env.NODE_ENV === "production" ? "." : "";

export default new Vuex.Store({
  state: {
    coffees: []
  },
  actions: {
    fetchCoffees({ commit, state }) {
      const url = "/assets/data.json";
      if (!state.coffees.length) {
        axios.get(prefix + url)
          .then(response => {
            const result = response.data.map(row => {
              row.image = prefix + row.image;
              return row;
            });
            commit("fetchCoffees", result);
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
