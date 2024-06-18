import { JSX } from "solid-js";
import EditorController from "../..";
import {
  SpecificComponentCreator,
  SpecificComponent,
} from "../../SpecificComponent";
import { PhotoContent } from "~/containers/Editor/components/ComponentContent/contents/PhotoContent";
import { PhotoComponentController } from "./PhotoComponentController";
import { APIComponentType } from "../../api/types";

export class PhotoComponentCreator implements SpecificComponentCreator {
  constructor(private editor: EditorController) {}
  get type(): APIComponentType {
    return APIComponentType.Photo;
  }
  get content(): () => JSX.Element {
    return () => <PhotoContent />;
  }
  create(id: number): SpecificComponent {
    const controller = new PhotoComponentController(this.editor, id);
    return [
      controller,
      () => <PhotoContent handlers={controller.getHandlers()} />,
    ];
  }
}
