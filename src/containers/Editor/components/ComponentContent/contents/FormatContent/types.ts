export interface FormatContentHandlers {
  formatString: {
    onMount(setter: (str: string) => void): void;
    onChange(str: string): void;
    onInput(str: string): void;
  };
}

export interface FormatContentProps {
  handlers?: FormatContentHandlers;
}
