<template>
    <div
        @dragstart.prevent="onDragStart($event)"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @dblclick="open"

        
        :style="componentStyle" 
        ref="component"
        class="component"
    >
      <button v-if="!isMain" @click="deleteComponent" class="btn-delete">&#10006;</button>

      <connecting-area v-bind="connectingAreaLeft" @conn-end="connectComponents"/>
      <connecting-area v-bind="connectingAreaRight" @conn-end="connectComponents" />
      <connecting-area v-bind="connectingAreaTop" @conn-end="connectComponents"/>
      <connecting-area v-bind="connectingAreaBottom" @conn-end="connectComponents" />

      <jump-button 
        v-for="([key, btn], index) in buttons"
        :key="key" 
        :id="btn.id"
        :text="btn.data"
        :width="this.width"
        :height="this.buttonHeight"
        :top="(this.buttonIndent+this.buttonHeight)*index + this.buttonIndent"
        :nextComponentId="btn.nextStepId"
        @conn-start="startConnecting"
        @click="open"
      />
      <connecting-element-to 
        v-for="[key, item] in connectingElementsTo"
        :key="key"
        :command-id="key"
        :width="connectingElementSize"
        :height="connectingElementSize"
        :top="item.y"
        :left="item.x"
        :command-component-id="item.commandComponentId"
        @detach="detach"
      />

    </div>

</template>


<script>


import { ref } from 'vue'
import JumpButton from './JumpButton.vue'
import ConnectingArea from './ConnectingArea.vue'
import ConnectingElementTo from './ConnectingElementTo.vue';


const MOVE_STATE = 0;
const CONN_STATE = 1;
const DETACH_STATE = 2;


export default {
  props: {
    editorMouseX: {
      type: Number,
      default: 0,
    },
    editorMouseY: {
      type: Number,
      default: 0,
    },

    id: {
      type: Number,
      default: null,
    },
    
    connectingAreaVisible: {
      type: Boolean,
      default: false,
    },
    editorMouseDown: {
      type: Boolean,
      default: false,
    },
    connectingElementsTo: {
      type: Map,
      default: () => new Map(),
    },
    buttons: {
      type: Map,
      default: () => new Map(),
    },
    ptop: {
      type: Number,
      default: 0,
    }, 
    pleft: {
      type: Number,
      default: 0,
    },
    isMain: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    JumpButton,
    ConnectingArea,
    ConnectingElementTo,
  },
  data() {
    return {
      mouseDown: false,
      left: 0,
      top: 0,
      editorLeft: 0,
      editorTop: 0,
      shiftX: 0,
      shiftY: 0,
      width: 100,
    
      
      buttonIndent: 20,
      buttonHeight: 40,
      state: MOVE_STATE,
      
      //focus: false,
    }
  },
  created() {
    
    this.left = this.pleft;
    this.top = this.ptop;
  },
  computed: {
    height() {
      return this.buttons.size > 0 ? this.buttons.size * (this.buttonHeight+this.buttonIndent) + this.buttonIndent : 80;
    },
    connectingElementSize() {
      return this.width/5;
    },
    componentStyle() {
      


      return {
        left: this.left + "px",
        top: this.top + "px",
        width: this.width + "px",
        height: this.height + "px"
      }
    },
    connectingAreaLeft() {
      const w = this.connectingElementSize;

      return {
        width: w,
        height: this.height,
        top: 0,
        left: -w/2,
        mouseX: this.editorMouseX - this.left,
        mouseY: this.editorMouseY - this.top,
        visible: this.connectingAreaVisible && this.state !== CONN_STATE && !this.isMain,
      };
    },
    connectingAreaRight() {
      const w = this.connectingElementSize;

      return {
        width: w,
        height: this.height,
        //right: -w/2,
        top: 0,
        left: this.width - w/2,
        mouseX: this.editorMouseX - this.left,
        mouseY: this.editorMouseY - this.top,
        visible: this.connectingAreaVisible && this.state !== CONN_STATE && !this.isMain,
      };
    },
    connectingAreaTop() {
      const h = this.connectingElementSize;

      return {
        width: this.width,
        height: h,
        top: -h/2,
        left: 0,
        mouseX: this.editorMouseX - this.left,
        mouseY: this.editorMouseY - this.top,
        visible: this.connectingAreaVisible && this.state !== CONN_STATE  && !this.isMain,
      };
    },
    connectingAreaBottom() {
      const h = this.connectingElementSize;

      return {
        width: this.width,
        height: h,
        top: this.height - h/2,
        left: 0,
        //bottom: -h/2,
        mouseX: this.editorMouseX - this.left,
        mouseY: this.editorMouseY - this.top,
        visible: this.connectingAreaVisible && this.state !== CONN_STATE  && !this.isMain,
      };
    },

  },
  
  methods: {
    onDragStart() {
        return false;
    },
    onMouseUp() {
      this.state = MOVE_STATE;
      this.mouseDown = false;
      
    },
    onMouseDown() {
      if(this.state == MOVE_STATE) {
        this.$emit("startMove", { 
          componentId: this.id, 
        
        }); 
        this.shiftX = this.editorMouseX - this.left;
        this.shiftY = this.editorMouseY - this.top;


      }
      
      this.mouseDown = true;
      
      
      
      
    },
    onMouseMove() {
      
    },
    onMouseLeave() {
      
      
    },
    deleteComponent() {
      
      this.$emit('deleteComponent', this.id)
    },
    startConnecting(event) {
      
      this.state = CONN_STATE;
      event.x = event.x + this.left;
      event.y = event.y + this.top;
      event.isMain = this.isMain;
      event.componentId = this.id;
      this.$emit("connStart", event);
    },
    connectComponents(event) {
      event.connectingElement = {
        x: event.x,
        y: event.y,
      }
      event.relativeComponentX = event.x;
      event.relativeComponentY = event.y;
      event.x = event.x + this.left;
      event.y = event.y + this.top;
      event.componentId = this.id;
      this.$emit("connEnd", event);

    },
    open() {
      if(!this.isMain) {
        this.$emit("open", this.id);
      }
      
    }, 
    detach(event) {
      this.state = DETACH_STATE;
      event.componentId = this.id;
      this.$emit("detach", event);
    }
  },
  watch: {
    
    editorMouseX(val) {
      if(this.state == MOVE_STATE && this.mouseDown) {
          this.left = val - this.shiftX;
          this.$emit("move", { 
            componentId: this.id, 
        
          }); 
        }
    },
    editorMouseY(val) {
      if(this.state == MOVE_STATE && this.mouseDown) {
        this.top = val - this.shiftY;
        this.$emit("move", { 
          componentId: this.id, 
        
        }); 
      }
    },
    editorMouseDown(val) {
      if(!val) {
        this.state = MOVE_STATE;
        this.mouseDown = false;
      }
    }
     
    
  },
  emits: {
    
    deleteComponent: (id) => {
      if(id === null) {
        return false;
      }
      return true;
    },
    connStart: null,
    connEnd: null,
    open: (id) => {
      if(id === null) {
        return false;
      }
      return true;
    },
    detach: null,
    move: null,
    startMove: null,
  },
  setup() {
    const component = ref(null)
    return {
      component
    }
  },
}
</script>

<style>

.component {
  background-color: aqua;
  position: absolute;
  z-index: 1;
  min-height: 50px;
}

.conn-el {
  position: absolute;
  left: -10px;
  top: 40px;
}

.btn-delete {
  position: absolute;
  margin: 0px;
  top: 0;
  right: 0;
}



</style>
