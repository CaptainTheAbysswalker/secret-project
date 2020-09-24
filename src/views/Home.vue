<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Loader />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue"

export default {
  name: 'Home',
  components: {
    Loader,
  }
}
</script>
