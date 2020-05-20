<template>
  <div class="d-flex my-2 ml-4">
    <textarea
      v-model="message"
      class="emojionearea"
      id="area emojionearea"
      rows="1"
      placeholder="Start a new message"
      @keyup.enter="sendmessage()"
    ></textarea>
    <div class="ml-2">
      <button class="btn btn-sm btn-light" @click="sendmessage()">send</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sendmessage() {
      var data = {
        message: this.message,
        to: this.messages.user.id
      };
      // var a = [];
      // // Parse the serialized data back into an aray of objects
      // a = JSON.parse(localStorage.getItem("message")) || [];
      // // Push the new data (whether it be an object or anything else) onto the array
      // a.push(this.message);
      // // Alert the array value
      // // Re-serialize the array back into a string and store it in localStorage
      // localStorage.setItem("message", JSON.stringify(a));
      this.message = "";
      this.$store.dispatch("savemessage", data);
    },
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
    ...mapState(["messages"])
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
  background-color: aqua;
  border-radius: 1rem;
  padding: 10px 15px;
}
.received {
  max-width: 60%;

  display: inline-block;
}
textarea:focus {
  outline: none;
}
textarea:focus {
  border: 1px solid rgb(57, 57, 255);
}
#area {
  padding-left: 10px;
}
textarea {
  width: 80%;
  border-radius: 20px;
}
</style>
