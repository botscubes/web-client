<template>
  <div 
    id="editor"
    :style="editorStyle"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove">
    
    <div 
      :style="styleObject" 
      @mousedown="onMouseDown($event)"
      @dragstart="onDragStart"
      ref="testt"
      id="test">

    </div>
  </div>
</template>

<script>

import { ref } from 'vue'

export default {
  data() {
    return {
      mouseDown: false,
      left: 0,
      top: 0,
      editorLeft: 0,
      editorTop: 0,
      shiftX: 0,
      shiftY: 0,
      //focus: false,
    }
  },
  computed: {
    styleObject() {
      return {
        left: this.left + "px",
        top: this.top + "px",
      }
    },
    editorStyle() {
      return {
        left: this.editorLeft + "px",
        top: this.editorTop + "px",
      }
    }
  },
  methods: {
    onMouseDown(event) {
      this.mouseDown = true;
      const rect = this.testt.getBoundingClientRect();
      this.shiftX = event.clientX - rect.left;
      this.shiftY = event.clientY - rect.top;
      //this.testt.addEventListener('mousemove', this.onMouseMove);
      //this.testt.addEventListener('mouseup', this.onMouseUp);
      //this.focus = this.focus;
    },
    onMouseUp() {
      
      this.mouseDown = false;
    },
    onMouseMove(event) {
      if(this.mouseDown) {
        this.left = event.pageX - this.shiftX;
        this.top = event.pageY - this.shiftY;
      }
      
    },
    onDragStart() {
      return false;
    }
  },
  setup() {
    const testt = ref(null)
    return {
      testt
    }
  }
  
  
}
</script>

<style>
  #editor {
    position: relative;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    overflow-block: scroll;
    background-color: red;
    width: 800px;
    height: 800px;
  }
  #test {
    width: 100px;
    height: 100px;
    background-color: aqua;
    position: absolute;
    z-index: 1;
  }
</style>
