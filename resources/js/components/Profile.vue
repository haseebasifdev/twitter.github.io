<template>
  <div class="row">
    <div class="col-md-7 p-0 m-0 border border-bottom-0">
      <div class="cover position-relative">
        <img src="images/cover.jfif" width="100%" height="250px" alt />
        <div class="profile position-absolute" style="bottom:-30%">
          <img
            :src="user.profile"
            class="rounded rounded-circle bg-white ml-3 p-1"
            width="60%"
            alt
          />
        </div>
      </div>

      <div>
        <button
          class="btn btn-outline-primary btn-md float-right font-weight-bolder mt-2 mr-2"
        >Edit profile</button>
      </div>
      <div class="userdata ml-3">
        <div class="name">{{user.name}}</div>
        {{'@'+ user.username}}
        <div v-if="user.bio" class="my-2">{{user.bio}}</div>
        <div v-else>No Bio Yet</div>
        <div class="row text-muted mt-2">
          <div class="col-4 m-0">
            <i class="fas fa-map-marker-alt fa-md"></i>
            {{user.location }}
          </div>
          <div class="col-4 m-0 p-0">
            <i class="fas fa-birthday-cake"></i>
            Born {{user.birthday | date}}
          </div>
          <div class="col-4 m-0 p-0">
            <i class="far fa-calendar-alt"></i>
            Joined {{user.created_at | date}}
          </div>
        </div>
      </div>
      <post :user="user"></post>
    </div>
    <div class="col-md-5 p-0 m-0">
      <!-- <input type="file" id="file" accept="image/*" style="border:none" /> -->
      
    </div>
  </div>
</template>

<script>
import post from "./Posts";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    post
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchuser"])
  },
  mounted() {
    this.fetchuser();
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
button {
  border-radius: 25px;
}
div.userdata {
  margin-top: 15%;
}
div.name {
  font-size: 1.2rem;
  font-family: fantasy;
}
.image-upload > input {
  display: none;
}


</style>
