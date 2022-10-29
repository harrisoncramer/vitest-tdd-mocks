import Vue from "vue"
import TestComponent from "./components/TestComponent.vue"

window.app = new Vue({
  el: "#app",
  components: {
    testcomponent: TestComponent,
  }
})
