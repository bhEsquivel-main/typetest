import { Animatable } from "../../engine/animation/animatable";
import { Scene } from "../../engine/core/scene";
import * as director from "../../engine/core/director";
import * as PIXI from 'pixi.js'
import { Image } from "../../engine/component/image";
import { Label } from "../../engine/component/label";
import { delay } from "../../engine/util/util";
import { MainScene } from "./mainscene";
import { Button } from "../../engine/component/button";

export class SplashScene extends Scene implements Animatable {



    constructor() {
        super();
        this.id = "splash";
        this.visible = true;

    }
    enter() {
        this.resourceArray = [
            { type: "atlas", id: "spriteAtlas", src: "('../../assets/sprites.json" },
            { type: "img", id: "logo", src: "('../../assets/logo.png" }
        ];
        super.enter();
    }
    onCreated() {
    }

    protected onLoaded() {
        let background = new Image(director.resourceManager.resolve("@atlas/spriteAtlas/bg.png"));
        this.addChild(background);
       
       
        let option =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 35,
                fill: 0xffffff
            },
            value: "START",
            bitmap: false,
            align: "center",
            case: "uppercase",
            comma: false,
        }

        let startGameButton = new Button({
            up: director.resourceManager.resolve("@atlas/spriteAtlas/button.png"),
            command: "onClickStart",
        });
        this.addChild(startGameButton);
        startGameButton.scale.set(0.6,0.6);
        startGameButton.setPivot(0.5);
        startGameButton.position.set(320,480);
        director.inputManager.on("onClickStart",() => this.handleStartGame() );

        let startGameLabel = new Label(option);
        startGameButton.addChild(startGameLabel);
        startGameLabel.position.set(0,25);


    }

    handleStartGame () {
        delay(200).then(() => this.closeScene());
        director.resourceManager.postLoad();
    }

    closeScene() {
        this.next = new MainScene();
        if (this.next) this.transit();
    }

    advanceTime(elapsedFrames: number): boolean {
        return true;
    }
}