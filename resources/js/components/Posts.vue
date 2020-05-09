<template>
  <div>
    <div v-for="(data,index) in usertweet" class="my-4 border-bottom">
      <div class="mx-3 d-flex">
        <img
          :src="data.user.profile"
          class="mr-2 rounded rounded-circle"
          width="50px"
          height="50px"
        />
        <div>
          <span class="font-weight-bolder">{{data.user.name}}</span>
          <span class="text-muted">{{'@'+data.user.username}}</span>
          <div>{{data.tweet.tweet}}</div>
          <div>
            <img :src="data.tweet.tweetpicture" width="100%" class="tweetpic my-2" alt srcset />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around mb-2 mx-4">
        <div>
          <i class="far fa-comment comment fa-lg p-2"></i>
        </div>
        <div>
          <i class="fas fa-sync-alt sync fa-lg p-2"></i>
        </div>
        <div>
          <i
            v-if="data.liked"
            class="fas fa-heart heart text-danger fa-lg p-2"
            @click="likepost(data.tweet.id,index)"
          > {{data.likes}}</i>
          <i v-else class="far fa-heart heart fa-lg p-2" @click="likepost(data.tweet.id,index)"> {{data.likes}}</i>
        </div>
        <div>
          <i class="fas fa-upload upload fa-lg p-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "post",
  props: ["usertweet"],
  data() {
    return {};
  },
  methods: {
    likepost(postid, indexid) {
      var data = {
        post_id: postid,
        index: indexid
      };
      this.$store.dispatch("likepost", data);
      // console.log(postid, indexid);
      // likepost
    }
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
img.tweetpic {
  border-radius: 20px;
}
.upload:hover {
  cursor: pointer;
  color: red;

  background-color: rgba(255, 0, 0, 0.05);
  border-radius: 40px;
}
.heart:hover {
  cursor: pointer;
  color: red;
  background-color: rgba(255, 0, 0, 0.05);
  border-radius: 40px;
}
.sync:hover {
  cursor: pointer;
  color: rgba(107, 255, 210, 0.576);

  background-color: rgba(127, 255, 212, 0.05);
  border-radius: 40px;
}
.comment:hover {
  cursor: pointer;
  color: rgba(107, 255, 210, 0.576);
  background-color: rgba(127, 255, 212, 0.05);
  border-radius: 40px;
}
</style>
