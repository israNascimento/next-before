import FinishScene from "./finish/index";
import GameScene from "./game/index";
import MenuScene from "./menu/index";
import IScene from "./Scene";

export default class SceneManager {
  currentScene: IScene;
  #context: CanvasRenderingContext2D;
  static _instance: SceneManager;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;

    this.currentScene = new MenuScene(context);
    setInterval(() => {
      this.currentScene.update();
    }, 25);
  }

  navigateToGame = () => {
    this.currentScene = new GameScene(this.#context);
  };

  navigateToEnd = () => {
    this.currentScene = new FinishScene(this.#context);
  };

  fowardClick = (x: number, y: number) => {
    console.log("Foward");
    this.currentScene.handleClick(x, y);
  };

  public static Instance(context: CanvasRenderingContext2D) {
    return this._instance || (this._instance = new this(context));
  }

  public static getInstace() {
    return this._instance;
  }
}
