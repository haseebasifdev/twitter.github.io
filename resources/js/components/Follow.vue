<template>
  <div class="row">
    <nav
      class="navbar navbar-expand-lg navbar-light sticky-top border border-top-0 border-bottom-0 bg-light col-md-10 col-12 col-sm-10 col-xl-7"
    >
      <div class="navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0 flo">
          <!-- <span for class="fa fa-search form-control-feedback"></span> -->
          <input size="60" v-model="search" class="form-control search" type="search" placeholder="Search Twitter" />
        </form>
      </div>
    </nav>
    <div class="col-md-10 col-12 col-sm-10 col-xl-7 border border-bottom-0 p-0 m-0">
      <li class="list-group border-bottom py-2 px-1">
        <h4 class=" trend">Trends For You</h4>
      </li>
      <ul class="list-group">
        <li class="p-2 border-bottom trend" v-for="(trends,index) in explore" >
          <router-link :to="index" class=" text-dark trending">
          <span>
            <div>Trending in pakistan</div>
            <div class="font-weight-bold">{{index}}</div>
            <div>{{trends.length}} Tweets</div>
          </span>
          </router-link>
        </li>
      </ul>
      <!-- <ul class="list-group" v-for="(data,index) in allusers">
        <router-link class="route" :to="{name:'profile',params: { username: data.user.username }}">
        <li class="px-3 py-2 border-bottom d-flex justify-content-between route">
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
                  class="text-dark"
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
          <span v-if="data.following">
            <button
              class="btn btn-primary btn-sm px-4 font-weight-bolder following"
              @click="unfollow(data.user.id,index)"
            >
              <span>Following</span>
            </button>
          </span>
          <span v-else>
            <button
              class="btn btn-outline-primary btn-sm px-4 font-weight-bolder follow"
              @click="follow(data.user.id,index)"
            >Follow</button>
          </span>
        </li>
        </router-link>
      </ul>-->
    </div>
    <div class="col-md-5"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search:''
    };
  },
  methods: {
    ...mapActions(["alluser"]),
    follow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("follow", data);
    },
    unfollow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("unfollow", data);
    },
    exploreit(hashtag)
    {
      this.search=hashtag
      console.log(hashtag);
    }
  },

  mounted() {
    this.alluser();
    this.$store.dispatch("explore");
  },
  computed: {
    ...mapState(["allusers", "explore"])
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
  cursor: pointer;
}
input.search {
  height: 30px;
  border-radius: 20px;
  background-color: rgba(0, 119, 255, 0.03);
  border: none;
}
input.search:focus {
  background-color: white;
  box-shadow: none;
}
ul {
  list-style-type: none;
}
h4.trend
{
  font-weight: 800;
  font-family:Cambria;
}
li.trend:hover
{
  background-color: rgba(200, 200, 200, 0.13);
  cursor: pointer;
}
.trending
{
  text-decoration: none;
}
</style>
