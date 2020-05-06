<template>
  <div class="card">
    <div class="mx-3 mt-2">
      <div class>
        <div class="d-flex">
          <img
            :src="user.profile"
            class="mr-2 rounded rounded-circle"
            width="55px"
            height="55px"
            alt
          />

          <span class="form-group">
            <textarea
              v-model="tweet"
              cols="60"
              class="form-control border-0"
              placeholder="What's happening?"
              rows="1"
            ></textarea>
          </span>
        </div>
      </div>
      <div class="mt-2">
        <span class="image-upload">
          <label for="file-input" class="file-input text-primary my-auto">
            <i class="far fa-image fa-2x"></i>
          </label>
          <input id="file-input" type="file" />
        </span>
        <button class="btn btn-primary tweet float-right">Tweet</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "tweet",
  data() {
    return {
      tweet: ""
    };
  },
  methods: {
    ...mapActions(["fetchuser"])
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
</style>
