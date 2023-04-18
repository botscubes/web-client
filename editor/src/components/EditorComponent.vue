<template>
    <div
        @dragstart.prevent="onDragStart($event)"
        @mousedown="onMouseDown()"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove()"
        
        :style="styleComponent" 
        ref = "component"
        id = "component"
    ></div>

</template>


<script>
import { ref } from 'vue'

export default {
  props: {
    editorObject: {
        type: Object,
        default: null,
    }
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
  

  setup() {
    const component = ref(null)
    return {
      component
    }
  },
}
</script>

<style>

#component {
  width: 100px;
  height: 100px;
  background-color: aqua;
  position: absolute;
  z-index: 1;
}

</style>
