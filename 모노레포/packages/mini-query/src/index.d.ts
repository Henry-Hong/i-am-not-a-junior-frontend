// main.d.ts

declare module "mini-query" {
  export function $(selector: string): {
    length(): number;
    click(callback: () => void): void;
    mouseover(callback: () => void): void;
  };
}
