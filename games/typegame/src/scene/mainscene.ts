import { Animatable } from "../../engine/animation/animatable";
import * as director from "../../engine/core/director";
import { Image } from "../../engine/component/image";
import { GameOverBase, MainSceneBase, PlayBase } from "../../engine/core/mainSceneBase";
import { DEFAULT_KEYBOARD_COMMAND } from "../../engine/service/keyboardService";
import { Letter } from "../component/letter";
import { LetterGenerator } from "../letterGenerator";
import { delay, isVowelRegEx } from "../../engine/util/util";
import { Point } from "pixi.js";
import { rangeFloat } from "../../engine/util/random";
import { Label } from "../../engine/component/label";
import { Button } from "../../engine/component/button";
import { Layer } from "../../engine/component/layer";
import { Context } from "../model/context";
import { AnimatedEmitter, SimpleEmitter } from "../../engine/animation/emitters";
import * as constant from "../constant";
import { SpriteRenderer } from "../../engine/component/spriteRenderer";

export class GameOver extends GameOverBase<MainScene> {

    resetGameBtn: Button;
    scoreLabel: Label;
    gameOverLabel: Label;
    enter() {
        console.log("GAMEOVER ENTER STATE");
        this.scene.timerLabel.visible = false;

        let option =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 22,
                fill: 0xffffff
            },
            value: "Play Again",
            bitmap: false,
            align: "center",
            case: "uppercase",
            comma: false,
        }

        this.resetGameBtn = new Button({
            up: director.resourceManager.resolve("@atlas/spriteAtlas/button.png"),
            command: "onClickReset",
        });
        this.scene.addChild(this.resetGameBtn);
        this.resetGameBtn.scale.set(0.8,0.8);
        this.resetGameBtn.setPivot(0.5);
        this.resetGameBtn.position.set(director.appContext.GAME_WIDTH*0.5,director.appContext.GAME_HEIGHT*0.5);
        director.inputManager.once("onClickReset",() => this.handleResetgame() );

        let startGameLabel = new Label(option);
        this.resetGameBtn.addChild(startGameLabel);
        startGameLabel.position.set(0,25);


        let score = this.scene.collectedLetter + 
        (this.scene.collectedGoldenLetter * (this.scene.context as Context).GOLD_LETTER_PRICE);


        let option2 =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 65,
                fill: 0xffffff
            },
            value: score.toString(),
            bitmap: false,
            align: "center",
            case: "uppercase",
            comma: false,
        }

        this.scoreLabel = new Label(option2);
        this.scene.addChild(this.scoreLabel);
        this.scoreLabel.position.set(director.appContext.GAME_WIDTH*0.5,director.appContext.GAME_HEIGHT*0.25);
       
        option2.style.fontSize = 20;
        this.gameOverLabel = new Label(option2);
        this.scene.addChild(this.gameOverLabel);
        this.gameOverLabel.position.set(director.appContext.GAME_WIDTH*0.5,director.appContext.GAME_HEIGHT*0.40);
       
        this.gameOverLabel.value = "(x1)Letters: " + this.scene.collectedLetter+ "\n" +
                                   "(x5)Golden Letters: " + this.scene.collectedGoldenLetter+ ""

     

    }

    handleResetgame() {
        this.resetGameBtn.destroy({children:true});
        this.gameOverLabel.destroy();
        this.scoreLabel.destroy();
        this.scene.resetGame();
    }


    exit() {
        console.log("GAMEOVER EXIT STATE");
    }

}

export class Play extends PlayBase<MainScene> {

    letterDelayInMS: number = 1200;
    delayDecreaseFactor: number = 0.98;
    nextLetterTime: number = 0;

    enter() {
        console.log("PLAY ENTER STATE");
        this.scene.timerLabel.visible = true;
        this.letterDelayInMS = (this.scene.context as Context).LETTER_SPAWN_DELAY;
    }
    exit() {
        console.log("PLAY EXIT STATE");
    }
    update(elapsedFrames): void {
       this.spawnLetter();
    }

