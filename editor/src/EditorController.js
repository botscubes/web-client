

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
    this.addComponent = function() {
        const commands = new Map([
            [ this._new_command, new Command(this._new_command++, "text", "test1") ], 
            [ this._new_command, new Command(this._new_command++, "text", "test2") ], 
        ]);
        this.components.set(this._new_id, new Component(this._new_id++, null, commands));
    };
    this.getComponents = function() {
        return this.components;
    };
    this.deleteComponentById = function(id) {
        
        this.components.delete(id)
    }
    
}