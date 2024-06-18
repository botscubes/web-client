import { ContentPointHandlers } from "../..";

export interface HTTPContentHandlers {
  outputPoint: ContentPointHandlers;
  onEditClick: () => void;
}

export interface HTTPContentData {
  url?: string;
  body?: string;
  method?: string;
  header?: string;
}

export interface HTTPContentOutputs {
  idIfError?: number;
  nextComponentId?: number;
}

export interface HTTPContentProps {
  outputs?: HTTPContentOutputs;
  data?: HTTPContentData;
  handlers?: HTTPContentHandlers;
}

export interface HTTPEditingContentHandlers {
  onSave: (data: HTTPContentData) => void;
  onCancel?(): void;
}

export interface HTTPEditingContentProps {
  data?: HTTPContentData;
  handlers?: HTTPEditingContentHandlers;
}
