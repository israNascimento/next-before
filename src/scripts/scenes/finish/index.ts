import { WIDTH } from "../../constants/Constants";
import ImageLoader from "../../utils/ImageLoader";
import MenuItem from "../components/MenuItem";
import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class FinishScene extends Scene {
  #items: Array<MenuItem>;
  #points: number;
  constructor(context: CanvasRenderingContext2D, points: number) {
    super(context);
    this.#points = points;
    this.#items = [
      new MenuItem("Jogar novamente", { x: WIDTH / 2, y: 175 }, () => {
        SceneManager.getInstace().navigateToTimeSelect();
      }),

      new MenuItem("Voltar para o menu", { x: WIDTH / 2, y: 230 }, () => {
        SceneManager.getInstace().navigateToMenu();
      }),
    ];
  }
  handleClick = (x: number, y: number) => {
    this.#items.forEach((item) => {
      item.onMouseClick(x, y);
    });
  };

  override handleMouseMove = (x: number, y: number) => {
    this.#items.forEach((item) => {
      item.onMousePositionChange(x, y);
    });
  };

  update = () => {
    this.drawImage(ImageLoader.loadImage("./img/background.png"), 0, 0);
    this.drawText(
      `Parabéns, você fez ${this.#points} pontos!`,
      WIDTH / 2,
      75,
      "center",
      35
    );
    this.#items.forEach((item) => {
      const metrics = this.drawText(
        item.text,
        item.coordinates.x,
        item.coordinates.y,
        "center",
        35,
        item.textColor
      );
      item.setMetrics(metrics);
    });
  };
}
