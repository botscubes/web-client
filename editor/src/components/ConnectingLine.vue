<template>
  <svg 
    class="conn-line"
    :style="lineStyleObject" 
     xmlns="http://www.w3.org/2000/svg">
    <line 
    :x1="this.relativeX1" 
    :y1="this.relativeY1" 
    :x2="this.relativeX2" 
    :y2="this.relativeY2" stroke="black" />
  </svg>  
</template>


<script>


export default {
  props: {
    absoluteX1: {
      type: Number,
      default: 0,
    },
    absoluteY1: {
      type: Number,
      default: 0,
    },
    absoluteX2: {
      type: Number,
      default: 0,
    },
    absoluteY2: {
      type: Number,
      default: 0,
    },
  },
  
  data() {
    return {
      padding: 10,
    }
  },
  computed: {
    lineStyleObject() {
      
      let top = 0;
      let left = 0;

      let h = this.absoluteY2 - this.absoluteY1;
      let w = this.absoluteX2 - this.absoluteX1;
      if(h >= 0) {
        top = this.absoluteY1 - this.padding;
      } else {
        top = this.absoluteY2 - this.padding;
      }
      if(w >= 0) {
        left = this.absoluteX1 - this.padding;
      } else {
        left = this.absoluteX2 - this.padding;
      }
      h = Math.abs(h) + this.padding*2;
      w = Math.abs(w) + this.padding*2;
      
      return {
        left: left+"px",
        top: top+"px",
        width: w+"px",
        height: h+"px",
        
      }
    },
    relativeX1() {
      const w = this.absoluteX2 - this.absoluteX1;
      if(w >= 0) {
        return this.padding;
      }
      return Math.abs(w)+this.padding;
    },
    relativeX2() {
      const w = this.absoluteX2 - this.absoluteX1;
      if(w >= 0) {
        return w+this.padding;
      }
      return this.padding;
    },
    relativeY1() {
      const h = this.absoluteY2 - this.absoluteY1;
      if(h >= 0) {
        return this.padding;
      }
      return Math.abs(h)+this.padding;
    },
    relativeY2() {
      const h = this.absoluteY2 - this.absoluteY1;
      if(h >= 0) {
        return h+this.padding;
      }
      return this.padding;
    },

  },
  
  setup() {
    
  },
}
</script>



<style>
.conn-line {
  position: absolute;
}
</style>