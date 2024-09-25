import { CARD_HEIGHT, CARD_WIDTH } from "../../constants/Constants";
import CardPosition from "./CardPosition";

export default class Card {
  id: number;
  position: CardPosition;
  bitmap: ImageBitmap;

  constructor(id: number) {
    this.id = id;
    const image = new Image();
    image.src = `/img/${id}.png`;
    image.onload = async () => {
      this.bitmap = await createImageBitmap(image);
    };
  }

  setPosition(position: CardPosition) {
    this.position = position;
  }

  hadClick(clickX: number, clickY: number): boolean {
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
