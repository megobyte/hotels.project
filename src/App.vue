<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  beforeMount() {
    if (localStorage.getItem("hotels")) {
      this.updateHotels(JSON.parse(localStorage.getItem("hotels")));
    } else {
      this.fetchHotels();
    }
  },
  methods: {
    ...mapMutations(["updateHotels"]),
    fetchHotels() {
      fetch("/hotels.json")
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(json => {
          localStorage.setItem("hotels", JSON.stringify(json));
          this.updateHotels(json);
        })
        .catch(function() {
          this.dataError = true;
        });
    }
  }
};
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
