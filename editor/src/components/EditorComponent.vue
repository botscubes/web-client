<template>
    <div
        @dragstart.prevent="onDragStart($event)"
        @mousedown="onMouseDown()"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove()"
        
        :style="styleComponent" 
        ref="component"
        class="component"
    >
      <connecting-element class="conn-el"/>
      <button @click="deleteComponent" class="btn-delete">&#10006;</button>
    </div>

</template>


<script>

import { ref } from 'vue'
import ConnectingElement from './ConnectingElement.vue'

export default {
  props: {
    editorObject: {
        type: Object,
        default: null,
    },
    id: {
      type: Number,
      default: null,
    }
  },
  components: {
    ConnectingElement,
  },
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
    styleComponent() {
      return {
        left: this.left + "px",
        top: this.top + "px",
      }
    },
  },
  
  methods: {
    onDragStart() {
        return false;
    },
    onMouseUp() {
      this.mouseDown = false;
    },
    onMouseDown() {
      
      if(this.editorObject) {
        this.mouseDown = true;
        
        this.shiftX = this.editorObject.mouseX - this.left;
        this.shiftY = this.editorObject.mouseY - this.top;
      }
      
      
    },
    onMouseMove() {
      
    },
    onMouseLeave() {
      this.mouseDown = false;
      
    },
    deleteComponent() {
      
      this.$emit('deleteComponent', this.id)
    }
  },
  watch: {
    editorObject() {
      if(this.editorObject) {
        if(!this.editorObject.mouseDown) {
          this.mouseDown = false;
        }


        if(this.mouseDown) {
          this.left = this.editorObject.mouseX - this.shiftX;
          this.top = this.editorObject.mouseY - this.shiftY;
        }
      }
      
    }
  },
  emits: {
    
    deleteComponent: (id) => {
      if(id===null) {
        return false;
      }
      return true;
    },
  
  },
  setup() {
    const component = ref(null)
    return {
      component
    }
  },
}
</script>

<style>

.component {
  width: 100px;
  height: 100px;
  background-color: aqua;
  position: absolute;
  z-index: 1;
}

.conn-el {
  position: absolute;
  left: -10px;
  top: 40px;
}

.btn-delete {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
