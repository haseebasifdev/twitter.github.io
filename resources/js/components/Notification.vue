<template>
  <div class="row">
    <div class="col-md-10 col-sm-11 col-xl-7">
      <ul class="list-group border">
        <li class="my-2 p-2">
          <h3 class="font-weight-bolder">Notifications</h3>
        </li>
        <li class="border-top" v-for="notification in notifications">
          <div v-if="notification.read==true" class="li d-flex p-2">
          <i class="fas fa-star fa-2x text-primary mr-2"></i>
          <div >
            <img
              :src="notification.user.profile"
              width="40px"
              height="40px"
              class="rounded-circle mb-2"
              alt
              srcset
            />
            <div>
              <b>{{notification.user.name}}</b>
              {{notification.notifications.type}}
            </div>
          </div>
          </div>
          <div v-else class="li d-flex   p-2">
          <i class="fas fa-star fa-2x text-primary mr-2"></i>
          <div >
            <img
              :src="notification.user.profile"
              width="40px"
              height="40px"
              class="rounded-circle mb-2"
              alt
              srcset
            />
            <div>
              <b>{{notification.user.name}}</b>
              {{notification.notifications.type}}
            </div>
          </div>
          </div>
        </li>
      </ul>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import MessageBody from "./MessageBody";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    MessageBody
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["notification"])
  },

  mounted() {
    this.notification();
  },
  computed: {
    ...mapState(["notifications"])
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
.received {
  /* background-color: aqua; */
  border-radius: 1rem;
  /* padding: 10px 15px; */
}
.sender {
  background-color: rgba(0, 255, 0, 0.664);
}
.received {
  max-width: 60%;

  display: inline-block;
}
ul {
  list-style-type: none;
}
div.li:hover {
  background-color: rgba(5, 9, 26, 0.15);
  cursor: pointer;
}
</style>
