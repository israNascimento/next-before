import {
  CARD_COUNT,
  CARD_MARGIN,
  CARD_PER_ROW,
  CARD_WIDTH,
  FIRST_ROW_POS_Y,
  FONT_SIZE_GAME_GUI,
  FONT_SIZE_GAME_OPTION,
  GAME_TIME,
  SECOND_ROW_POS_Y,
  TIMEOUT_RESULT,
  WIDTH,
} from "../../constants/Constants";
import Scene from "../Scene";
import Card from "./Card";
import CardPosition from "./CardPosition";
import { Position, Result } from "./Types";

export default class GameScene extends Scene {
  #cards: Card[];
  #timeLeft: number;
  #currentOption: {
    option: number;
    bitmap: ImageBitmap;
    positionToDiscover: Position;
  };
  #points: number;
  #possiblesCardsPosition: CardPosition[];
  #updateInterval: NodeJS.Timeout;
  #canClick: Boolean;
  #result?: Result;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.#cards = [];
    this.#possiblesCardsPosition = [];
    for (let i = 0; i < CARD_COUNT; i++) {
      this.#cards.push(new Card(i));
      this.#possiblesCardsPosition.push(this.#generatePositions(i));
    }
    this.#shuffleCards();

    this.#generateOption();
    this.#timeLeft = GAME_TIME;
    this.#points = 0;
    this.#canClick = true;
    this.#updateInterval = setInterval(() => {
      this.#update();
    }, 25);
  }

  #update = () => {
    if (this.#timeLeft <= 0) {
      clearTimeout(this.#updateInterval);
      alert(
        `Parabéns, você fez ${this.#points} pontos! Aperte OK para recarregar`
      );
      window.location.reload();
    }
    this.#timeLeft -= 25;
    this.drawScene();
  };

  #generatePositions = (index: number): CardPosition => {
    return {
      y: index < CARD_PER_ROW ? FIRST_ROW_POS_Y : SECOND_ROW_POS_Y,
      x:
        CARD_WIDTH * (index % CARD_PER_ROW) +
        CARD_MARGIN +
        CARD_MARGIN * (index % CARD_PER_ROW),
    };
  };

  #generateOption = async () => {
    const option = Math.floor(Math.random() * this.#cards.length);
    const image = new Image();
    image.src = `/img/${option}.png`;
    image.onload = async () => {
      this.#currentOption = {
        option: option,
        bitmap: await createImageBitmap(image),
        positionToDiscover: this.#getPositionToDiscover(option),
      };
    };
  };

  #getPositionToDiscover = (index: number): Position => {
    if (index == 0) return "next";
    if (index == this.#cards.length - 1) return "before";

    const random = Math.floor(Math.random() * 10);
    if (random < 5) {
      return "before";
    } else {
      return "next";
    }
  };

  override handleClick = (x: number, y: number) => {
    if (this.#canClick) {
      const clickedCard = this.#findClickedCard(x, y);
      if (clickedCard != undefined) {
        if (this.#currentOption.positionToDiscover == "before") {
          if (this.#currentOption.option - 1 == clickedCard.id) {
            this.#points += 100;
            this.#result = "correct";
          } else {
            this.#result = "wrong";
          }
        } else {
          if (this.#currentOption.option + 1 == clickedCard.id) {
            this.#points += 100;
            this.#result = "correct";
          } else {
            this.#result = "wrong";
          }
        }

        this.#shuffleCards();
        this.#generateOption();
        this.#canClick = false;
        setTimeout(() => {
          this.#canClick = true;
          this.#result = undefined;
        }, TIMEOUT_RESULT);
      }
    }
  };

  #shuffleCards() {
    for (let i = this.#cards.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }

  #findClickedCard = (x: number, y: number) => {
    return this.#cards.find((card) => {
      return card.hadClick(x, y);
    });
  };

  override drawScene = () => {
    super.drawScene();
    this.#drawBackground();
    this.#drawCards();
    this.#drawOption();
    this.#drawGui();
  };

  #drawCards = () => {
    this.#cards.forEach((card, index) => {
      if (card.bitmap) {
        card.setPosition(this.#possiblesCardsPosition[index]);
        this.drawImage(card.bitmap, card.position.x, card.position.y);
      }
    });
  };

  #drawOption = () => {
    if (this.#currentOption) {
      this.drawText(
        `Qual número vem ${this.#getPositionText()} de `,
        CARD_MARGIN,
        10,
        "left",
        FONT_SIZE_GAME_OPTION
      );
      this.drawImage(this.#currentOption.bitmap, 600, CARD_MARGIN);
    }
  };

  #getPositionText = (): string => {
    if (this.#currentOption) {
      if (this.#currentOption.positionToDiscover == "before") {
        return "antes";
      }
      return "depois";
    }
    return "";
  };

  #drawGui = () => {
    this.drawText(
      `Tempo: ${(this.#timeLeft / 1000).toFixed(0)}`,
      CARD_MARGIN,
      FONT_SIZE_GAME_OPTION * 2,
      "left",
      FONT_SIZE_GAME_GUI
    );
    this.drawText(
      `Pontos: ${this.#points.toFixed(0)}`,
      CARD_MARGIN,
      FONT_SIZE_GAME_OPTION * 2 + FONT_SIZE_GAME_GUI * 2,
      "left",
      FONT_SIZE_GAME_GUI
    );
    this.#drawResult();
  };

  #drawResult = () => {
    if (this.#result != undefined) {
      if (this.#result == "correct") {
        this.drawText(
          `Parabéns, você acertou =D`,
          WIDTH / 2,
          200,
          "center",
          40,
          "#00FF00"
        );
      } else {
        this.drawText(
          `Ops... Você errou... Tente novamente =D`,
          WIDTH / 2,
          200,
          "center",
          40,
          "#FF0000"
        );
      }
    }
  };

  #drawBackground = () => {
    this.drawRect();
  };
}
