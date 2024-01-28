import { Position } from "../shared/types";

export default class SelectedComponents {
  private selectedComponents = new Map<number, Position>();

  constructor() {}

  isSelected(id: number): boolean {
    return this.selectedComponents.has(id);
  }
  haveSelected(): boolean {
    return this.selectedComponents.size != 0;
  }
  select(id: number) {
    this.selectedComponents.set(id, { x: 0, y: 0 });
  }
  deselect(id: number) {
    this.selectedComponents.delete(id);
  }

  deselectAll() {
    for (const id of this.selectedComponents.keys()) {
      this.deselect(id);
    }
  }

  get(): Array<[number, Position]> {
    return Array.from(this.selectedComponents);
  }
  getKeys(): IterableIterator<number> {
    return this.selectedComponents.keys();
  }
  set(id: number, position: Position) {
    this.selectedComponents.set(id, position);
  }

}
