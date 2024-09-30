import { WIDTH } from "../../constants/Constants";
import ImageLoader from "../../utils/ImageLoader";
import MenuItem from "../components/MenuItem";
import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class MenuScene extends Scene {
  #items: Array<MenuItem>;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.#items = [
      new MenuItem("Iniciar", { x: WIDTH / 2, y: 150 }, () => {
        SceneManager.getInstace().navigateToTimeSelect();
      }),
      new MenuItem("Créditos", { x: WIDTH / 2, y: 250 }, () => {
        SceneManager.getInstace().navigateToCredits();
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
    this.drawText("Jogo do Antes e Depois", WIDTH / 2, 50, "center", 40);
    this.#items.forEach((item) => {
      const metrics = this.drawText(
        item.text,
        item.coordinates.x,
        item.coordinates.y,
        "center",
        40,
        item.textColor
      );
      item.setMetrics(metrics);
    });
  };
}
