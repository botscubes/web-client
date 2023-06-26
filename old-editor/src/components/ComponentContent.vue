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
    <button @click="apply">Apply</button>
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
    },
    
  },
  data() {
    return {
      text: "",
      textButton: "",
      buttons: new Map(),
      error: "",
      buttonId: -1,
      changes: new Map(),
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addButton() {
      
      if(this.textButton) {
        this.error = "";
        this.changes.set(this.buttonId, {
          type: "add",
          text: this.textButton,
        });
        this.buttons.set(this.buttonId, new Command(this.buttonId--, "text", this.textButton));
        
        
        this.textButton = "";

      } else {
        this.error = "Button text is empty"
      }
      
    },
    deleteButton(event) {
      const key = Number(event.currentTarget.dataset.key);
      this.buttons.delete(key);
      if(key >= 0) {
        this.changes.set(key, {
          type: "delete",
          text: "",
        });
      } else {
        this.changes.delete(key);
      }
      
      // console.log(key);
      //console.log(this.buttons);
    },
    apply() {
      this.changes.text = this.text;
      this.$emit("apply", this.changes);
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
  emits: ["close", "apply"],
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