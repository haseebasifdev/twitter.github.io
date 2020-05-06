<template>
  <div class="card border-left-0 border-right-0">
    <div class="mx-3 d-flex my-2">
      <img :src="user.profile" class="mr-2 rounded rounded-circle" width="55px" height="55px"  />
      <div>
        <span class=" font-weight-bolder">{{user.name}}</span>
        <span class=" text-muted">{{'@'+user.username}}</span>
        <div>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic veniam veritatis ea aliquid ullam quis quidem quos, odio vel laborum assumenda voluptates molestiae repudiandae fugit in quisquam facere voluptate ratione? adipisicing elit. Provident rem eum nostrum laborum eos numquam blanditiis at quis vel! Quibusdam.</div>
        <div><img :src="user.profile" width="100%"  alt="" srcset=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "post",
  props: ["user"],
  data() {
    return {};
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
</style>
