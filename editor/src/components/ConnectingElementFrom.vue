<template>
    <div 
      @mouseenter="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      :style="styleObject"
      class="conn-el"
      
      
      ></div>
      
</template>


<script>



export default {
  props: {
    nextComponentId: {
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
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
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
    onMouseMove() {

    },
    onMouseDown() {
      const top = this.top;
      const left = this.left;
      this.$emit("connStart", {
        x: left,
        y: top,
      })
    }
    
  },
  emits: [
    "connStart"
  ],
  setup() {
    
  },
}
</script>


<style>
  .conn-el {
    position: absolute;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: blue;
    
  }
</style>




