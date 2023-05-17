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
      v-for="[key, item] in buttons"
      :key="key"
      >
      <br />
      <button disabled>{{ item.data }}</button>
      <button 
        @click="deleteButton($event)"
        :data-key="key">&#10006;</button>
    </div>
    <br />
    <br />
    <button>Apply</button>
    <div class="error">{{ error }}</div>

  </div>
</template>

<script>

import _ from 'lodash';
import { Command } from '../EditorController';

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
      type: Map,
      default: () => new Map()
    }
  },
  data() {
    return {
      text: "",
      textButton: "",
      buttons: new Map(),
      error: "",
      buttonId: 0,
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addButton() {
      
      if(this.textButton) {
        this.error = "";
        this.buttons.set("t"+this.buttonId++, new Command(this.buttonId, "text", this.textButton));
        this.textButton = "";
      } else {
        this.error = "Button text is empty"
      }
      
    },
    deleteButton(event) {
      const key = Number(event.currentTarget.dataset.key);
      this.buttons.delete(key);
      console.log(key);
      console.log(this.buttons);
    }
  },
  computed: {
    styleObject() {
      return {
        //visibility: this.isOpen ? "visible" : "hidden",
      }
    }
  },
  created() {
    this.text = this.ptext;
  },
  watch: {
    pbuttons: {

      immediate: true,
      handler(val) {
        this.buttons = _.cloneDeep(val);
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