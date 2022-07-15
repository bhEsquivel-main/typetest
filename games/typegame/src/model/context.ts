import { GameContext } from "../../engine/context/gameContext";

export class Context extends GameContext {
    
    GAME_DURATION: number;
    LETTER_SPAWN_DELAY: number;
    GOLD_LETTER_PRICE: number;

    constructor() {
        super();

        this.GAME_WIDTH = 640;
        this.GAME_HEIGHT = 960;
       // this.GAME_MIN_WIDTH = 960;
       // this.GAME_MIN_HEIGHT = 640;
        this.GOLD_LETTER_PRICE = 5;
        this.GAME_DURATION = 20;
        this.LETTER_SPAWN_DELAY = 1000;
    }
}