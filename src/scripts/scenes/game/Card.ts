import { CARD_HEIGHT, CARD_WIDTH } from "../../constants/Constants";
import Coordinates from "./Coordinates";

export default class Card {
  id: number;
  position: Coordinates;
  shouldScale: boolean;
  #audio: HTMLAudioElement;
  #shouldPlay: boolean;

  constructor(id: number) {
    this.id = id;
    this.shouldScale = false;
    this.#audio = new Audio("./sounds/menu_item_box.wav");
    this.#shouldPlay = true;
  }

  setPosition(position: Coordinates) {
    this.position = position;
  }

  #calculatePositionMatches = (x: number, y: number) => {
    if (
      x > this.position.x &&
      y > this.position.y &&
      x < this.position.x + CARD_WIDTH &&
      y < this.position.y + CARD_HEIGHT
    ) {
      return true;
    }
    return false;
  };

  hadClick(clickX: number, clickY: number): boolean {
    return this.#calculatePositionMatches(clickX, clickY);
  }

  resetShoulScale() {
    this.shouldScale = false;
  }

  handleMouseMove(x: number, y: number) {
    if (this.#calculatePositionMatches(x, y)) {
      this.shouldScale = true;
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
      this.shouldScale = false;
      this.#shouldPlay = true;
    }
  }
}
