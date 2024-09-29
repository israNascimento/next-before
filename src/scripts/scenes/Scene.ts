import { HEIGHT, WIDTH } from "../constants/Constants";

export default class Scene {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }
  handleClick: (x: number, y: number) => void;

  update(): void {
    this.#context.clearRect(0, 0, WIDTH, HEIGHT);
  }

  protected drawRect(color: string = "green"): void {
    this.#context.fillStyle = color;
    this.#context.fillRect(0, 0, 800, 600);
  }

  protected drawImage(bitmap: ImageBitmap, x: number, y: number): void {
    if (bitmap) {
      this.#context.drawImage(bitmap, x, y);
    }
  }

  protected drawText(
    text: string,
    x: number,
    y: number,
    align: CanvasTextAlign,
    fontSize: number = 25,
    textColor: string = "#0A0A0A"
  ) {
    this.#context.fillStyle = textColor;
    this.#context.font = `${fontSize}px Arial`;
    this.#context.textAlign = align;
    this.#context.fillText(text, x, y + fontSize);
  }

  protected navigate() {}
}
