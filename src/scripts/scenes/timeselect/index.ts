import { WIDTH } from "../../constants/Constants";
import ImageLoader from "../../utils/ImageLoader";
import MenuItem from "../components/MenuItem";
import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class TimeSelect extends Scene {
  #items: Array<MenuItem>;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.#items = [
      new MenuItem("30 segundos", { x: WIDTH / 2, y: 150 }, () => {
        SceneManager.getInstace().navigateToGame(30000);
      }),
      new MenuItem("60 segundos", { x: WIDTH / 2, y: 225 }, () => {
        SceneManager.getInstace().navigateToGame(60000);
      }),
      new MenuItem("90 segundos", { x: WIDTH / 2, y: 300 }, () => {
        SceneManager.getInstace().navigateToGame(90000);
      }),
      new MenuItem("120 segundos", { x: WIDTH / 2, y: 375 }, () => {
        SceneManager.getInstace().navigateToGame(120000);
      }),
      new MenuItem("voltar", { x: 100, y: 0 }, () => {
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
    this.drawText("Selecione o tempo", WIDTH / 2, 75, "center", 40);
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
