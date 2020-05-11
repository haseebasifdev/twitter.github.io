<template>
  <div>
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
                :src="usertweet[commentpostindex].user.profile"
                class="mr-2 rounded rounded-circle"
                width="50px"
                height="50px"
              />
              <div class>
                <span class="font-weight-bolder">{{usertweet[commentpostindex].user.name}}</span>
                <span class="text-muted">{{'@'+usertweet[commentpostindex].user.username}}</span>
                <span class="text-muted">{{usertweet[commentpostindex].tweet.created_at | date}}</span>
                <div>{{usertweet[commentpostindex].tweet.tweet}}</div>
                <div class="mt-2">
                  Replying to
                  <span
                    class="text-primary"
                  >{{'@'+usertweet[commentpostindex].user.username}}</span>
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
                <div>
                  <!-- <img
                    :src="picture"
                    width="100%"
                    height="100%"
                    class="img-fluid position-relative p-2"
                    alt
                    srcset
                  />-->
                  <!-- <div
                    v-if="picture"
                    style="bottom:50%;"
                    class="cancel p-2 font-weight-bolder position-absolute ml-3 rounded rounded-circle"
                  >X</div>-->
                </div>
                <div class="mt-2">
                  <!-- <span class="image-upload">
                    <label for="file-input" class="file-input text-primary my-auto">
                      <i class="far fa-image fa-2x"></i>
                    </label>
                    <input id="file-input" type="file" accept="image/*" />
                  </span>-->
                  <span class="float-right">
                    <button class="btn btn-primary tweet" @click="commentit()">Reply</button>
                  </span>
                  <!-- <slot></slot> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "post",
  props: [],
  data() {
    return {
      tweetreply: ""
    };
  },
  methods: {
    commentit() {
      var data = {
        post_id: this.usertweet[this.commentpostindex].tweet.id,
        comment: this.tweetreply,
        index: this.commentpostindex
      };
      this.tweetreply = "";
    //   console.log(data);

      $("#comment").modal("hide");
      this.$store.dispatch("commentit", data);
    }
  },
  mounted() {},
  computed: {
    ...mapState(["user", "commentpostindex", "usertweet"])
  }
};
</script>
<style scoped>
.file-input {
  padding: 10px;
}
.file-input:hover {
  background: rgba(54, 54, 250, 0.1);
  border-radius: 25px;

  cursor: pointer;
}
.image-upload > input {
  display: none;
}
.image-upload {
  margin-left: 12%;
}
textarea:focus {
  box-shadow: none;
}
textarea {
  font-size: 18px;
}
button.tweet {
  border-radius: 30px;
}
div.cancel:hover {
  cursor: pointer;
}
div.cancel {
  font-size: 1.2rem;
  color: white;
  background: rgba(0, 0, 0, 0.4);
}
</style>
