<template>
  <div class="row border">
    <div class="col-md-4 p-0">
      <div class="border-right">
        <div class="card-header" style="height:3rem">
          Messages
          <i class="fas fa-plus-circle text-primary float-right"></i>
        </div>
        <div class="card-body p-0 overflow-auto" style="height:570px">
          <ul class="list-group list-group-flush" v-for="(data,index) in allusers">
            <router-link
              :to="{name:'messagebody',params: { username: data.user.username }}"
              class="route"
            >
              <li class="p-2 bg-light border-bottom d-flex">
                <img :src="data.user.profile" width="13%" class="rounded-circle mr-2" alt srcset />
                <span>
                  <div class="font-weight-bolder">{{data.user.name}}</div>
                  <div class="text-muted">{{'@'+data.user.username}}</div>
                </span>
                <div class="ml-4">
                  <span v-if="checkonlineuser(data.user)" class="badge badge-primary">Online</span>
                  <span v-else class="badge badge-danger">offline</span>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-8 p-0">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["alluser"]),
    ...mapMutations(["checkonline"]),
    unfollow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("unfollow", data);
    },
    checkonlineuser(user) {
      var number = 0;
      this.onlineusers.find(onineuser => {
        console.log("CheckOnline");
        if (onineuser.id == user.id) {
          console.log(user);
          number = 1;
        }
      });
      return number;
      // console.log(_.find(this.onlineusers, { id: user }));
      // return _.find(this.onlineusers, { id: user });
    }
  },

  mounted() {
    this.alluser();
  },
  computed: {
    ...mapState(["allusers", "onlineusers"])
  }
  // created() {
  //   const to = this.$route.params.username;
  //   console.log(to);
  //   Echo.private("message." + to).listen("Message", e => {
  //     this.$store.commit("setnewmessage", e.message);
  //     console.log(e.message);
  //   });
  // }
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
.received {
  background-color: aqua;
  border-radius: 1rem;
  padding: 10px 15px;
}
.received {
  max-width: 60%;
  display: inline-block;
}
li.msg {
  font-weight: bolder;
  list-style-type: none;
  font-size: 1.2rem;
}
/* ul.top
{
    width: 22.8%;
}
div.body
{
    margin-top: 15%;
} */
.route {
  text-decoration: none;
  color: black;
}
div.row {
  margin-right: 10%;
}
</style>
