<template>
  <div 
    id="editor"
    :style="editorStyle"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove">
    
    <!-- <div 
      :style="styleObject" 
      @mousedown="onMouseDown($event)"
      @dragstart="onDragStart"
      ref="testt"
      id="test">

    </div> -->
    <editor-component :editor-mouse-move-event="mouseMoveEvent" />
    <editor-component :editor-mouse-move-event="mouseMoveEvent" />
  </div>
</template>

<script>

import { ref } from 'vue'
import EditorComponent from './components/EditorComponent.vue'

export default {
  data() {
    return {
      mouseDown: false,
      // left: 0,
      // top: 0,
      editorLeft: 0,
      editorTop: 0,
      // shiftX: 0,
      // shiftY: 0,
      //focus: false,
      mouseMoveEvent: null,
    }
  },

  components: {
    EditorComponent,
  },

  computed: {
    // styleObject() {
    //   return {
    //     left: this.left + "px",
    //     top: this.top + "px",
    //   }
    // },
    editorStyle() {
      return {
        left: this.editorLeft + "px",
        top: this.editorTop + "px",
      }
    }
  },
  methods: {
    onMouseDown(event) {
      // this.mouseDown = true;
      // const rect = this.testt.getBoundingClientRect();
      // this.shiftX = event.clientX - rect.left;
      // this.shiftY = event.clientY - rect.top;
      //this.testt.addEventListener('mousemove', this.onMouseMove);
      //this.testt.addEventListener('mouseup', this.onMouseUp);
      //this.focus = this.focus;
      console.log(event);
    },
    onMouseUp() {
      
      //this.mouseDown = false;
    },
    onMouseMove(event) {
      this.mouseMoveEvent = event
      // if(this.mouseDown) {
      //   this.left = event.pageX - this.shiftX;
      //   this.top = event.pageY - this.shiftY;
      // }
      
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
  
</style>
