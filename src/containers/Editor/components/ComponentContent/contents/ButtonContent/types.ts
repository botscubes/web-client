import { ContentPointHandlers } from "../..";
import { InputHandlers } from "../../../Input";

export interface ButtonContentHandlers {
  text?: InputHandlers;
  outputPoint: ContentPointHandlers;
  buttons?: {
    onDelete?(id: string): void;
    onAdd?(): void;
    onChangeText?(id: string, name: string): void;
  };
}

export interface ButtonData {
  id: string;
  text: string;
  target?: number;
}

export interface ButtonContentData {
  text?: string;
  buttons?: Array<ButtonData>;
}

export interface ButtonContentOutputs {
  idIfFalse?: number;
  idIfError?: number;
  nextComponentId?: number;
}

export interface ButtonContentProps {
  //outputs?: ButtonContentOutputs;
  data?: ButtonContentData;
  handlers?: ButtonContentHandlers;
  abilityToAdd?: boolean;
}
