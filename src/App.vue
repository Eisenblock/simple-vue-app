<template>
  <Camera />
</template>

<script>
import Camera from './components/Camera.vue'
import Komp from './components/Komp.vue'
import { RouterLink, RouterView } from 'vue-router'

export default {

  components : {
    Komp,
    Camera,
    RouterLink,
    RouterView
  },
}
</script>

<style>

</style>