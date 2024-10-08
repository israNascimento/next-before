import {
  CARD_COUNT,
  CARD_MARGIN,
  CARD_PER_ROW,
  CARD_WIDTH,
  FIRST_ROW_POS_Y,
  FONT_SIZE_GAME_GUI,
  FONT_SIZE_GAME_OPTION,
  GAME_TIME,
  GAME_UPDATE_INTERVAL,
  SECOND_ROW_POS_Y,
  TIMEOUT_RESULT,
  TIMEOUT_RESULT_GUI,
  WIDTH,
} from "../../constants/Constants";
import ImageLoader from "../../utils/ImageLoader";
import Scene from "../Scene";
import SceneManager from "../SceneManager";
import Card from "./Card";
import Coordinates from "./Coordinates";
import { Position, Result } from "./Types";

export default class GameScene extends Scene {
  #cards: Card[];
  #timeLeft: number;
  #currentOption: {
    option: number;
    positionToDiscover: Position;
  };
  #points: number;
  #possiblesCardsPosition: Coordinates[];
  #canClick: Boolean;
  #result?: Result;
  #backgroundSound: HTMLAudioElement;
  #timeoutResultGui?: NodeJS.Timeout;

  constructor(context: CanvasRenderingContext2D, timeToFinish: number) {
    super(context);
    this.#cards = [];
    this.#possiblesCardsPosition = [];
    for (let i = 0; i < CARD_COUNT; i++) {
      this.#cards.push(new Card(i));
      this.#possiblesCardsPosition.push(this.#generatePositions(i));
    }
    this.#shuffleCards();

    this.#generateOption();
    this.#timeLeft = timeToFinish;
    this.#points = 0;
    this.#canClick = true;
    this.#backgroundSound = new Audio("./sounds/background.mp3");
    this.#backgroundSound.volume = 0.5;
    this.#backgroundSound.play();
    this.#backgroundSound.loop = true;
  }

  override update = () => {
    super.update();
    if (this.#timeLeft <= 50) {
      this.#backgroundSound.pause();
      SceneManager.getInstace().navigateToEnd(this.#points);
    }
    this.#timeLeft -= GAME_UPDATE_INTERVAL;
    this.#drawBackground();
    this.#drawCards();
    this.#drawOption();
    this.#drawGui();
  };

  #generatePositions = (index: number): Coordinates => {
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
    this.#currentOption = {
      option: option,
      positionToDiscover: this.#getPositionToDiscover(option),
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
            if (this.#points > 0) {
              this.#points -= 50;
            }
            this.#result = "wrong";
          }
        } else {
          if (this.#currentOption.option + 1 == clickedCard.id) {
            this.#points += 100;
            this.#result = "correct";
          } else {
            if (this.#points > 0) {
              this.#points -= 50;
            }
            this.#result = "wrong";
          }
        }
        if (this.#result == "correct") {
          new Audio("./sounds/correct.mp3").play();
        } else {
          new Audio("./sounds/wrong.wav").play();
        }
        this.#shuffleCards();
        this.#generateOption();
        this.#canClick = false;
        clearTimeout(this.#timeoutResultGui);
        clickedCard.resetShoulScale();
        setTimeout(() => {
          this.#canClick = true;
        }, TIMEOUT_RESULT);
        this.#timeoutResultGui = setTimeout(() => {
          this.#result = undefined;
        }, TIMEOUT_RESULT_GUI);
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

  override handleMouseMove = (x: number, y: number) => {
    this.#cards.forEach((card) => {
      card.handleMouseMove(x, y);
    });
  };

  #drawCards = () => {
    this.#cards.forEach((card, index) => {
      const cardImage = ImageLoader.loadImage(`./img/${card.id}.png`);
      card.setPosition(this.#possiblesCardsPosition[index]);
      this.drawImage(
        cardImage,
        card.position.x,
        card.position.y,
        card.shouldScale
      );
    });
  };

  #drawOption = () => {
    if (this.#currentOption) {
      this.drawText(
        `Qual o número ${this.#getPositionText()} do`,
        CARD_MARGIN,
        10,
        "left",
        FONT_SIZE_GAME_OPTION,
        "white",
        true
      );
      this.drawImage(
        ImageLoader.loadImage(`./img/${this.#currentOption.option}.png`),
        650,
        CARD_MARGIN
      );
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
          "#05e805",
          true
        );
      } else {
        this.drawText(
          `Você errou... Tente novamente`,
          WIDTH / 2,
          200,
          "center",
          40,
          "#FF0000",
          true
        );
      }
    }
  };

  #drawBackground = () => {
    this.drawImage(ImageLoader.loadImage("./img/background.png"), 0, 0);
  };
}
