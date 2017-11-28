import Vue from 'vue'
import axios from 'axios';

export const EventBus = new Vue({
  data: {
    coffees: []
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.coffees.length) {
        return Promise.resolve(this.coffees);
      } else {
        return axios.get('/assets/coffee.json')
          .then(response => this.coffees = response.data);
      }
    }
  }
});