
function Component(id) {
    this.id = id;
    this.next_id = null;
    this.position = {
    };
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