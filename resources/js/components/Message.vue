<template>
  <div class>
    <div class="card-header mt-0 pt-0" style="height:3rem">
      <div class="font-weight-bold">{{messages.user.name}}</div>
      <div class="text-muted">{{'@'+messages.user.username}}</div>
    </div>
    <div class="card-body border-bottom overflow-auto" style="height:520px">
      <div
        class="bg-warning p-2 text-center justify-content-center"
        v-if="messages.messages.length==0"
      >
        <div class="mx-auto">No Chat</div>
      </div>
      <div v-for="message in messages.messages">
        <div class="row p-2" v-if="message.from==messages.user.id">
          <div class="col-md-12">
            <img :src="messages.user.profile" width="30px" height="30px" class="rounded-circle" alt />
            <div class="received p-2 bg-light receiver">{{message.message}}</div>
          </div>
        </div>
        <div class="row p-2" v-else>
          <div class="col-md-12 d-flex justify-content-end">
            <div class="received p-2 sender mr-1">{{message.message}}</div>
            <img
              :src="user['profile']"
              width="30px"
              height="30px"
              class="rounded-circle my-auto"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <MessageBody></MessageBody>
    </div>
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
    ...mapActions(["messageuser", "fetchuser", "setmessage"]),
    ...mapMutations([
      "setnewmessage" // map `this.increment()` to `this.$store.commit('increment')`
    ])
  },

  mounted() {
    var data = {
      username: this.$route.params.username
    };
    this.messageuser(data);
    this.fetchuser();
  },
  computed: {
    ...mapState(["messages", "user"])
  },
  created() {
    const to = this.$route.params.username;
    console.log("from", from);
    console.log("to", to);
    Echo.private("chat." + from).listen("Chat", e => {
      // console.log(e.message.message);
      this.setnewmessage(e.message);
    });
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
</style>
