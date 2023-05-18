<template>
  <div 
    id="editor"
    :style="editorStyle"
    ref="editor"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave">
    
    <!-- <div 
      :style="styleObject" 
      @mousedown="onMouseDown($event)"
      @dragstart="onDragStart"
      ref="testt"
      id="test">

    </div> -->
    <editor-component 
      v-for="[key, component] in editorController.getComponents()"
      :key="key"
      :id="component.id"
      :buttons="component.commands"
      :pleft="editor.offsetWidth/3"
      :ptop="editor.offsetHeight/3"
      :is-main="component.isMain"
      :connecting-elements-to="component.connectingElementsTo"
      v-bind="editorComponent" 
      @delete-component="deleteComponent"
      @conn-start="startConnecting"
      @conn-end="connectComponents"
      @open="openComponentContent"
      @detach="detachComponent"
      @start-move="startMoveComponent"
      @move="moveComponent"
      />
    
    <connecting-line 
    v-for="[key, line] in lines"
    :key="key"
    :absolute-x1="line.x1"
    :absolute-x2="line.x2"
    :absolute-y1="line.y1"
    :absolute-y2="line.y2"/>

    <connecting-line 
    :absolute-x1="line.x1"
    :absolute-x2="line.x2"
    :absolute-y1="line.y1"
    :absolute-y2="line.y2"
    :style="lineStyle"/>

    
    <div class="fixed-area">
      <div class="fixed-btns">
        <button @click="addComponent" id="add-btn">Add component</button>
        <button @click="saveBot" id="save-btn">Save Bot</button>
        <!-- <input v-model="botName"/>
        <button @click="createBot" id="save-btn">Create Bot</button> -->
        <button @click="getBot" id="save-btn">Get Bot</button>
        <button @click="startBot" id="save-btn">Start Bot</button>
        <button @click="stopBot" id="save-btn">Stop Bot</button>
      </div>
      <component-content 
        v-if="componentContentIsOpen" 
        @close="closeComponentContent"
        @apply="componentContentApply"
        :is-open="componentContentIsOpen"
        :pbuttons="contentButtons"
        :ptext="contentText"
        class="component-content"/>
    </div>
    
    
  </div>
</template>

<script>

import { ref } from 'vue'
import { EditorController, NewComponentFromAPIJSON, Command, ComponentData } from './EditorController.js'
import * as api from './api.js'


import EditorComponent from './components/EditorComponent.vue'
import ConnectingLine from './components/ConnectingLine.vue'
import ComponentContent from './components/ComponentContent.vue'




