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
      <button @click="deleteComponent" class="btn-delete">&#10006;</button>

      <binding-area v-bind="bindingAreaLeft" />
      <binding-area v-bind="bindingAreaRight" />
      <binding-area v-bind="bindingAreaTop" />
      <binding-area v-bind="bindingAreaBottom" />
    </div>

</template>


<script>

import { ref } from 'vue'
import BindingArea from './BindingArea.vue'

export default {
  props: {
    editorObject: {
        type: Object,
        default: null,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  components: {
    BindingArea,
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
      size: {
        width: 100,
        height: 100
      }
      //focus: false,
    }
  },
  computed: {
    styleComponent() {
      return {
        left: this.left + "px",
        top: this.top + "px",
        width: this.size.width + "px",
        height: this.size.height + "px"
      }
    },
    bindingAreaLeft() {
      const w = this.size.width/5;

      return {
        width: w,
        height: this.size.height,
        left: -w/2
      };
    },
    bindingAreaRight() {
      const w = this.size.width/5;

      return {
        width: w,
        height: this.size.height,
        right: -w/2
      };
    },
    bindingAreaTop() {
      const h = this.size.width/5;

      return {
        width: this.size.width,
        height: h,
        top: -h/2
      };
    },
    bindingAreaBottom() {
      const h = this.size.width/5;

      return {
        width: this.size.width,
        height: h,
        bottom: -h/2
      };
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
  margin: 20px;
  top: 0;
  right: 0;
}



</style>
