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
    <editor-component 
    v-for="component in editorController.getComponents()"
    :key="component.id"
    :id="component.id"
    :editor-object="editorObject" 
    @delete-component="deleteComponent"/>
    

    <button @click="addComponent" id="btn-add">Add component</button>
  </div>
</template>

<script>

import { ref } from 'vue'
import EditorComponent from './components/EditorComponent.vue'
import { EditorController } from './EditorController.js'

export default {
  data() {
    return {
      mouseDown: false,
      
      editorLeft: 100,
      editorTop: 100,
      
      mouseX: 0,
      mouseY: 0,

      editorController: new EditorController(),
      
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
    },
    
    

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
    },
    addComponent() {
      //this.components.push(3)
      this.editorController.addComponent()
    },
    deleteComponent(id) {
      this.editorController.deleteComponentById(id)
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
    height: 600px;
  }

  #btn-add {
    position: absolute;
    z-index: 1000;
    bottom: 0;
    left: 0;
    margin: 10px;
  }
  
</style>
