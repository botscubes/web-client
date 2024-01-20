import { SetStoreFunction, Store } from "solid-js/store";
import SelectedComponents from "./SelectedComponents";
import { EditorData } from "../types";
import { ComponentStorage } from "./EditorStorage/ComponentStorage";
import EditorController from ".";
import WaitingState from "./states/WaitingState";
import { Position } from "../shared/types";
import ComponentMoveState from "./states/ComponentMoveState";
import Logger from "~/logging/Logger";

export default class ComponentController {
  private _selectedComponents = new SelectedComponents();
  private _storage: ComponentStorage;
  constructor(
    private _editor: EditorController,
    editorData: Store<EditorData>,
    setEditorData: SetStoreFunction<EditorData>,
    private _logger: Logger
  ) {
    this._storage = new ComponentStorage(editorData, setEditorData);
  }

  add() {
    this._selectedComponents.deselectAll();
    const id: number = this._storage.add();
    this._storage.select(id);
    this._selectedComponents.select(id);
    this._editor.setState(new WaitingState(this._editor));
  }
  delete(id: number) {
    this.deselectAll();
    this._storage.delete(id);
  }
  move(mousePosition: Position) {
    this._storage.move(this._selectedComponents.get(), mousePosition);
  }
  select(id: number) {
    this._selectedComponents.select(id);
    this._storage.select(id);
  }
  deselectAll() {
    for (const id of this._selectedComponents.getKeys()) {
      this._storage.deselect(id);
    }
    this._selectedComponents.deselectAll();
  }
  markAsSelected(id: number) {
    if (this._selectedComponents.isSelected(id)) {
      this._storage.deselect(id);
      this._selectedComponents.deselect(id);
    } else {
      this._storage.select(id);
      this._selectedComponents.select(id);
    }
    if (this._selectedComponents.haveSelected()) {
      this._editor.setState(new ComponentMoveState(this._editor));
    } else {
      this._editor.setState(new WaitingState(this._editor));
    }
  }
  isSelected(id: number): boolean {
    return this._selectedComponents.isSelected(id);
  }
  fixMouseShiftsRelative(mousePos: Position) {
    for (const id of this._selectedComponents.getKeys()) {
      const component = this._storage.get()[id];
      if (component) {
        const position = component.position;
        const shift: Position = {
          x: mousePos.x - position.x,
          y: mousePos.y - position.y,
        };
        this._selectedComponents.set(id, shift);
      } else {
        this._logger.error(`Editor: component ${id} not found`);
      }
    }
  }
}
