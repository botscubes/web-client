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
      v-for="(component, index) in editorController.getComponents()"
      :key="index"
      :id="component.id"
      :buttons="component.commands"
      :pleft="editor.offsetWidth/3"
      :ptop="editor.offsetHeight/3"
      v-bind="editorComponent" 
      @delete-component="deleteComponent"
      @conn-start="startConnecting"
      @conn-end="connectComponents"
      />
    
    <connecting-line 
    v-for="[key, line] in lines"
    :key="key"
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

    <div class="fixed-btns-location">
      <div class="fixed-btns">
        <button @click="addComponent" id="add-btn">Add component</button>
        <button @click="saveBot" id="save-btn">Save Bot</button>
      </div>
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
      buttonId: null,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
      lines: new Map(),
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
        connectingAreaVisible: this.conn,
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
      this.line.x1 = event.x;
      this.line.y1 = event.y;
      this.line.x2 = event.x;
      this.line.y2 = event.y;
    },
    connectComponents(event) {
      let line = {
        x1: this.line.x1,
        y1: this.line.y1,
        x2: event.x,
        y2: event.y,
      }
      if(this.commandId) {
        this.lines.set(this.commandId, line);
      } else {
        console.debug("App.vue: commandId is null")
      }
      

      
    },
    saveBot() {

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



  #add-btn {
    padding: 0;
    
  }
  #save-btn {
    padding: 0;
    
  }
  .fixed-btns {
    position: fixed;
    padding: 10px;
  }

  .fixed-btns-location {
  
    position: absolute;
    
  }
  
</style>
