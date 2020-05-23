<template>
  <div>
    <nav class="navbar navbar-expand-lg d-block navbar-primary bg-white position-fixed">
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>-->

      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
      <div class=" overflow-auto" style="max-width:300px">
        <ul class="navbar-nav d-block">
          <li class>
            <router-link to="/" class>
              <img src="/images/twitter.png" width="50px" class="twitter p-1" style alt srcset />
            </router-link>
          </li>
          <li class="nav-item my-3">
            <router-link to="/" class="nav-links-main">
              <i class="fas fa-home fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Home</span>
            </router-link>
          </li>
          <li class="nav-item my-3">
            <router-link :to="{name:'explore'}" class="nav-links-main">
              <i class="fas fa-hashtag fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Explore</span>
            </router-link>
          </li>
          <li class="nav-item my-3 position-relative" @click="resetnotification()">
            <router-link :to="{name:'notifications'}" class="nav-links-main">
              <i class="far fa-bell fa-lg mr-3"></i>
              <span
                v-if="countnote"
                class="badge rounded-circle position-absolute"
                style="left:20px;bottom:15px"
              >{{countnote}}</span>
              <span class="d-none d-sm-none d-md-inline nav-links">Notification</span>
            </router-link>
          </li>
          <li class="nav-item my-3">
            <router-link :to="{name:'message'}" class="nav-links-main">
              <i class="far fa-envelope fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Messages</span>
            </router-link>
          </li>
          <li class="nav-item my-3">
            <a class="nav-links-main" href="#">
              <i class="far fa-bookmark fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Bookmarks</span>
            </a>
          </li>
          <li class="nav-item my-3">
            <a class="nav-links-main" href="#">
              <i class="far fa-list-alt fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Lists</span>
            </a>
          </li>
          <li class="nav-item my-3">
            <router-link
              :to="{name:'profile',params: { username: user.username }}"
              class="nav-links-main"
              href="#"
            >
              <i class="far fa-user fa-lg mr-3"></i>
              <span class="d-none d-sm-none d-md-inline nav-links">Profile</span>
            </router-link>
          </li>

          <li class="nav-item my-3">
            
            <span class="dropup">
              <a
                class="nav-links-main"
                href="#"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-h fa-lg mr-3"></i>
                <span class="d-none d-sm-none d-md-inline nav-links">More</span>
              </a>
              <div class="dropdown-menu bg-light" style="width:10px"  aria-labelledby="dropdownMenuButton">
                <router-link to="/" class="dropdown-item text-dark">
                  <i class="fas fa-cog"></i>Setting
                </router-link>
              </div>
            </span>
          </li>
          <!-- <button class="btn btn-primary btn-lg btn-block tweet" @click="tweetmodel()">Tweet</button> -->
          <slot></slot>
        </ul>
      </div>
    </nav>
    <div
      class="modal fade"
      id="tweet"
      tabindex="-1"
      role="dialog"
      aria-labelledby="tweetLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body border-0">
            <!-- <tweet class=" border-0"></tweet> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import tweet from "./Tweet";

export default {
  components: {
    tweet
  },
  props: ["user"],
  methods: {
    ...mapMutations(["resetcountnote"]),
    ...mapActions(["notification"]),
    // tweetmodel() {
    //   console.log("clicked");
    //   $("#tweet").modal("show");
    // },
    resetnotification() {
      console.log("Notification cicked");
      localStorage.removeItem("notifications");
      this.resetcountnote();
      this.notification();
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
  computed: {
    ...mapState(["countnote"])
  }
};
</script>
<style scoped>
.badge {
  color: white;
  background-color: rgba(0, 172, 238);
}
.nav-links {
  font-family: Helvetica;
  font-weight: bolder;
  font-size: 1.6vw;
}
.nav-links-main {
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 40px;
  padding: 10px 10px;
}
.nav-links-main:hover {
  color: rgb(0, 172, 238);
  text-decoration: none;
  background: rgb(0, 172, 238, 0.07);
  border-radius: 25px;
}
i {
  width: 20px;
}
/* .nav-links:hover {
} */
button.tweet {
  border-radius: 30px;
}
a.profile-link:hover {
  background: rgba(0, 172, 238, 0.1);
  border-radius: 25px;
  cursor: pointer;
}
.router-link-exact-active {
  color: rgba(0, 172, 238);
}
img.twitter {
  border-radius: 60px;
}
img.twitter:hover {
  background: rgb(0, 172, 238, 0.1);
}
.dropdown-menu {
    width: 10px !important;
}
</style>
