<template>
  <div>
    <div v-for="(data,index) in usertweet" class="pt-2 border-bottom post">
      <router-link
        class="routemain"
        :to="{name:'showpost',params: { username: data.user.username,id:data.tweet.id }}"
      >
        <div class="mx-3 d-flex">
          <img
            :src="data.user.profile"
            class="mr-2 rounded rounded-circle"
            width="50px"
            height="50px"
          />
          <div>
            <span class="font-weight-bolder">
              <router-link class="route text-dark" to="/notifications">{{data.user.name}}</router-link>
            </span>
            <span class="text-muted">{{'@'+data.user.username}}</span>
            <span class="text-muted">{{data.tweet.created_at | date}}</span>
            <div class="text-dark">{{data.tweet.tweet}}</div>
            <div>
              <img
                :src="data.tweet.tweetpicture"
                width="100%"
                class="tweetpic my-2 border"
                alt
                srcset
              />
            </div>
          </div>
        </div>
      </router-link>
      <div class="d-flex justify-content-around mb-2 mx-4">
        <div>
          <i class="far fa-comment comment fa-lg p-2" @click="commentmodel(index)"></i>
          <span v-if="data.comments">{{data.comments}}</span>
        </div>
        <div>
          <i class="fas fa-sync-alt sync fa-lg p-2"></i>
        </div>
        <div>
          <span v-if="data.liked">
            <i
              class="fas fa-heart heart text-danger fa-lg p-2"
              @click="likepost(data.tweet.id,index)"
            ></i>
            <span class="text-danger">{{data.likes}}</span>
          </span>
          <span v-else>
            <i class="far fa-heart heart fa-lg p-2" @click="likepost(data.tweet.id,index)"></i>
            <span class="text-dark">{{data.likes}}</span>
          </span>
        </div>
        <div>
          <i class="fas fa-upload upload fa-lg p-2"></i>
        </div>
      </div>

      <postcomment :post="usertweet[index]" :indexid="index"></postcomment>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import postcomment from "./PostComment";
export default {
  components: {
    postcomment
  },
  name: "post",
  props: ["usertweet"],
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchusertweet", "fetchuser"]),
    likepost(postid, indexid) {
      var data = {
        post_id: postid,
        index: indexid
      };
      this.$store.dispatch("likepost", data);
      // console.log(postid, indexid);
      // likepost
    },
    commentmodel(index) {
      this.$store.dispatch("commentpostindex", index);
      $("#comment").modal("show");
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
  color: rgba(129, 251, 215, 0.576);
  background-color: rgba(127, 255, 212, 0.05);
  border-radius: 40px;
}
.post:hover {
  cursor: pointer;
  background-color: rgba(88, 166, 255, 0.074);
}
.routemain {
  text-decoration: none;
}
</style>
