<template>
  <div>
    <ul class="list-group" v-for="(data,index) in allusers">
      <router-link class="route" :to="{name:'profile',params: { username: data.user.username }}">
        <li
          class="py-2 px-3 d-flex justify-content-between border border-top-0"
          v-if="data.following"
        >
          <span class="d-flex">
            <img
              :src="data.user.profile"
              class="mr-2 rounded rounded-circle"
              width="50px"
              height="50px"
            />
            <div>
              <div class="font-weight-bolder">
                <router-link
                  class=" text-dark"
                  :to="{name:'profile',params: { username: data.user.username }}"
                >{{data.user.name}}</router-link>
              </div>
              <div class="text-muted">
                {{'@'+data.user.username}}
                <span
                  v-if="data.follower"
                  class="bg-warning rounded"
                >follow you</span>
              </div>
              <div class="text-dark">{{data.user.bio}}</div>
            </div>
          </span>
          <span>
            <button
              class="btn btn-primary btn-sm px-4 font-weight-bolder following"
              @click="unfollow(data.user.id,index)"
            >
              <span>Following</span>
            </button>
          </span>
        </li>
      </router-link>
    </ul>
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
    ...mapState(["allusers"])
  }
};
</script>
<style scoped>
button {
  border-radius: 30px;
}
button.following:hover span {
  /* background: rgb(219, 28, 28);
border: none; */
  display: none;
}
button.following:hover {
  background: rgb(219, 28, 28);
  border: 1px solid rgb(219, 28, 28);
}
button.following:hover:before {
  /* background: rgb(219, 28, 28);
border: none; */
  content: "Unfollow";
}
.route:hover {
  text-decoration: none;
  background-color: rgba(202, 202, 202, 0.196);
}
</style>
