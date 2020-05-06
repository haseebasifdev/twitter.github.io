<template>
  <div class="row">
    <div class="col-md-7">
      <tweet></tweet>
    </div>
    <div class="col-md-5"></div>
  </div>
</template>

<script>
import tweet from "./Tweet";
import post from "./Posts";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    tweet,
    post
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>
