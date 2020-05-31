<template>
  <div class="row">
    
    <div class="col-md-11 col-xl-8">
      <div class=" border-bottom post border">
        <!-- <ul><li>Tweet</li></ul> -->
        <nav
      class="navbar navbar-expand-lg navbar-light sticky-top bg-white border-bottom"
    >
      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <div class=" mr-4  d-flex">
            <!-- <li class="nav-item mr-4"> -->
            <router-link :to="{name:'home'}" class="nav-link font-weight-bold">
              <i class="fas fa-arrow-left text-primary fa-lg mr-3"></i>
              
            </router-link>
            <h4 class=" my-auto">Tweet</h4>
            <!-- </li> -->
          </div>
          <div>
            <!-- <li class="nav-item p-0 m-0"> -->
            <!-- <div style="font-size:" class="font-weight-bolder m-0 p-0">{{user.name}}</div> -->
            <!-- <div class="m-0 p-0">Tweets {{usertweet.length}}</div> -->
          </div>
          <!-- </li> -->
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>-->
      </div>
    </nav>
        <div class="mx-3 d-flex mt-2">
          <!-- profile -->
          <img
            :src="tweet.user.profile"
            class="mr-2 rounded rounded-circle"
            width="50px"
            height="50px"
          />
          <div>
            <span class="font-weight-bolder">
              <router-link
                class="route text-dark"
                :to="{name:'profile',params: { username: tweet.user.username }}"
              >{{tweet.user.name}}</router-link>
            </span>
            <span class="text-muted">{{'@'+tweet.user.username}}</span>
            <span class="text-muted ml-2">{{tweet.tweet.created_at | date}}</span>
            <div class="text-dark">{{tweet.tweet.tweet}}</div>
          </div>
        </div>
        <!-- end Profile -->
        <!-- Post -->
        <div class="mb-2 mx-4 pb-2">
          <img :src="tweet.tweet.tweetpicture" width="100%" class="tweetpic my-2 border" alt srcset />
          <div>{{tweet.created_at | date}}</div>
        </div>
        <!-- EndPost -->
        <!-- Likes and other -->
        <div class="mb-2 mx-4 justify-content-around py-2 px-2 border-top border-bottom">
          <span class>
            {{tweet.likes}}
            Likes
          </span>
        </div>
        <div class="d-flex justify-content-around mb-2 mx-4">
          <div>
            <i class="far fa-comment comment fa-lg p-2" @click="commentmodel()"></i>
            <!-- <span v-if="tweet.comments">{{tweet.comments}}</span> -->
          </div>

          <div>
            <span v-if="tweet.retweeted">
              <i class="fas fa-sync-alt sync fa-lg p-2 text-success" @click="retweet()"></i>
              <span v-if="tweet.retweet" class="text-success">{{tweet.retweet}}</span>
            </span>
            <span v-else>
              <i class="fas fa-sync sync fa-lg p-2" @click="retweet()"></i>
              <span v-if="tweet.retweet" class="text-dark">{{tweet.retweet}}</span>
            </span>
          </div>
          <div>
            <span v-if="tweet.liked">
              <i class="fas fa-heart heart text-danger fa-lg p-2" @click="likepost()"></i>
            </span>
            <span v-else>
              <i class="far fa-heart heart fa-lg p-2" @click="likepost()"></i>
            </span>
          </div>
          <div>
            <i class="fas fa-upload upload fa-lg p-2"></i>
          </div>
        </div>
        <!-- End Likes and other -->
        <!-- Comments -->
        <div class>
          <div class="d-flex border-top py-3 px-3" v-for=" commentdata in tweet.comments">
            <img
              :src="commentdata.user.profile"
              class="mr-2 rounded rounded-circle"
              width="50px"
              height="50px"
            />
            <div>
              <span class="font-weight-bolder">
                <router-link
                  class="route text-dark"
                  :to="{name:'profile',params: { username: commentdata.user.username }}"
                >{{commentdata.user.name}}</router-link>
              </span>
              <span class="text-muted">{{'@'+commentdata.user.username}}</span>
              <span class="text-muted ml-2">{{commentdata.comment.created_at | date}}</span>
              <div class="text-dark">{{commentdata.comment.comment}}</div>
            </div>
          </div>
        </div>

        <!-- End comments -->
        <!-- <postcomment :post="tweet"></postcomment> -->
      </div>
    </div>
    <div class="col-md-4"></div>
    <!-- Comment Model -->

    <div
      class="modal fade"
      id="comment"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close text-primary"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="ml-3 d-flex">
              <img
                :src="tweet.user.profile"
                class="mr-2 rounded rounded-circle"
                width="50px"
                height="50px"
              />
              <div class>
                <span class="font-weight-bolder">{{tweet.user.name}}</span>
                <span class="text-muted">{{'@'+tweet.user.username}}</span>
                <span class="text-muted">{{tweet.tweet.created_at | date}}</span>
                <div>{{tweet.tweet.tweet}}</div>
                <div class="mt-2">
                  Replying to
                  <span class="text-primary">{{'@'+tweet.user.username}}</span>
                </div>
              </div>
            </div>
            <div class>
              <div class="mx-3 mt-2">
                <div class="d-flex">
                  <img
                    class="mr-2 rounded rounded-circle"
                    :src="user.profile"
                    width="50px"
                    height="50px"
                    alt
                  />

                  <span class="form-group">
                    <textarea
                      v-model="tweetreply"
                      cols="60"
                      class="form-control border-0"
                      placeholder="Tweet your reply"
                      rows="1"
                      @keyup.enter="commentit()"
                    ></textarea>
                  </span>
                </div>
                <div></div>
                <div class="mt-2">
                  <span class="float-right">
                    <button class="btn btn-primary tweet" @click="commentit()">Reply</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Comment Model -->
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
    return {
      tweetreply: ""
    };
  },
  methods: {
    ...mapActions(["showtweet", "fetchuser"]),
    likepost() {
      var data = {
        post_id: this.tweet.tweet.id,
        index: -1
      };
      this.$store.dispatch("likepost", data);
    },
    retweet() {
      var data = {
        post_id: this.tweet.tweet.id,
        index: -1
      };
      this.$store.dispatch("retweetpost", data);
    },
    commentmodel() {
      $("#comment").modal("show");
    },
    commentit() {
      var data = {
        post_id: this.tweet.tweet.id,
        comment: this.tweetreply,
        created_at: new Date(),
        index: -1
      };
      // var currentDate = new Date();
      // console.log(this.tweet.tweet.created_at);
      // console.log(currentDate);

      // var currentDateWithFormat = new Date()
      //   .toJSON()
      //   .slice(0, 10)
      //   .replace(/-/g, "-");
      // console.log(currentDateWithFormat);
      this.tweetreply = "";
      $("#comment").modal("hide");
      this.$store.dispatch("commentit", data);
    }
  },

  mounted() {
    this.showtweet(this.$route.params.id);
    this.fetchuser();
  },
  computed: {
    ...mapState(["tweet", "user"])
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
.tweetpic {
  border-radius: 15px;
}
i.heart,
i.comment {
  cursor: pointer;
}
div.modal-content {
  border-radius: 20px;
}
textarea:focus {
  box-shadow: none;
}
textarea {
  font-size: 18px;
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
.comment:hover {
  cursor: pointer;
  color: rgba(0, 251, 0, 0.676);
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 40px;
}
.upload:hover {
  cursor: pointer;
  color: red;

  background-color: rgba(255, 0, 0, 0.05);
  border-radius: 40px;
}
</style>
