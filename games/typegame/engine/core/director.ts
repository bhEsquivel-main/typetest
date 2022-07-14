import * as PIXI from 'pixi.js'
import { Update } from "../animation/update";
import { AppContext } from '../context/appContext';
import { ServiceManager } from '../service/service';
import { isBlank } from '../util/util';
import { SceneManager } from './sceneManager';
import { ResourceManager } from './resourceManager';
import { SplashScene } from '../../src/scene/splashScene';
import { SingleEventEmitter } from '../util/singleEventEmitter';
import { KeyboardService } from "../service/keyboardService";
import * as TWEEN from "@tweenjs/tween.js";
import { GameContext } from '../context/gameContext';


export let renderer: PIXI.Renderer; // webgl
export const updater: Update = new Update();
export let stage: PIXI.Container;
export let appContext: GameContext;
export let options: Options;

export const services: ServiceManager = new ServiceManager();
export const sceneManager: SceneManager = new SceneManager();
export const resourceManager: ResourceManager = new ResourceManager();
export const inputManager: SingleEventEmitter = new SingleEventEmitter();


export type Options = {
    canvas: HTMLCanvasElement,
    minWidth?: number,
    width?: number,
    height?: number,
    backgroundColor?: number,
    resolution?: number
}


function createRenderer() {
    let context = appContext ;
    let stageCanvas =  document.querySelector("#stage") as HTMLCanvasElement
    let opt = {

        minWidth: context.GAME_MIN_WIDTH,
        width: context.GAME_WIDTH,
        height: context.GAME_HEIGHT,
        canvas: stageCanvas,
        view: stageCanvas,
        backgroundColor: context.GAME_BG_COLOR,
        autoResize: true,
        antialias: true,
        resolution: 1
      };
      options = opt;
      let renderer = PIXI.autoDetectRenderer(opt);
      if (isBlank(stageCanvas)) {
        document.body.appendChild(renderer.view);
      }
      return renderer;
}

export function initialize(context?) {
    if (!context)return;
    appContext = context;
    return appContext.initialize();
}

export function run () {

    renderer = createRenderer();
    stage = new PIXI.Container();
    stage.name = "world";
    let context = appContext;
    stage.addChild(sceneManager.sceneContainer);
    stage.addChild(sceneManager.overlayContainer);
    stage.pivot.set(context.GAME_WIDTH / 2, context.GAME_HEIGHT / 2);

    
    // register keycode to be used in game
    services.register("keyboardervice", new KeyboardService());
    let kbs = services.get("keyboardervice") as KeyboardService;
    if (kbs)kbs.configure([
        {key: " ", command: "keyCodeSpace", when: "main"},
    ]);



    // start all services
    services.startup();

    // emnter forst scene
    let splashScene = new SplashScene();
    sceneManager.replace(splashScene);


    PIXI.Ticker.shared.add(update);
}
function animate(time) {
    window.requestAnimationFrame(animate);
    TWEEN.update(time);
}

function update(elapsedFrames: number) {
    animate(elapsedFrames);
    updater.advanceTime(elapsedFrames);
    renderer.render(stage)    
}