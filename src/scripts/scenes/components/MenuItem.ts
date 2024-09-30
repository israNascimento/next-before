import Coordinates from "../game/Coordinates";

export default class MenuItem {
  text: string;
  coordinates: Coordinates;
  textColor: string;
  #metrics?: TextMetrics;
  onClick: () => void;
  #audio: HTMLAudioElement;
  #shouldPlay: boolean;

  constructor(text: string, coordinates: Coordinates, onClick: () => void) {
    this.text = text;
    this.coordinates = coordinates;
    this.textColor = "white";
    this.onClick = onClick;
    this.#audio = new Audio("./sounds/menu_item_box.wav");
    this.#shouldPlay = true;
  }

  setMetrics(metrics: TextMetrics) {
    this.#metrics = metrics;
  }

  #calculatePositionMatches = (x: number, y: number) => {
    if (this.#metrics) {
      const left = this.coordinates.x - this.#metrics.actualBoundingBoxLeft;
      const right = this.coordinates.x + this.#metrics.actualBoundingBoxRight;
      const bottom = this.coordinates.y + this.#metrics.fontBoundingBoxAscent;
      const top = this.coordinates.y - this.#metrics.actualBoundingBoxDescent;
      if (x > left && x < right && y > top && y < bottom) {
        return true;
      } else {
        return false;
      }
    }
  };

  onMouseClick(x: number, y: number) {
    if (this.#calculatePositionMatches(x, y)) {
      this.onClick();
    }
  }

  onMousePositionChange(x: number, y: number) {
    if (this.#calculatePositionMatches(x, y)) {
      this.textColor = "blue";
      try {
        if (this.#audio.paused && this.#shouldPlay) {
          this.#audio
            .play()
            .then()
            .catch((e) => {
              console.log(e);
            });
          this.#shouldPlay = false;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.textColor = "white";
      this.#shouldPlay = true;
    }
  }
}
