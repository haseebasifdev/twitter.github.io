<template>
  <div class="row">

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    ...mapActions(["alluser"]),
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
    exploreit(hashtag) {
      this.search = hashtag;
      console.log(hashtag);
    }
  },

  mounted() {
    this.alluser();
    this.$store.dispatch("explore");
  },
  computed: {
    ...mapState(["allusers", "explore"])
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
.route:hover {
  text-decoration: none;
  background-color: rgba(202, 202, 202, 0.196);
  cursor: pointer;
}
input.search {
  height: 30px;
  border-radius: 20px;
  background-color: rgba(0, 119, 255, 0.03);
  border: none;
}
input.search:focus {
  background-color: white;
  box-shadow: none;
}
ul {
  list-style-type: none;
}
h4.trend {
  font-weight: 800;
  font-family: Cambria;
}
li.trend:hover {
  background-color: rgba(200, 200, 200, 0.13);
  cursor: pointer;
}
.trending {
  text-decoration: none;
}
</style>
