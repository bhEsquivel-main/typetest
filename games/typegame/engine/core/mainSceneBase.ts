import { Animatable } from "../animation/animatable";
import { Scene, State } from "./scene";
import * as director from "./director";
import * as PIXI from 'pixi.js'
import { Image } from "../component/image";
import { Label } from "../component/label";
import { AppContext } from "../context/appContext";



export abstract class GameState <T extends MainSceneBase> extends State<T> {
    exit(){}
    update(elapsedFrames){}
    enter(){}
    keyClickHandler(keycode: string){};
    keyReleaseHandler(keycode: string){};
}

export class PlayBase<T extends MainSceneBase> extends GameState<T> {}
export class GameOverBase<T extends MainSceneBase> extends GameState<T> {}

export class MainSceneBase extends Scene {

    state: GameState<MainSceneBase>;
    isPaused: boolean;
    isGameOver: boolean;
    isOnMenu: boolean;
    context: AppContext;
    
    static initialized: boolean = false;

    constructor() {
        super();
        this.id = "main";
        this.visible = true;
        this.context = director.appContext;

    }
    enter() {
        super.enter();
        this.onStart();
    }
    exit(){}

    keyClickHandler(keycode: string){
        this.state.keyClickHandler(keycode);
    }
    keyReleaseHandler(keycode: string) {
        this.state.keyReleaseHandler(keycode);
    }

    onStart() {
    }
    
    init() {}
    onCreated() {
        this.isPaused = false;
        this.isGameOver = false;
        this.isOnMenu = false;
        // initialize tetriminos here

        if (!MainSceneBase.initialized) {
            MainSceneBase.initialized = true;
            this.init();
        }

    }

}