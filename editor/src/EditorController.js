import * as api from "./api.js"

export function Command(id, type = "text", data = "", componentId = null, nextStepId = null) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.componentId = componentId;
    this.nextStepId = nextStepId;
    
}



export function ComponentData(type, content = []) {
    this.type = type;
    this.content = content;
    
}


export function Component(id, data = null, commands = new Map(), nextStepId = null, isMain = false) {
    this.id = id;
    this.data = data;
    this.commands = commands;
    this.nextStepId = nextStepId;
    this.isMain = isMain;
    this.intoComponentAPIJSON = function() {
        const commands = [];
        for(let command of this.commands) {
            commands.push(command);
        }

        return ComponentAPIJSON(this.id, this.data, commands, nextStepId, isMain);
    }
    
}

export function ComponentAPIJSON(id, data = null, commands = [], nextStepId = null, isMain = false) {
    this.id = id;
    this.data = data;
    this.commands = commands;
    this.nextStepId = nextStepId;
    this.isMain = isMain;
    
}

export function NewComponentFromAPIJSON(APIComponent) {
    const commands = new Map();
    if(APIComponent.commands) {
        for(let item of APIComponent.commands) {
            commands.set(item.id, item);
        }
    }
    

    return new Component(APIComponent.id, APIComponent.data, commands, APIComponent.nextStepId ,APIComponent.isMain);
}


export function EditorController() {
    this._new_id = 0;
    this._new_command = 0;
    this.components = new Map();
    this.botId = 126;
    this.addComponent = async function() {
        const data = new ComponentData("text", [
            {
                text: "Text",
            }
        ]);
        const id = await api.addComponent(this.botId, {
            data: data,
            commands: [],
            position: {},
        });
        const component = new Component(id, data);
        this.components.set(id, component);
    };
    this.getComponents = function() {
        return this.components;
    };
    this.deleteComponentById = async function(id) {
        
        this.components.delete(id);
        await api.deleteComponent(this.botId, id);

    }
    
}