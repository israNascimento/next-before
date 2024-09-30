import CreditsScene from "./credits/index";
import FinishScene from "./finish/index";
import GameScene from "./game/index";
import MenuScene from "./menu/index";
import IScene from "./Scene";
import TimeSelect from "./timeselect/index";

export default class SceneManager {
  currentScene: IScene;
  #context: CanvasRenderingContext2D;
  static _instance: SceneManager;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;

    this.currentScene = new FinishScene(context, 1000);
    setInterval(() => {
      this.currentScene.update();
    }, 25);
  }

  navigateToGame = (selectedTime: number) => {
    this.currentScene = new GameScene(this.#context, selectedTime);
  };

  navigateToTimeSelect = () => {
    this.currentScene = new TimeSelect(this.#context);
  };

  navigateToCredits = () => {
    this.currentScene = new CreditsScene(this.#context);
  };

  navigateToEnd = (points: number) => {
    this.currentScene = new FinishScene(this.#context, points);
  };

  navigateToMenu = () => {
    this.currentScene = new MenuScene(this.#context);
  };

  fowardClick = (x: number, y: number) => {
    this.currentScene.handleClick(x, y);
  };

  fowardMouseMove = (x: number, y: number) => {
    this.currentScene.handleMouseMove(x, y);
  };

  public static Instance(context: CanvasRenderingContext2D) {
    return this._instance || (this._instance = new this(context));
  }

  public static getInstace() {
    return this._instance;
  }
}