export default {
  data() {
    return {
      mouseDown: false,
      editorLeft: 100,
      editorTop: 100,
      
      botId: 126,
      botName: "",

      mouseX: 0,
      mouseY: 0,
      componentId: null,
      commandId: null,
      commandIsMain: false,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
      lines: new Map(),
      editorController: new EditorController(),
      conn: false,
      componentContentIsOpen: false,
      
      linesFromComponent: [],
      linesToComponent: [],
    }
  },

  components: {
    EditorComponent,
    ConnectingLine,
    ComponentContent
  },

  computed: {
    contentButtons() {
      //console.log( this.componentId !== null ? this.editorController.getComponents().get(this.componentId).getCommandClones() : 1 );

      return this.componentId !== null ? this.editorController.getComponents().get(this.componentId).commands : new Map();
    },
    contentText() {
      return this.componentId !== null ? this.editorController.getComponents().get(this.componentId).data.content[0].text : "";
    },
    editorStyle() {
      return {
        left: this.editorLeft + "px",
        top: this.editorTop + "px",
      }
    },
    editorComponent() {
      return {
        editorMouseX: this.mouseX,
        editorMouseY: this.mouseY,
        editorMouseDown: this.mouseDown,
        connectingAreaVisible: this.conn,
        
      }
    },
    lineStyle() {
      return {
        visibility: this.conn ? "visible" : "hidden",
      }
    }
    
    

  },
  methods: {
    onMouseDown() {
      this.mouseDown = true;
      
      
    },
    onMouseUp() {
      this.conn = false;
      this.mouseDown = false;
    },
    onMouseMove(event) {
      const rect = this.editor.getBoundingClientRect();
      this.mouseX = this.editor.scrollLeft + event.clientX - rect.left;
      this.mouseY = this.editor.scrollTop + event.clientY - rect.top;
      
      if(this.conn) {
        this.line.x2 = this.mouseX;
        this.line.y2 = this.mouseY;
      }
      
    },
    onDragStart() {
      return false;
    },
    onMouseLeave() {
      this.mouseDown = false;
    },
    async addComponent() {
      //this.components.push(3)
      await this.editorController.addComponent()
    },
    async deleteComponent(id) {
      const commands = this.editorController.getComponents().get(id).commands;
      
      for(let command of commands.values()) {
        if(command.nextStepId !== null && command.nextStepId !== undefined) {

          if(this.editorController.getComponents().has(command.nextStepId)) {
            this.editorController.getComponents().get(command.nextStepId).connectingElementsTo.delete(command.id);
          }
          
          this.lines.delete(command.id);
        }
        

      }
      const connectingElementsTo = this.editorController.getComponents().get(id).connectingElementsTo;
      for(let key of connectingElementsTo.keys()) {
        this.lines.delete(key);
      }
      await this.editorController.deleteComponentById(id);
      
    },
    async startConnecting(event) {
      
      this.conn = true;
      this.line.x1 = event.x;
      this.line.y1 = event.y;
      this.line.x2 = event.x;
      this.line.y2 = event.y;
      this.commandId = event.commandId;
      this.commandIsMain = event.isMain;
      this.componentId = event.componentId;

      
      if(event.nextComponentId) {
        this.editorController.getComponents().get(event.nextComponentId).connectingElementsTo.delete(event.commandId);
        this.editorController.getComponents().get(this.componentId).commands.get(this.commandId).nextStepId = null;
      }

      if(this.lines.has(this.commandId)) {
        this.lines.delete(this.commandId);
        if(event.isMain) {
          await api.deleteNextStepForComponent(this.botId, 1);
        } else {
          await api.deleteNextStepForCommand(this.botId, event.componentId, event.commandId);
        }
        
      }
    },
    async connectComponents(event) {
      let line = {
        x1: this.line.x1,
        y1: this.line.y1,
        x2: event.x,
        y2: event.y,
      }
      
      if(this.commandId !== null) {
        this.lines.set(this.commandId, line);
        this.editorController.getComponents().get(event.componentId).connectingElementsTo.set(this.commandId, {
          x: event.relativeComponentX, 
          y: event.relativeComponentY,
          commandComponentId: this.componentId,
        });
        

        if(this.commandIsMain) {
          this.editorController.getComponents().get(this.componentId).nextStepId = event.componentId;
          this.editorController.getComponents().get(this.componentId).commands.get(this.commandId).nextStepId = event.componentId;
          api.setNextStepForComponent(this.botId, 1, event.componentId);
        } else {
          this.editorController.getComponents().get(this.componentId).commands.get(this.commandId).nextStepId = event.componentId;
          api.setNextStepForCommand(this.botId, this.componentId, this.commandId, event.componentId);
        }
      } else {
        console.error("CommandId is null")
      }

      this.commandId = null;
      this.componentId = null;
      this.commandIsMain = false;

      
    },
    saveBot() {

    },
    openComponentContent(id) {
      this.componentContentIsOpen = true;
      this.componentId = id;
    },
    closeComponentContent() {
      this.componentContentIsOpen = false;
      this.componentId = null;
    },
    async createBot() {
      const bot = await api.createBot(this.botName);
      this.botId = bot.botId;
      

      let component = NewComponentFromAPIJSON(bot.component);
      component.commands.set(0, new Command(0, "text", "Start"));
      this.editorController.getComponents().set(bot.component.id, component);

    },
    async getBot() {
      this.editorController.clearComponents();
      await api.resetBot(this.botId);
      const startComponent = await api.getStartComponent(this.botId);
      let component = NewComponentFromAPIJSON(startComponent);
      component.commands.set(0, new Command(0, "text", "Start"));
      this.editorController.getComponents().set(component.id, component);
      this.lines.clear();
    },
    async startBot() {
      await api.setBotToken(this.botId);
      await api.startBot(this.botId);
    },
    async stopBot() {
      await api.stopBot(this.botId);
      await api.deleteBotToken(this.botId);
    },
    async componentContentApply(changes) {
      for(let [key, info] of changes) {
        if(info.type == "add") {
          const id = await api.addCommand(this.botId, this.componentId, "text", info.text);
          this.editorController.getComponents().get(this.componentId).commands.set(id, new Command(id, "text", info.text, this.componentId));
        } else {
          await api.deleteCommand(this.botId, this.componentId ,key);
          this.editorController.getComponents().get(this.componentId).commands.delete(key);
        }
      }

      await api.updateComponent(this.botId, this.componentId, new ComponentData("text", [
        {
          text: changes.text
        }
      ]))

      this.componentContentIsOpen = false;
      this.componentId = null;
    },
    async detachComponent(event) {
      this.conn = true;
      this.line = this.lines.get(event.commandId);
      this.commandId = event.commandId;
      this.componentId = event.commandComponentId;

      this.editorController.getComponents().get(event.componentId).connectingElementsTo.delete(event.commandId);
      
      this.lines.delete(event.commandId);
      if(event.commandId === 0) {
        this.commandIsMain = true;
        await api.deleteNextStepForComponent(this.botId, 1);
        this.editorController.getComponents().get(this.componentId).nextStepId = null;
      } else {
        this.editorController.getComponents().get(this.componentId).commands.get(this.commandId).nextStepId = null;
        await api.deleteNextStepForCommand(this.botId, event.commandComponentId, event.commandId);
      }
     
      
      
    
    },
    startMoveComponent(event) {
      this.linesFromComponent = [];
      this.linesToComponent = [];

      this.componentId = event.componentId;

      const component = this.editorController.components.get(this.componentId);
      const commands = component.commands;
      const conns = component.connectingElementsTo;

      for(let id of commands.keys()) {
        if(this.lines.has(id)) {
          const x = this.lines.get(id).x1;
          const y = this.lines.get(id).y1;
          this.linesFromComponent.push({
            commandId: id,
            offsetX: this.mouseX - x, 
            offsetY: this.mouseY - y,
          });
        }
      }
      for(let id of conns.keys()) {
        if(this.lines.has(id)) {
          const x = this.lines.get(id).x1;
          const y = this.lines.get(id).y1;
          this.linesToComponent.push({
            commandId: id,
            offsetX: this.mouseX - x, 
            offsetY: this.mouseY - y,
          });
        }
      }
      // console.log(this.linesFromComponent);
      // console.log(this.linesToComponent);

    },
    moveComponent() {
      for(let item of this.linesToComponent) {
        if(this.lines.has(item.commandId)) {
          const line = this.lines.get(item.commandId);
          line.x2 = this.mouseX + item.offsetX; 
          line.y2 = this.mouseY + item.offsetY;
        }
      }
      for(let item of this.linesFromComponent) {
        if(this.lines.has(item.commandId)) {
          const line = this.lines.get(item.commandId);
          line.x1 = this.mouseX - item.offsetX; 
          line.y1 = this.mouseY - item.offsetY;
        }
      }
    }
  },
  setup() {
    const editor = ref(null)
    return {
      editor
    }
  }
  
  
}
</script>

<style>
  #editor {
    position: relative;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    overflow-block: scroll;
    background-color: gray;
    width: 70%;
    height: 600px;
  }



  #add-btn {
    padding: 0;
    
  }
  #save-btn {
    padding: 0;
    
  }
  .fixed-btns {
    padding: 10px;
    
  }

  .fixed-area {
    padding: 0;
    margin: 0;
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    
  }
  .component-content {
    position: absolute;
    right: 0;
    height: 500px;
    background-color: rgb(218, 217, 217);
    width: 30%;
    
  }
  
</style>
