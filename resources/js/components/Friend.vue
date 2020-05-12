<template>
  <div>
    <div class="row">
      <div class="col-md-7">
        <div class="row px-3">
          <div class="col-md-6 m-0 p-0">
            <router-link
              :to="{name:'follower',params: { username: user.username }}"
              class="route text-center"
            >
              <!-- <button class="btn btn-white btn-lg btn-block border-bottom">Follower</button> -->
              Followers
            </router-link>
          </div>
          <div class="col-md-6 m-0 p-0">
            <router-link
              :to="{name:'following',params: { username: user.username }}"
              class="route text-center"
            >
              <!-- <button class="btn btn-white btn-lg btn-block">Following</button> -->
              Following
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-5"></div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <router-view :key="$route.path"></router-view>
      </div>
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["alluser"]),
    unfollow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("unfollow", data);
    }
  },

  mounted() {
    this.alluser();
  },
  computed: {
    ...mapState(["allusers", "user"])
  }
};
</script>
<style scoped>
/* button {
  border-radius: 30px;
}
button.following:hover span {
  background: rgb(219, 28, 28);
border: none;
  display: none;
}
button.following:hover {
  background: rgb(219, 28, 28);
  border: 1px solid rgb(219, 28, 28);
}
button.following:hover:before {
  background: rgb(219, 28, 28);
border: none;
  content: "Unfollow";
} */
button:hover {
  background-color: rgba(0, 132, 255, 0.1);
}
.route:hover {
  text-decoration: none;
}
.route {
  border-bottom: 1px solid rgba(90, 98, 105, 0.4);
  padding: 20px;
  display: block;
  color: rgba(0, 0, 0, 0.479);

  font-size: 20px;
}
.router-link-exact-active,
.router-link-active {
  border-bottom: 2px solid rgba(0, 132, 255, 0.9);
  color: rgb(0, 0, 0);
}
</style>
