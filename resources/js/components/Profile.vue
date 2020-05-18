<template>
  <div class="row" id="profile">
    <div class="col-md-7 p-0 m-0 border">
      <div class="cover position-relative">
        <img src="images/cover.jfif" width="100%" height="250px" alt />
        <div class="profile position-absolute" style="bottom:-30%">
          <img
            :src="showprofile.user.profile"
            class="rounded rounded-circle bg-white ml-3 p-1 img-profile"
            width="130px"
            alt
          />
        </div>
        <div v-if="showprofile.user.username==user.username">
          <i
            class="fas fa-camera text-white ipic position-absolute"
            @click="profilepic()"
            style="left:70px"
          ></i>
        </div>
      </div>

      <div>
        <button
          v-if="showprofile.user.username==user.username"
          class="btn btn-outline-primary btn-md float-right font-weight-bolder mt-2 mr-2"
          @click="profilemodel()"
        >Edit profile</button>
        <div v-else class="float-right mr-3 mt-2">
          <span class="message p-2 rounded-circle mx-2">
            <router-link
              :to="{name:'messagebody',params: { username: showprofile.user.username }}"
              class="route"
            >
              <i class="far fa-envelope text-primary fa-lg"></i>
            </router-link>
          </span>
          <span v-if="showprofile.follow">
            <button
              class="btn btn-primary btn-sm px-4 font-weight-bolder following"
              @click="unfollow(showprofile.user.id,-1)"
            >
              <span>Following</span>
            </button>
          </span>
          <span v-else>
            <button
              class="btn btn-outline-primary btn-sm px-4 font-weight-bolder follow"
              @click="follow(showprofile.user.id,-1)"
            >Follow</button>
          </span>
        </div>
      </div>
      <div class="userdata ml-3">
        <div class="name">{{showprofile.user.name}}</div>
        {{'@'+ showprofile.user.username}}
        <div v-if="showprofile.user.bio" class="my-2">{{showprofile.user.bio}}</div>
        <div v-else>No Bio Yet</div>
        <div class="row text-muted mt-2">
          <div class="col-4 m-0">
            <i class="fas fa-map-marker-alt fa-md"></i>
            {{showprofile.user.location }}
          </div>
          <div class="col-4 m-0 p-0">
            <i class="fas fa-birthday-cake"></i>
            Born {{showprofile.user.birthday | date}}
          </div>
          <div class="col-4 m-0 p-0">
            <i class="far fa-calendar-alt"></i>
            Joined {{showprofile.user.created_at | date}}
          </div>
        </div>
        <div v-if="showprofile.user.website" class="my-1">
          <a :href="'https://'+showprofile.user.website" class="website">
            <i class="fas fa-link"></i>
            {{showprofile.user.website}}
          </a>
        </div>
        <div class="mb-4">
          <router-link :to="{name:'following'}">
            <span class="font-weight-bolder text-dark">{{showprofile.following}}</span>
            <span class="text-muted mr-4">Following</span>
          </router-link>
          <router-link :to="{name:'follower'}">
            <span class="font-weight-bolder text-dark">{{showprofile.followers}}</span>
            <span class="text-muted">Followers</span>
          </router-link>
        </div>
      </div>

      <post class="border-top" :user="user" :usertweet="usertweet"></post>
    </div>
    <div class="col-md-5">
      <!-- <router-view :key="$route.path"></router-view> -->
      <!-- <input type="file" id="file" accept="image/*" style="border:none" /> -->
    </div>
    <!-- Modal -->
    <div
      v-if="showprofile.user.username==user.username"
      class="modal fade"
      id="profilepic"
      tabindex="-1"
      role="dialog"
      aria-labelledby="profilepicLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Select Your Picture</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              v-if="picture"
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
            <span class="image-upload">
              <label for="file-input" class="file-input p-3 text-primary my-auto">
                <i class="far fa-image fa-2x"></i>
              </label>
              <input id="file-input" type="file" @change="onFileChange" accept="image/*" />
            </span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveprofilepic()">Update</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      v-if="showprofile.user.username==user.username"
      class="modal fade"
      id="profile"
      tabindex="-1"
      role="dialog"
      aria-labelledby="profileTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered overflow-auto" role="document" width="500px">
        <div class="modal-content">
          <div class="modal-header">
            <span class="x text-primary font-weight-bolder" @click="hidemodel()">X</span>
            <h5 class="modal-title font-weight-bolder" id="exampleModalLongTitle">Edit Profile</h5>
            <button
              class="btn btn-primary btn-sm font-weight-bolder my-auto"
              @click="saveprofile()"
            >Save</button>
          </div>
          <div class="modal-body overflow-auto" style="height:500px">
            <form>
              <div class="cover position-relative">
                <img src="images/cover.jfif" width="100%" height="200px" alt />
                <div class="profile position-absolute" style="bottom:-30%">
                  <img
                    :src="user.profile"
                    class="rounded rounded-circle bg-white ml-3 p-1 img-fluid"
                    width="130px"
                    alt
                  />
                </div>
              </div>
              <div class="form-group userdata">
                <label for="exampleInputEmail1">Name</label>
                <input
                  v-model="userdeta.name"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
                <span v-if="userdeta.name.length<1" class="text-danger">Name can't be empty</span>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Bio</label>
                <textarea
                  v-model="userdeta.bio"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Bio"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Location</label>
                <input
                  v-model="userdeta.location"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Your Location"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Webiste</label>
                <input
                  v-model="userdeta.website"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Your Website"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Birthday</label>
                <div class="pl-3 border rounded py-2">{{user.birthday | date}}</div>
              </div>
            </form>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import post from "./Posts";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    post
  },
  data() {
    return {
      picture: ""
    };
  },
  methods: {
    follow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("follow", data);
    },
    unfollow(userid, index) {
      var data = {
        follow_id: userid,
        index: index
      };
      this.$store.dispatch("unfollow", data);
    },
    saveprofilepic() {
      var data = {
        avatar: this.picture
      };

      this.$store.dispatch("saveprofilepicture", data);
      this.fetchusertweet();
      this.fetchuser();
      this.picture = "";
      $("#profilepic").modal("hide");
    },
    profilepic() {
      $("#profilepic").modal("show");
    },
    cancelpicture() {
      this.picture = "";
    },
    onFileChange(e) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = e => {
        this.picture = e.target.result;
      };
    },
    hidemodel() {
      this.fetchusertweet();
      this.fetchuser();
      $("#profile").modal("hide");
    },
    profilemodel() {
      $("#profile").modal("show");
      // this.authuser.push(this.userdetail);
      // console.log(this.userdetail);
    },
    saveprofile() {
      if (this.userdeta.name.length > 0) {
        this.$store.dispatch("saveprofile", this.userdeta);
        this.fetchusertweet();
        this.fetchuser();

        $("#profile").modal("hide");
      }
    },

    ...mapActions(["fetchusertweet", "fetchuser", "alluser"])
  },
  mounted() {
    // this.fetchusertweet();
    this.fetchuser();
    this.alluser();
    this.$store.dispatch("showprofile", this.$route.params.username);
    this.$store.dispatch("showtweets", this.$route.params.username);
  },
  computed: {
    ...mapState(["user", "usertweet", "showprofile"]),
    ...mapState({
      userdeta: state => state.user
    }),
    ...mapGetters(["allfollower", "allfollowing", "authusertweet"])
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
.image-upload > input {
  display: none;
}
span.x:hover {
  cursor: pointer;
}
.image-upload > input {
  display: none;
}
i.ipic:hover {
  cursor: pointer;
  opacity: 0.3;
}
i.ipic:hover {
  cursor: pointer;
  opacity: 0.9;
}
i.ipic {
  opacity: 0.6;
}
.file-input:hover {
  background: rgba(54, 54, 250, 0.1);
  border-radius: 40px;

  cursor: pointer;
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
a.website:hover {
  text-decoration: none;
}
span.message {
  border: 1px solid rgb(52, 130, 255);
}
span.message:hover {
  cursor: pointer;
  background-color: rgba(0, 110, 255, 0.1);
}
</style>
