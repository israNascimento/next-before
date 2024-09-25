export {}; // to make it a module

declare global {
  // to access the global type String
  interface CanvasRenderingContext2D {
    truncate(max: number, decorator: string): string;
  }
}
