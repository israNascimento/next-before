import GameScene from "./game/index";
import IScene from "./Scene";

export default class SceneManager {
  currentScene: IScene;

  constructor(context: CanvasRenderingContext2D) {
    this.currentScene = new GameScene(context);
  }

  fowardClick = (x: number, y: number) => {
    this.currentScene.handleClick(x, y);
  };
}
