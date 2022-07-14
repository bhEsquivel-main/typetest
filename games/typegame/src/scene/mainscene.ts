import { Animatable } from "../../engine/animation/animatable";
import * as director from "../../engine/core/director";
import { Image } from "../../engine/component/image";
import { GameOverBase, MainSceneBase, PlayBase } from "../../engine/core/mainSceneBase";
import { DEFAULT_KEYBOARD_COMMAND } from "../../engine/service/keyboardService";
import { Letter } from "../component/letter";

export class GameOver extends GameOverBase<MainScene> {

    enter() {
        console.log("GAMEOVER ENTER STATE");

    }
    exit() {
        console.log("GAMEOVER EXIT STATE");
    }

}

export class Play extends PlayBase<MainScene> {
    enter() {
        console.log("PLAY ENTER STATE");
    }
    exit() {
        console.log("PLAY EXIT STATE");
    }
    keyReleaseHandler(keycode: string) {
        if (keycode == "space") {

        }
    }
    keyClickHandler(keycode: string) {
        switch (keycode) {
            case "space":
                break;
            default:

                break;
        }
    }

}
export class MainScene extends MainSceneBase implements Animatable {

    score: number;
    letters: Letter[];

    constructor() {
        super();
    }
    enter() {
        super.enter();
    }

    exit() {
        director.updater.remove(this);
        this.unregisterKeyboardHandlers();
    }

    onStart() {
    }

    onCreated() {
        this.initBG();
        super.onCreated();

        this.initGame();
        this.registerKeyboardHandlers();

    }

    initGame() {
        this.letters = [];
        this.setState(new Play());

            //test create letters
        let _a = new Letter(false, "a");
        this.letters.push(_a);
        this.addChild(_a);
        _a.position.set(320, 480);
    }

    initBG() {
        let background = new Image(director.resourceManager.resolve("@atlas/spriteAtlas/bg.png"));
        this.addChild(background);
    }




    keyClickHandler(keycode: string) {
        console.log(keycode);
        super.keyClickHandler(keycode);

    }

    updateScore(rows) {
        this.score += rows;
    }



    advanceTime(elapsedFrames: number): boolean {

        return true;
    }



    playAgain() {
        director.updater.remove(this);
    }

    registerListeners() {
    }
    // REGISTER HANDLERS
    registerKeyboardHandlers() {
        director.inputManager.on(DEFAULT_KEYBOARD_COMMAND, (data) => this.keyClickHandler(data.key));
    }
    unregisterKeyboardHandlers() {
        director.inputManager.off(DEFAULT_KEYBOARD_COMMAND, (data) => this.keyClickHandler(data.key));
    }


}