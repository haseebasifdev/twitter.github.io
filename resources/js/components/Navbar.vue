<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg d-block navbar-primary bg-white position-fixed">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-block">
          <li class="nav-item my-4">
            <router-link to="/" class="nav-links">
              <i class="fas fa-home fa-lg mr-3"></i>Home
            </router-link>
          </li>
          <li class="nav-item my-4">
            <router-link to="/bar" class="nav-links">
              <i class="fas fa-hashtag fa-lg mr-3"></i>Explore
            </router-link>
          </li>
          <li class="nav-item my-4">
            <a class="nav-links" href="#">
              <i class="far fa-bell fa-lg mr-3"></i>Notification
            </a>
          </li>
          <li class="nav-item my-4">
            <a class="nav-links" href="#">
              <i class="far fa-envelope fa-lg mr-3"></i>Messages
            </a>
          </li>
          <li class="nav-item my-4">
            <a class="nav-links" href="#">
              <i class="far fa-bookmark fa-lg mr-3"></i>Bookmarks
            </a>
          </li>
          <li class="nav-item my-4">
            <a class="nav-links" href="#">
              <i class="far fa-list-alt fa-lg mr-3"></i>Lists
            </a>
          </li>
          <li class="nav-item my-4">
            <router-link :to="{name:'profile'}" class="nav-links" href="#">
              <i class="far fa-user fa-lg mr-3"></i>Profile
            </router-link>
          </li>
          <li class="nav-item my-4">
            <a class="nav-links" href="#">
              <i class="fas fa-angle-right fa-lg mr-3"></i>More
            </a>
          </li>
          <button class="btn btn-primary btn-lg btn-block tweet" @click="tweetmodel()">Tweet</button>
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
          <div class="modal-body">
            <!-- <tweet></tweet> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweet from "./Tweet";
export default {
  components: {
    tweet
  },
  props: ["user"],
  methods: {
    tweetmodel() {
      console.log("clicked");
      $("#tweet").modal("show");
    }
  },
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
<style scoped>
.nav-links {
  color: rgba(0, 0, 0, 0.8);
  font-family: Helvetica;
  font-weight: bolder;
  font-size: 1.2rem;
  margin-bottom: 50px;
  padding: 10px 10px;
}
.nav-links:hover {
  color: rgb(58, 117, 255, 0.8);
  text-decoration: none;
  background: rgb(70, 70, 255, 0.1);
  border-radius: 25px;
}
button.tweet {
  border-radius: 30px;
}
a.profile-link:hover {
  background: rgb(70, 70, 255, 0.1);
  border-radius: 25px;
  cursor: pointer;
}
.router-link-exact-active {
  color: rgb(58, 117, 255, 0.8);
}
</style>
