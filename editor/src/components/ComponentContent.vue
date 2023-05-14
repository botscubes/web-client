<template>
  <div 
    :style="styleObject"
    class="component-content"
    >
    <button class="component-content-close-btn"
      @click="close"
      >&#10006;</button>
    <p>Text: {{ text }}</p>
    <input v-model="text" />

    <br />
    <br />
    <label>Add button: </label>
    <input v-model="textButton" />
    <button @click="addButton">Add</button>
    <br />
    <br />
    <label>Commands: </label>
    <div 
      v-for="(item, index) in buttons"
      :key="index"
      >
      <br />
      <button disabled>{{ item }}</button>
      <button>&#10006;</button>
    </div>
    <br />
    <br />
    <button>Apply</button>
    <div class="error">{{ error }}</div>

  </div>
</template>

<script>



export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    ptext: {
      type: String,
      default: "",
    },
    pbuttons: {
      type: Array,
      default: () => [
        1,
        2,
        3,
      ]
    }
  },
  data() {
    return {
      text: this.ptext,
      textButton: "",
      buttons: this.pbuttons,
      error: "",
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addButton() {
      if(this.textButton) {
        this.error = "";
        this.buttons.push(this.textButton);
        this.textButton = "";
      } else {
        this.error = "Button text is empty"
      }
      
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
.error {
  color: red;
}

.component-content {
  padding: 1%;
  overflow-y: scroll;
}

.component-content-close-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 1%;
}
</style>