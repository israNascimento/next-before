import { WIDTH } from "../../constants/Constants";
import ImageLoader from "../../utils/ImageLoader";
import MenuItem from "../components/MenuItem";
import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class CreditsScene extends Scene {
  #items: Array<MenuItem>;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.#items = [
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
    this.drawText("Desenvolvido por", WIDTH / 2, 75, "center", 40);
    this.drawText("Israel Nascimento", WIDTH / 2, 125, "center", 30);
    this.drawText("Artes por", WIDTH / 2, 175, "center", 40);
    this.drawText("freepik.com", WIDTH / 2, 225, "center", 30);
    this.drawText("Sons: ", WIDTH / 2, 270, "center", 40);
    this.drawText(
      "Menu FX 02 by Nightflame -- https://freesound.org/s/397599/ -- License: Creative Commons 0",
      25,
      325,
      "left",
      12
    );
    this.drawText(
      "5.wav by B_Lamerichs -- https://freesound.org/s/219965/ -- License: Creative Commons 0",
      25,
      350,
      "left",
      12
    );
    this.drawText(
      "CONFIRM_SOUND.mp3 by ciapaqua -- https://freesound.org/s/637109/ -- License: Creative Commons 0",
      25,
      375,
      "left",
      12
    );
    this.drawText(
      "video game menu music by magmadiverrr -- https://freesound.org/s/661248/ -- License: Creative Commons 0",
      25,
      400,
      "left",
      12
    );
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
