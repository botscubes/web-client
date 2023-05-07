<template>
    <div 
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      :style="styleObject"
      class="conn-el-to"
      
      
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
      let top = 0;
      let left = 0;
      if(this.top) {
        top = this.top-this.height/2;
      }
      if(this.left) {
        left = this.left-this.width/2;
      }
      return { 
        opacity: this.focus ? 0.5 : 0,
        width: this.width + "px" ,
        height: this.height + "px",
        top: top + "px",
        left: left + "px",
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
  .conn-el-to {
    position: absolute;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: green;
    
  }
</style>




