<template>
    <div
        @dragstart.prevent="onDragStart($event)"
        @mousedown="onMouseDown()"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove()"
        
        :style="componentStyle" 
        ref="component"
        class="component"
    >
      <button @click="deleteComponent" class="btn-delete">&#10006;</button>

      <binding-area v-bind="bindingAreaLeft" />
      <binding-area v-bind="bindingAreaRight" />
      <binding-area v-bind="bindingAreaTop" />
      <binding-area v-bind="bindingAreaBottom" />

      <jump-button 
      v-for="(btn, index) in buttons"
      :key="index" 
      :text="btn.text"
      :width="this.width"
      :height="this.buttonHeight"
      :top="(this.buttonIndent+this.buttonHeight)*index + this.buttonIndent"


      />

    </div>

</template>


<script>

import { ref } from 'vue'
import JumpButton from './JumpButton.vue'
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
    JumpButton,
    BindingArea
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
      width: 100,
    
      buttons: [
        {
          text: "Test",
        },
        {
          text: "Test",
        },
        
      ],
      buttonIndent: 20,
      buttonHeight: 40,
      //focus: false,
    }
  },
  computed: {
    height() {
      return this.buttons.length * (this.buttonHeight+this.buttonIndent) + this.buttonIndent;
    },
    componentStyle() {
      


      return {
        left: this.left + "px",
        top: this.top + "px",
        width: this.width + "px",
        height: this.height + "px"
      }
    },
    bindingAreaLeft() {
      const w = this.width/5;

      return {
        width: w,
        height: this.height,
        left: -w/2,
        mouseX: this.editorObject.mouseX - this.left,
        mouseY: this.editorObject.mouseY - this.top,
      };
    },
    bindingAreaRight() {
      const w = this.width/5;

      return {
        width: w,
        height: this.height,
        right: -w/2,
        mouseX: this.editorObject.mouseX - this.left,
        mouseY: this.editorObject.mouseY - this.top,
      };
    },
    bindingAreaTop() {
      const h = this.width/5;

      return {
        width: this.width,
        height: h,
        top: -h/2,
        mouseX: this.editorObject.mouseX - this.left,
        mouseY: this.editorObject.mouseY - this.top,
      };
    },
    bindingAreaBottom() {
      const h = this.width/5;

      return {
        width: this.width,
        height: h,
        bottom: -h/2,
        mouseX: this.editorObject.mouseX - this.left,
        mouseY: this.editorObject.mouseY - this.top,
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
      
    },
    
     
    
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
  margin: 0px;
  top: 0;
  right: 0;
}



</style>
