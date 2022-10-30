<template>
  <div>
    <button class="my-button" @click="handleClick">Click Me</button>
    <div v-if="num" class="my-count">{{ num }}</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "PostComponent",
  async created () {
    await this.fetchCount()
  },
  data () {
    return {
      num: null
    }
  },
  methods: {
    async fetchCount () {
      const { data } = await axios.get("/api/count")
      this.num = data.num
    },
    async handleClick () {
      const { data } = await axios.post("/api/count", { num: this.num += 1 })
      this.num = data.num
    }
  }
}
</script>
