import { CARD_HEIGHT, CARD_WIDTH } from "../../constants/Constants";
import Coordinates from "./Coordinates";

export default class Card {
  id: number;
  position: Coordinates;

  constructor(id: number) {
    this.id = id;
  }

  setPosition(position: Coordinates) {
    this.position = position;
  }

  hadClick(clickX: number, clickY: number): boolean {
    console.log(clickX, clickY);
    if (
      clickX > this.position.x &&
      clickY > this.position.y &&
      clickX < this.position.x + CARD_WIDTH &&
      clickY < this.position.y + CARD_HEIGHT
    ) {
      return true;
    }
    return false;
  }
}
