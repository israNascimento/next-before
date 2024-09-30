import Scene from "../Scene";
import SceneManager from "../SceneManager";

export default class FinishScene extends Scene {
  handleClick = (x: number, y: number) => {
    SceneManager.getInstace().navigateToTimeSelect();
  };

  update = () => {
    // this.drawRect("blue");
  };
}
