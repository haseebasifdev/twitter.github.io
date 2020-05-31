<template>
  <span>
    <transition name="slide">
      <router-view :key="$route.path" ></router-view>
    </transition>
  </span>
</template>

<script>
export default {};
</script>
<style scoped>
</style>