    spawnLetter() {
         //spawner
         let currentTime = (new Date()).getTime();
         if (currentTime >= this.nextLetterTime)
         {
             this.createLetter();
             this.nextLetterTime = currentTime + this.letterDelayInMS;
             this.letterDelayInMS *= this.delayDecreaseFactor;
         }
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
                this.collectLetter(keycode);
                break;
        }
    }

    collectLetter(keyletter) {
        if(this.scene.isGameOver== true) return;
        this.scene.letters.forEach(letter => {
               if( letter.strvalue == keyletter) {
                    this.letterDelayInMS *= this.delayDecreaseFactor;
                    this.animateEffect(letter).then(() => {
                        this.countLetter(letter);
                        letter.collect();
                    });
               }
        });
        this.scene.letters = this.scene.letters.filter((letter, index) => {
            return letter.strvalue != keyletter;
        });

    }

    animateEffect(letter): Promise<any> {
        return new Promise(res => {
            if(letter.isGold) {
                let  ss = new SpriteRenderer(constant.spritesheet_textures(),constant.circleSS_option);
                letter.addChild(ss);
                ss.position.x -= 65;
                ss.position.y -= 35;
                ss.playOnce().then(() => {
                    res(undefined);
                    ss.destroy();
                });
            } else {
                let ae = new AnimatedEmitter(letter, constant.effect_textures(), constant.effect_config, 0.0012 );
                ae.showOnce(() => {
                    res(undefined);
                });
            }
    
        });
    }

    countLetter(letter) {
        if(letter.isGold) this.scene.collectedGoldenLetter++;
        else this.scene.collectedLetter++;
    }

    createLetter() {
        let strValue = LetterGenerator.GetRandomLetterString();
        let _letter = new Letter(isVowelRegEx(strValue), strValue);
        this.scene.letters.push(_letter);
        this.scene.addChild(_letter);

        
		let randomPosition = new Point(rangeFloat(_letter.width , (director.appContext.GAME_WIDTH - _letter.width)), 0);
        _letter.position = randomPosition;
    }


}
export class MainScene extends MainSceneBase implements Animatable {

    collectedLetter: number;
    collectedGoldenLetter: number;
    current_time: number;
    letters: Letter[];
    _init: boolean = false;;

    timerLabel: Label;

   // collectEffect: AnimatedEmitter;
   // effectLayer: Layer;

    spriteSheet: SpriteRenderer;

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

        this.addTimerLabel();
        this.initGame();
        this.registerKeyboardHandlers();


       // this.effectLayer = new Layer();
        //this.addChild(this.effectLayer);
        //this.collectEffect = new AnimatedEmitter(this.effectLayer, constant.effect_textures(), constant.effect_config, 0.0012 );
       
  
    }

    initGame() {
        this.letters = [];
        this.setState(new Play());
        this._init = true;
        this.isGameOver = false;
        this.current_time = (this.context as Context).GAME_DURATION;
        this.collectedGoldenLetter = 0;
        this.collectedLetter = 0;
        director.updater.add(this);
    }

    addTimerLabel() {
        let option =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 40,
                fill: 0x43e307
            },
            value: "0",
            bitmap: false,
            align: "center",
            case: "lowercase",
            comma: false,
        }

        this.timerLabel = new Label(option);
        this.addChild(this.timerLabel);
        this.timerLabel.position.set(director.appContext.GAME_WIDTH* 0.5, 30);
        this.resetTime();

    }

    setGameOver() {
        this.isGameOver = true;
        director.updater.remove(this);
        this.setState(new GameOver());
    }

    resetGame() {
        let allLetters = this.letters.splice(0, this.letters.length);
        allLetters.forEach(element => {
            element.dispose();
        });

        delay(1000).then(() => {
            this.initGame();
        })
    }
 
    initBG() {
        let background = new Image(director.resourceManager.resolve("@atlas/spriteAtlas/bg.png"));
        this.addChild(background);
    }




    keyClickHandler(keycode: string) {
        super.keyClickHandler(keycode);

    }

    

    advanceTime(elapsedFrames: number): boolean {
        if(this._init && this.isGameOver == false) {
            this.state.update(elapsedFrames);
            this.updateTimer(elapsedFrames);
        }
        return true;
    }
    resetTime(){
        this.current_time = (this.context as Context).GAME_DURATION;;
        this.setTime(this.current_time % 60);
    }
    setTime(_time) {
        _time =  Math.min(Math.max(_time, 0), (this.context as Context).GAME_DURATION);
        this.timerLabel.value = _time.toFixed(0);
    }

    updateTimer(elapseTime) {
        if (this.isGameOver == true) return;
        if (this.timerLabel == null)return;
        this.current_time -= (1/60) * elapseTime;
        this.setTime((this.current_time % 60));
        if (this.current_time <= 0) {
            this.setGameOver();
        }
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