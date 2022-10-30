import Vue from "vue"
import GetComponent from "./components/GetComponent.vue"
import PostComponent from "./components/PostComponent.vue"

window.app = new Vue({
  el: "#app",
  components: {
    getcomponent: GetComponent,
    postcomponent: PostComponent,
  }
})
