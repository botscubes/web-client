<template>
    <div
        @dragstart="this.onDragStart"
        @mousedown="onMouseDown($event)"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove($event)"
        
        :style="styleComponent" 
        ref = "component"
        id = "component"
    ></div>

</template>


<script>
import { ref } from 'vue'

export default {
  props: {
    editorMouseMoveEvent: {
        type: Object,
        default: null,
    }
  },
  data() {
    return {
      mouseDown: false,
      left: 1200,
      top: 1200,
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
    onMouseDown(event) {
      this.mouseDown = true;
      const rect = this.component.getBoundingClientRect();
      this.shiftX = event.clientX - rect.left;
      this.shiftY = event.clientY - rect.top;
      
    },
    onMouseMove() {
      
    },
    onMouseLeave() {
      this.mouseDown = false;
      
    }
  },
  watch: {
    editorMouseMoveEvent(event) {
      if(event) {
        if(this.mouseDown) {
          this.left = event.pageX - this.shiftX;
          this.top = event.pageY - this.shiftY;
          
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
