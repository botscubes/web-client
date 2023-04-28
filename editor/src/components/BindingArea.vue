<template>
    <div class="binding-area"
    ref="bindingArea"
    :style="styleObject"
    @mousedown.stop="onMouseDown"
    @mousemove="onMouseMove">
      
      <binding-element  
        v-for="(el, index) in elements"
        :key="index"
        v-bind="bindingElement"
        />

    </div>
</template>



<script>


import BindingElement from './BindingElement.vue'

export default {
  props: {
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: null,
    },
    right: {
      type: Number,
      default: null,
    },
    bottom: {
      type: Number,
      default: null,
    },
    left: {
      type: Number,
      default: null,
    },
    mouseX: {
      type: Number,
      default: 0,
    },
    mouseY: {
      type: Number,
      default: 0,
    },

    

  },
  data() {
    return {
      elements: [
        1
      ],
      relativeX: 0,
      relativeY: 0,
    }
  },
  methods: {
    onMouseDown() {
      
    },
    onMouseMove() {

    }
  },
  computed: {
    bindingElement() {
      
      const min = Math.min(this.width, this.height)
      
      return {
        width: min,
        height: min,
        left: this.bindingElementLeft,
        top: this.bindingElementTop,
      }
    },
    styleObject() {
      return {
        width:this.width + "px",
        height:this.height + "px",
        left: this.left + "px",
        right: this.right + "px",
        top: this.top + "px",
        bottom: this.bottom + "px",
      };
      
    },
    bindingElementLeft() {
      if(this.top || this.bottom){
        return this.relativeX;
      }
      return null;
    },
    bindingElementTop() {
      if(this.left || this.right){
        return this.relativeY;
      }
      return null;
    },

    
    
  },
  watch: {
    mouseX() {
      if(this.mouseX > 0 && this.mouseX < this.width) {
        this.relativeX = this.mouseX;
      }
      
    },
    mouseY() {
      if(this.mouseY > 0 && this.mouseY < this.height) {
        this.relativeY = this.mouseY;
      }
    },
  },

  components: {
    BindingElement,
  },
  setup() {
    
  },

}


</script>


<style>
.binding-area {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>