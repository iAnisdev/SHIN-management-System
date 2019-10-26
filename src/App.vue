<template>
  <div id="app">
    <loader v-if="showLoaderStatus"/>
    <router-view/>
    <notifications group="notify" position="top center"/>
  </div>
</template>

<script>
import {mapGetters , mapActions } from 'vuex'
import loader from '@/components/shared/loaders.vue'
export default {
  name: "app",
  components:{
    loader
  },
  computed:{
    ...mapGetters({
      showLoaderStatus: 'showLoaderStatus'
    }),
  },
  methods: {
  
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
