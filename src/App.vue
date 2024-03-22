<template>
  <Header />
  <Camera />
  <Footer />
</template>

<script>
import Camera from './components/Camera.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'

export default {

  components : {
    Header,
    Footer,
    Camera,
    RouterLink,
    RouterView
  },
}
</script>

<style>

</style>