<template>
    <div 
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      :style="styleObject"
      class="bind-el"
      
      
      ></div>
      
</template>


<script>



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
        opacity: this.focus ? 1 : 0,
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
    
  },
  setup() {
    
  },
}
</script>


<style>
  .bind-el {
    position: absolute;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: green;
    
  }
</style>




