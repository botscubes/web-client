<template>
    <div 
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown"
      
      :style="styleObject"
      class="conn-el-to"
      
      
      ></div>
      
</template>


<script>



export default {
  props: {
    commandId: {
      type: Number,
      default: null,
    },
    commandComponentId: {
      type: Number,
      default: null,
    },
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
    left: {
      type: Number,
      default: null,
    },
    
    
  },
  
  data() {
    return {
      focus: false,
      
    }
  },
  computed: {
    styleObject() {
      
      
     
      
      return { 
        opacity: this.focus ? 0.5 : 0,
        width: this.width + "px" ,
        height: this.height + "px",
        top: this.top - this.height/2 + "px",
        left: this.left - this.width/2 + "px",
      }
    }
  },

  methods: {
    onMouseEnter() {
      this.focus = true;
    },
    onMouseLeave() {
      this.focus = false;
    },
    onMouseUp() {
      this.$emit("connEnd", {
        x: this.left,
        y: this.top,
      })
    },
    onMouseDown() {
      this.$emit("detach", {commandId: this.commandId});
    }
    
  },
  emits: [
    "connEnd",
    "detach",
  ],
  setup() {
    
  },
}
</script>


<style>
  .conn-el-to {
    position: absolute;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: green;
    
  }
</style>




