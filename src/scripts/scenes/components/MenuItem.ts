import Coordinates from "../game/Coordinates";
import { Position } from "../game/Types";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class MenuItem {
  text: string;
  coordinates: Coordinates;
  textColor: string;
  #metrics?: TextMetrics;
  onClick: () => void;
  #audio: HTMLAudioElement;

  constructor(text: string, coordinates: Coordinates, onClick: () => void) {
    this.text = text;
    this.coordinates = coordinates;
    this.textColor = "white";
    this.onClick = onClick;
    this.#audio = new Audio("./sounds/correct.mp3");
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
        if (this.#audio.paused) {
          this.#audio
            .play()
            .then()
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.#audio.pause();
      this.textColor = "white";
    }
  }
}
