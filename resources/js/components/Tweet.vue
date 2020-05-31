<template>
  <div class="card">
    <div class="mx-3 mt-2">
      <div class="d-flex">
        <img :src="user.profile" class="mr-2 rounded rounded-circle" width="55px" height="55px" alt />

        <span class="form-group">
          <textarea
            v-model="tweet"
            cols="60"
            class="form-control border-0"
            placeholder="What's happening?"
            rows="1"
            @keyup.enter="tweetit"
          ></textarea>
        </span>
      </div>
      <div>
        <img
          :src="picture"
          width="100%"
          height="100%"
          class="img-fluid position-relative p-2"
          alt
          srcset
        />
        <div
          v-if="picture"
          style="bottom:50%;"
          class="cancel p-2 font-weight-bolder position-absolute ml-3 rounded rounded-circle"
          @click="cancelpicture"
        >X</div>
      </div>
      <div class="mt-2">
        <span class="image-upload">
          <label for="file-input" class="file-input text-primary my-auto">
            <i class="far fa-image fa-2x"></i>
          </label>
          <input id="file-input" type="file" @change="onFileChange" accept="image/*" />
        </span>
        <span class="float-right">
          <span v-if="tweet.length>0" :class="checktweet()">{{tweet.length}}/255</span>
          <button class="btn btn-primary tweet" @click="tweetit" :disabled="btndisable()">Tweet</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
// import emoji from './emojipicker'
export default {
  name: "tweet",
  data() {
    return {
      tweet: "",
      picture: ""
    };
  },
  methods: {
    checktweet() {
      if (this.tweet.length > 255) {
        return "my-auto mr-4 text-danger";
      } else return "my-auto mr-4 ";
    },
    btndisable() {
      if (this.tweet || this.picture) {
        return false;
      } else {
        return true;
      }
    },
    ...mapActions(["fetchusertweet", "fetchuser"]),
    onFileChange(e) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = e => {
        this.picture = e.target.result;
      };
    },
    cancelpicture() {
      this.picture = "";
    },
    tweetit() {
      if (this.tweet.length <= 255) {
        var post = {
          tweet: this.tweet,
          avatar: this.picture
        };
        var payload = {
          tweet: post,
          user: this.user
        };
        this.$store.dispatch("posttweet", payload);
        this.fetchusertweet();
        var splitstwwet=this.tweet.split(" ")
        this.picture = "";
        this.tweet = "";
        for (var i=0;i<splitstwwet.length;i++)
        {
          if(splitstwwet[i].toString().includes("#"))
          {
            
          }
        }
        $("#tweet").modal("hide");
      }
    }
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
