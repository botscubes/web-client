<template>
  <div 
    :style="styleObject"
    class="component-content"
    >
    <button class="component-content-close-btn"
      @click="close"
      >&#10006;</button>
    <p>Text: {{ text }}</p>
    <input />


  </div>
</template>

<script>



export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {
    styleObject() {
      return {
        visibility: this.isOpen ? "visible" : "hidden",
      }
    }
  },
  emits: ["close"],
}

</script>


<style>
.component-content {
  padding: 1%;
}

.component-content-close-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 1%;
}
</style>