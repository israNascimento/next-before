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

  handleMouseMove = (x: number, y: number) => {
    // empty
  };

  protected drawRect(
    color: string = "green",
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.#context.globalAlpha = 0.4;
    this.#context.fillStyle = color;
    this.#context.fillRect(x, y, width, height);
    this.#context.globalAlpha = 1;
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
    textColor: string = "white",
    useStroke: boolean = true
  ): TextMetrics {
    this.#context.fillStyle = textColor;
    this.#context.font = `${fontSize}px GameFont`;
    this.#context.textAlign = align;
    if (useStroke) {
      this.#context.strokeStyle = "black";
      this.#context.lineWidth = 3;
      this.#context.strokeText(text, x, y + fontSize);
    }
    this.#context.fillText(text, x, y + fontSize);
    return this.#context.measureText(text);
  }

  protected navigate() {}
}
