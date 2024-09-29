import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class MenuScene extends Scene {
  handleClick = (x: number, y: number) => {
    SceneManager.getInstace().navigateToGame();
  };

  update = () => {
    this.drawRect();
  };
}
