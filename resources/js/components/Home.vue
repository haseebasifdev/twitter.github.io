<template>
  <div class="row">
    <nav
      class="navbar navbar-expand-lg navbar-light sticky-top border border-top-0 border-bottom-0 bg-light ccol-md-8 col-sm-10 col-11 col-xl-7"
    >
      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex">
          <div class="mr-4">
            <span class=" home">Home</span>
           
          </div>
        </ul>
      </div>
    </nav>
    <div class="col-md-8 col-sm-10 col-11 col-xl-7 border p-0 m-0 border-bottom-0">
      <tweet class="border-0"></tweet>
      <div class="bg-light" style=" height:10px"></div>
      <post :usertweet="usertweet"></post>
    </div>
    <div class="col-md-4 col-sm-2 col-1 col-xl-5"></div>
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
  },

  methods: {
    ...mapActions([
      "fetchusertweet",
      "fetchuser",
      "posttweet",
      "commentpostindex"
    ])
  },
  mounted() {
    this.fetchusertweet();
    this.fetchuser();
  },
  computed: {
    ...mapState(["user", "usertweet"]),
    ...mapGetters(["allfollower", "allfollowing"])
  }
};
</script>
<style scoped>
.home
{
  font-family: Roman;
  font-size: 20px;
  font-weight: 900;
}
</style>
