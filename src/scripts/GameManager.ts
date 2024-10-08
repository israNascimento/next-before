import SceneManager from "./scenes/SceneManager";

class GameManager {
  #canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  #ctx = this.#canvas.getContext("2d");
  #sceneManager: SceneManager;

  constructor() {
    this.#sceneManager = SceneManager.Instance(this.#ctx);
    this.init();
  }

  init() {
    this.#canvas.addEventListener(
      "click",
      (ev: MouseEvent) => {
        this.#sceneManager.fowardClick(ev.x, ev.y);
      },
      true
    );
    this.#canvas.addEventListener("mousemove", (ev: MouseEvent) => {
      this.#sceneManager.fowardMouseMove(ev.x, ev.y);
    });
  }
}

export default GameManager;
