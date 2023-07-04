<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import { getLogin } from "../utils/api"
export default {
  name: "HomeView",
  components: {
    HelloWorld
  },
  data() {
    return {
      form: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      }
    }
  },
  created() {
    getLogin(this.form).then((res) => {
      console.log(res)
    })
  }
}
</script>
