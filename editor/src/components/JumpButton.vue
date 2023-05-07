<template>
    <div 
      class="jump-btn-area"
      :style="buttonStyle"

      
      >
      <connecting-element-from 
        :top="this.height/2"
        :left="0"
        :height="20"
        :width="20"
        />
      <connecting-element-from 
        :top="this.height/2"
        :left="this.width"
        :height="20"
        :width="20"
        />
    
    <button class="jump-btn">{{ text }}</button>
    
    </div>
</template>


<script>
import ConnectingElementFrom from './ConnectingElementFrom.vue'

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
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      defautl: ""
    }
    


  },
  components: {
    ConnectingElementFrom
  },
  computed: {
    buttonStyle() {
      return {
        width:this.width + "px",
        height:this.height + "px",
        left: this.left + "px",
        top: this.top + "px",
      }
    },
  },
  




}
</script>


<style>
.jump-btn-area {
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
  
}
.jump-btn {
  width: 80%;
  
}
</style>
