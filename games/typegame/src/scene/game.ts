import { MainScene } from "./mainscene";


let scene: MainScene;

export function setState(_state: MainScene) {
    if(_state) {
        scene = _state;
    }
}

export function playUpdateState(state: any, pauseState: any, menuState: any, gameOverState: any) {}
export function pauseUpdateState(state: any, playState: any, menuState: any, gameOverState: any) {}
export function menuUpdateState(state: any, pauseState: any, playState: any, gameOverState: any) {}
export function gameOverUpdateState(state: any,  menuState: any, playState: any){}
