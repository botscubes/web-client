<template>
    <div 
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      :style="styleObject"
      class="conn-el"
      
      
      ></div>
      
</template>


<script>

export default {
  data() {
    return {
      focus: false,
    }
  },
  computed: {
    styleObject() {
      return { 
        opacity: this.focus ? 1 : 0,
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
  .conn-el {
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: green;
    width: 20px;
    height: 20px;
  }
</style>




