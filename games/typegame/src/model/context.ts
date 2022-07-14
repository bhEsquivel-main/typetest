import { GameContext } from "../../engine/context/gameContext";

export class Context extends GameContext {
    constructor() {
        super();

        this.GAME_WIDTH = 960;
        this.GAME_HEIGHT = 640;
       // this.GAME_MIN_WIDTH = 960;
       // this.GAME_MIN_HEIGHT = 640;


    }
}