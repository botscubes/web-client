<template>
  <div 
    id="editor"
    :style="editorStyle"
    ref="editor"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave">
    
    <!-- <div 
      :style="styleObject" 
      @mousedown="onMouseDown($event)"
      @dragstart="onDragStart"
      ref="testt"
      id="test">

    </div> -->
    <editor-component :editor-object="editorObject" />
    <editor-component :editor-object="editorObject" />
  </div>
</template>

<script>

import { ref } from 'vue'
import EditorComponent from './components/EditorComponent.vue'

export default {
  data() {
    return {
      mouseDown: false,
      
      editorLeft: 100,
      editorTop: 100,
      
      mouseX: 0,
      mouseY: 0,
      
    }
  },

  components: {
    EditorComponent,
  },

  computed: {
    
    editorStyle() {
      return {
        left: this.editorLeft + "px",
        top: this.editorTop + "px",
      }
    },
    editorObject() {
      return {
        mouseX: this.mouseX,
        mouseY: this.mouseY,
        mouseDown: this.mouseDown,
      }
    }
    
    

  },
  methods: {
    onMouseDown() {
      this.mouseDown = true;
      
    },
    onMouseUp() {
      
      this.mouseDown = false;
    },
    onMouseMove(event) {
      const rect = this.editor.getBoundingClientRect();
      this.mouseX = this.editor.scrollLeft + event.clientX - rect.left;
      this.mouseY = this.editor.scrollTop + event.clientY - rect.top;
      
      
      
    },
    onDragStart() {
      return false;
    },
    onMouseLeave() {
      this.mouseDown = false;
    }
  },
  setup() {
    const editor = ref(null)
    return {
      editor
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
