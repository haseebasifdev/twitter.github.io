<template>
  <div class="row">
    <div class="col-md-8">ShowPost</div>
    <div class="col-md-4"></div>
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
    ...mapActions(["showtweet"])
  },

  mounted() {
    this.showtweet(this.$route.params.id);
  },
  computed: {
    ...mapState(["tweet"])
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
li.li:hover {
  background-color: rgba(89, 119, 255, 0.05);
  cursor: pointer;
}
</style>
