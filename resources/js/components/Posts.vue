<template>
  <div>
    <div v-for="(data,index) in usertweet" class="pt-2 border-bottom post">
      <div class="mx-3 d-flex">
        <img
          :src="data.user.profile"
          class="mr-2 rounded rounded-circle"
          width="50px"
          height="50px"
        />
        <div>
          <span class="font-weight-bolder">
            <router-link
              class="text-dark"
              :to="{name:'profile',params: { username: data.user.username }}"
            >{{data.user.name}}</router-link>
          </span>
          <span class="text-muted">{{'@'+data.user.username}}</span>
          <span class="text-muted ml-2 position-relative">{{data.tweet.created_at | date}}</span>
          <span v-if="data.user.id==user.id">
            <i
              class="fas fa-chevron-down deleteoption position-absolute p-2 rounded-circle"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style=" right:15px"
            ></i>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item text-danger" @click="deletemodel(data.tweet.id,index)" type="button">Delete</button>
            </div>
          </span>
          <!-- <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-sm"
          >Small modal</button>-->
          <!-- Delete Modell -->
          <div
            class="modal fade bd-example-modal-sm"
            id="deletemodel"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <h4 class="text-center">Delete Tweet</h4>
                  <div
                    class="text-center"
                  >This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.</div>
                  <div class="mx-auto text-center mt-3">
                    <button class="btn btn-primary mr-2" @click="deletemodel()">Cancel</button>
                    <button
                      class="btn btn-danger ml-2"
                      @click="deletetweet()"
                    >Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Delete Model -->
          <!--  -->
          <!--  -->
          <!-- <div class="text-dark" v-html="$options.filters.hashBold(data.tweet.tweet)">{{data.tweet.tweet | hashtag}}</div> -->
          <router-link
            class="routemain"
            :to="{name:'showpost',params: { username: data.user.username,id:data.tweet.id }}"
          >
            <div class="text-dark" v-html="$options.filters.hashBold(data.tweet.tweet)"></div>
            <div>
              <img
                :src="data.tweet.tweetpicture"
                width="100%"
                class="tweetpic my-2 border"
                alt
                srcset
              />
            </div>
          </router-link>
        </div>
      </div>
      <div class="d-flex justify-content-around mb-2 mx-4">
        <div>
          <i class="far fa-comment comment fa-lg p-2" @click="commentmodel(index)"></i>
          <span v-if="data.comments">{{data.comments}}</span>
        </div>
        <div>
          <span v-if="data.retweeted">
            <i
              class="fas fa-sync-alt sync fa-lg p-2 text-success"
              @click="retweet(data.tweet.id,index)"
            ></i>
            <span v-if="data.retweet" class="text-success">{{data.retweet}}</span>
          </span>
          <span v-else>
            <i class="fas fa-sync sync fa-lg p-2" @click="retweet(data.tweet.id,index)"></i>
            <span v-if="data.retweet" class="text-dark">{{data.retweet}}</span>
          </span>
        </div>
        <div>
          <span v-if="data.liked">
            <i
              class="fas fa-heart heart text-danger fa-lg p-2"
              @click="likepost(data.tweet.id,index)"
            ></i>
            <span v-if="data.likes" class="text-danger">{{data.likes}}</span>
          </span>
          <span v-else>
            <i class="far fa-heart heart fa-lg p-2" @click="likepost(data.tweet.id,index)"></i>
            <span v-if="data.likes" class="text-dark">{{data.likes}}</span>
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
    return {
      post_id:'',
      indexid:''
    };
  },
  filters: {
    hashBold: function(value) {
      if (!value) return "";
      value = value.toString();
      let hashReg = /@\w+/gm;
      let hashReg1 = /#\w+/gm;

      value = value.replace(hashReg, "<span style='color:#1DA1F2'>$&</span>");
      value = value.replace(hashReg1, "<span style='color:#1DA1F2'>$&</span>");
      return value;
    }
  },

  computed: {
    ...mapState(["user", "trendstweets"])
  },
  methods: {
    ...mapActions(["fetchusertweet", "fetchuser"]),
    deletemodel(postid,indexid) {
      this.post_id=postid;
      this.indexid=indexid;
      // alert(id)
      $("#deletemodel").modal("toggle");
      // var data = {
      //   post_id: postid,
      //   index: indexid
      // };
      // this.$store.dispatch("deletetweet", data);
    },
    deletetweet() {
      // $("#deletemodel").modal("show");
      var data = {
        post_id: this.post_id,
        index: this.indexid
      };
      this.$store.dispatch("deletetweet", data);
      // alert(data.index)
      $("#deletemodel").modal("toggle");
    },
    likepost(postid, indexid) {
      var data = {
        post_id: postid,
        index: indexid,
        flag: 1
      };
      this.$store.dispatch("likepost", data);
    },

    retweet(postid, indexid) {
      var data = {
        post_id: postid,
        index: indexid,
        flag: 1
      };
      
      this.$store.dispatch("retweetpost", data);
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
  color: rgba(0, 255, 0, 0.676);

  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 40px;
}
.retweet {
  color: rgba(0, 184, 0);
}
.comment:hover {
  cursor: pointer;
  color: rgba(0, 109, 251, 0.676);
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 40px;
}
.post:hover {
  cursor: pointer;
  background-color: rgba(88, 166, 255, 0.074);
}
.routemain {
  text-decoration: none;
}
.modal-content {
  border-radius: 40px;
}
.deleteoption:hover {
  background-color: rgb(0, 172, 238, 0.07);
}
</style>
