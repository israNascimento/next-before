import { HEIGHT, WIDTH } from "../constants/Constants";

export default class Scene {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }
  handleClick: (x: number, y: number) => void;

  drawScene(): void {
    this.#context.clearRect(0, 0, WIDTH, HEIGHT);
  }

  protected drawRect(): void {
    this.#context.fillStyle = "white";
    this.#context.strokeRect(0, 0, 800, 600);
  }

  protected drawImage(bitmap: ImageBitmap, x: number, y: number): void {
    this.#context.drawImage(bitmap, x, y);
  }

  protected drawText(
    text: string,
    x: number,
    y: number,
    align: CanvasTextAlign,
    fontSize: number = 25,
    textColor: string = "#3B3B3B"
  ) {
    this.#context.fillStyle = textColor;
    this.#context.font = `${fontSize}px Arial`;
    this.#context.textAlign = align;
    this.#context.fillText(text, x, y + fontSize);
  }
}
