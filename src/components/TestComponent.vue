<template>
  <div class="my-message" v-if="msg">{{ msg }}</div>
  <div v-else>Loading...</div>
</template>

<script>
import axios from "axios"
export default {
  name: "TestComponent",
  async created () {
    const response = await axios.get("/api/msg")
    this.msg = response.data.message
  },
  data () {
    return {
      msg: null
    }
  }
}
</script>
