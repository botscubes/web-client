

export function Command(id, type = "text", data = "", componentId = null, nextStepId = null) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.componentId = componentId;
    this.nextStepId = nextStepId;
    this.clone = function() {
        return new Command(this.id, this.type, this.data, this.componentId, this.nextStepId);
    }
}

export function ComponentData(type, content = []) {
    this.type = type;
    this.content = content;
    this.clone = function() {

        return new ComponentData(this.type, this.content.slice(0))
    }
}


function Component(id, data = null, commands = new Map(), isMain = false) {
    this.id = id;
    this.data = data;
    this.commands = commands;
    this.isMain = isMain;
    this.clone = function() {
        let commands = this.getCommandClones();
        let data = null;
        
        if(this.data) {
            data = this.data.clone();
        }

        return new Component(this.id, data, commands, isMain);
    };
    this.getCommandClones = function() {
        let commands = new Map();
        for(let [key, value] of this.commands) {
            commands.set(key, value.clone());
        }
        return commands;
    };
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