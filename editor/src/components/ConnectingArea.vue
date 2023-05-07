<template>
    <div class="conn-area"
    ref="bindingArea"
    :style="styleObject"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove">
      
      <connecting-element-to
        v-bind="connectingElement"
        />

    </div>
</template>



<script>


import ConnectingElementTo from './ConnectingElementTo.vue'

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
    visible: {
      type: Boolean,
      default: false,
    }

    

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
    connectingElement() {
      
      const min = Math.min(this.width, this.height)
      
      return {
        width: min,
        height: min,
        left: this.connectingElementLeft,
        top: this.connectingElementTop,
       
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
        visibility: this.visible ? "visible" : "hidden" 
      };
      
    },
    connectingElementLeft() {
      if(this.top || this.bottom){
        return this.relativeX;
      }
      return null;
    },
    connectingElementTop() {
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
    ConnectingElementTo ,
  },
  setup() {
    
  },

}


</script>


<style>
.conn-area {
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  z-index: -1;
  
}
</style>