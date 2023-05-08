

export function Command(id, type = "text", data = "", componentId = null, nextStepId = null) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.componentId = componentId;
    this.nextStepId = nextStepId;
}

export function ComponentData(type, content = []) {
    this.type = type;
    this.content = content
}


function Component(id, data = null, commands = [], isMain = false) {
    this.id = id;
    this.data = data;
    this.commands = commands;
    this.isMain = isMain;
}


export function EditorController() {
    this._new_id = 0;
    this.components = [];
    this.addComponent = function() {
        this.components.push(new Component(this._new_id));
        this._new_id++;

    };
    this.getComponents = function() {
        return this.components;
    };
    this.deleteComponentById = function(id) {
        this.components = this.components.filter(
            (item)=>item.id != id
        )
    }
}