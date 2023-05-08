<template>
    <div class="conn-area"
    ref="bindingArea"
    :style="styleObject"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove">
      
      <connecting-element-to
        v-bind="connectingElement"
        @conn-end="connectComponents"
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
    // right: {
    //   type: Number,
    //   default: null,
    // },
    // bottom: {
    //   type: Number,
    //   default: null,
    // },
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
      relativeX: 0,
      relativeY: 0,
    }
  },
  methods: {
    onMouseDown() {
      
    },
    onMouseMove() {

    },
    connectComponents(event) {
      event.x = event.x + this.left;
      event.y = event.y + this.top;
      this.$emit("connEnd", event);
    }
  },
  computed: {
    connectingElement() {
      
      const min = Math.min(this.width, this.height)
      
      return {
        width: min,
        height: min,
        left: this.relativeX,
        top: this.relativeY,
       
      }
    },
    styleObject() {
      return {
        width:this.width + "px",
        height:this.height + "px",
        left: this.left + "px",
        top: this.top + "px",
        visibility: this.visible ? "visible" : "hidden" 
      };
      
    },
    connectingElementLeft() {
      
      return this.relativeX;
      
      
    },
    connectingElementTop() {
      
      return this.relativeY;
      
      
    },

    
    
  },
  watch: {
    mouseX() {
      const allow = this.width > this.height;
      if(!allow) {
        this.relativeX = this.width / 2;
      } else if (this.mouseX > 0 && this.mouseX < this.width) {
        this.relativeX = this.mouseX;
      } 
      
    },
    mouseY() {
      const allow = this.width < this.height;
      if(!allow) {
        this.relativeY = this.height / 2;
      } else if(this.mouseY > 0 && this.mouseY < this.height) {
        this.relativeY = this.mouseY;
      }
    },
  },

  components: {
    ConnectingElementTo ,
  },
  emits: [
    "connEnd",

  ],
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