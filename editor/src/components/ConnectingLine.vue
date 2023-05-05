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

    }
  },
  computed: {
    lineStyleObject() {
      
      let top = 0;
      let left = 0;

      const h = this.absoluteY2 - this.absoluteY1;
      const w = this.absoluteX2 - this.absoluteX1;
      if(h >= 0) {
        top = this.absoluteY1;
      } else {
        top = this.absoluteY2;
      }
      if(w >= 0) {
        left = this.absoluteX1;
      } else {
        left = this.absoluteX2;
      }
      
      return {
        left: left+"px",
        top: top+"px",
        width: Math.abs(w)+"px",
        height: Math.abs(h)+"px",
        
      }
    },
    relativeX1() {
      const w = this.absoluteX2 - this.absoluteX1;
      if(w >= 0) {
        return 0;
      }
      return Math.abs(w);
    },
    relativeX2() {
      const w = this.absoluteX2 - this.absoluteX1;
      if(w >= 0) {
        return w;
      }
      return 0;
    },
    relativeY1() {
      const h = this.absoluteY2 - this.absoluteY1;
      if(h >= 0) {
        return 0;
      }
      return Math.abs(h);
    },
    relativeY2() {
      const h = this.absoluteY2 - this.absoluteY1;
      if(h >= 0) {
        return h;
      }
      return 0;
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