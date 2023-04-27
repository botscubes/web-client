<template>
    <div class="binding-area"
    ref="bindingArea"
    :style="styleObject"
    @mousedown.stop="onmousedown">
      
      <binding-element  
        v-for="(el, index) in elements"
        :key="index"
        v-bind="bindingElement"
        />

    </div>
</template>



<script>


import BindingElement from './BindingElement.vue'

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

    

  },
  data() {
    return {
      elements: [
        1
      ]
    }
  },
  methods: {
    mousedown() {
      
    }
  },
  computed: {
    bindingElement() {
      
      const min = Math.min(this.width, this.height)
      
      return {
        width: min,
        height: min,
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
      };
      
    }
    
  },

  components: {
    BindingElement,
  },
  setup() {
    
  },

}


</script>


<style>
.binding-area {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>