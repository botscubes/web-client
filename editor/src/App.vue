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
      v-bind="editorComponent" 
      @delete-component="deleteComponent"
      @conn-start="startConnecting"
      />
    
    <connecting-line 
    v-for="(line, index) in lines"
    :key="index"
    :absolute-x1="line.x1"
    :absolute-x2="line.x2"
    :absolute-y1="line.y1"
    :absolute-y2="line.y2"/>

    <connecting-line 
    :absolute-x1="line.x1"
    :absolute-x2="line.x2"
    :absolute-y1="line.y1"
    :absolute-y2="line.y2"
    :style="lineStyle"/>

    <div class="delete-btn-location">
      <button @click="addComponent" id="btn-add">Add component</button>
    </div>
    
  </div>
</template>

<script>

import { ref } from 'vue'
import { EditorController } from './EditorController.js'

import EditorComponent from './components/EditorComponent.vue'
import ConnectingLine from './components/ConnectingLine.vue'




export default {
  data() {
    return {
      mouseDown: false,
      editorLeft: 100,
      editorTop: 100,
      
      mouseX: 0,
      mouseY: 0,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
      lines: [
      ],
      editorController: new EditorController(),
      conn: false,
      
    }
  },

  components: {
    EditorComponent,
    ConnectingLine,
  },

  computed: {
    
    editorStyle() {
      return {
        left: this.editorLeft + "px",
        top: this.editorTop + "px",
      }
    },
    editorComponent() {
      return {
        editorMouseX: this.mouseX,
        editorMouseY: this.mouseY,
        editorMouseDown: this.mouseDown,
      }
    },
    lineStyle() {
      return {
        visibility: this.conn ? "visible" : "hidden",
      }
    }
    
    

  },
  methods: {
    onMouseDown() {
      this.mouseDown = true;
      
      
    },
    onMouseUp() {
      this.conn = false;
      this.mouseDown = false;
    },
    onMouseMove(event) {
      const rect = this.editor.getBoundingClientRect();
      this.mouseX = this.editor.scrollLeft + event.clientX - rect.left;
      this.mouseY = this.editor.scrollTop + event.clientY - rect.top;
      
      if(this.conn) {
        this.line.x2 = this.mouseX;
        this.line.y2 = this.mouseY;
      }
      
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
    },
    startConnecting(event) {
      this.conn = true;
      console.log(event)
      this.line.x1 = event.x;
      this.line.y1 = event.y;
      this.line.x2 = event.x;
      this.line.y2 = event.y;
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
    background-color: gray;
    width: 70%;
    height: 600px;
  }



  #btn-add {
    position: fixed;
    z-index: 1000;
    padding:0;
    
  }

  .delete-btn-location {
    position: absolute;
    left: 5%;
    bottom: 5%;
    margin: 0;
    
  }
  
</style>
