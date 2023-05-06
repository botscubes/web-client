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


    <line 
    :x1="this.relativeX2" 
    :y1="this.relativeY2" 
    :x2="this.arrowLine1X2" 
    :y2="this.arrowLine1Y2" stroke="black" />

    <line 
    :x1="this.relativeX2" 
    :y1="this.relativeY2" 
    :x2="this.arrowLine2X2" 
    :y2="this.arrowLine2Y2" stroke="black" />

    <!-- <circle 
    :cx="cx"
    :cy="cy"
    r="5" stroke="red"/> -->
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
      arrowLength: 10,
      arrowAngle: Math.PI/4,
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
    arrowPointX() {
      let px = 0;
      let h = Math.abs(this.absoluteY2 - this.absoluteY1);
      let w = this.absoluteX2 - this.absoluteX1;
      if(w >= 0) {
        px = this.padding + w - Math.cos(Math.atan(h/w)) * this.arrowLength;
      } else {
        w = Math.abs(w);
        px = this.padding + Math.cos(Math.atan(h/w)) * this.arrowLength;
      }
      

      return px
    },
    arrowPointY() {
      let py = 0;
      let h = this.absoluteY2 - this.absoluteY1;
      const w = Math.abs(this.absoluteX2 - this.absoluteX1);
      if(h >= 0) {
        py = this.padding + h - Math.sin(Math.atan(h/w)) * this.arrowLength;
      } else {
        h = Math.abs(h);
        py = this.padding + Math.sin(Math.atan(h/w)) * this.arrowLength;
      }
      return py;
    },

    arrowLine1X2() {
      let h = this.absoluteY2 - this.absoluteY1;
      let w = Math.abs(this.absoluteX2 - this.absoluteX1);
      let m = this.arrowLength * Math.tan(this.arrowAngle/2);
      if(h >= 0) {
        return Math.round(this.arrowPointX + Math.sin(Math.atan(h/w)) * m);
      }
      h = Math.abs(h);
      return Math.round(this.arrowPointX - Math.sin(Math.atan(h/w)) * m);
    },
    arrowLine1Y2() {
      let h = Math.abs(this.absoluteY2 - this.absoluteY1);
      let w = this.absoluteX2 - this.absoluteX1;
      let m = this.arrowLength * Math.tan(this.arrowAngle/2);
      if(w >= 0) {
        return Math.round(this.arrowPointY - Math.cos(Math.atan(h/w)) * m);
      }
      w = Math.abs(w);
      return Math.round(this.arrowPointY + Math.cos(Math.atan(h/w)) * m);
    },
    arrowLine2X2() {
      let h = this.absoluteY2 - this.absoluteY1;
      let w = Math.abs(this.absoluteX2 - this.absoluteX1);
      let m = this.arrowLength * Math.tan(this.arrowAngle/2);
      if(h >= 0) {
        return Math.round(this.arrowPointX - Math.sin(Math.atan(h/w)) * m);
      }
      h = Math.abs(h);
      return Math.round(this.arrowPointX + Math.sin(Math.atan(h/w)) * m);
    },
    arrowLine2Y2() {
      let h = Math.abs(this.absoluteY2 - this.absoluteY1);
      let w = this.absoluteX2 - this.absoluteX1;
      let m = this.arrowLength * Math.tan(this.arrowAngle/2);
      if(w >= 0) {
        return Math.round(this.arrowPointY + Math.cos(Math.atan(h/w)) * m);
      }
      w = Math.abs(w);
      return Math.round(this.arrowPointY - Math.cos(Math.atan(h/w)) * m);
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