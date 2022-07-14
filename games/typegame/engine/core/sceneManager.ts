import { Scene } from "./scene";
import * as PIXI from 'pixi.js'

export class SceneManager {
    overlayContainer: PIXI.Container;
    sceneContainer: PIXI.Container;
    private _current: Scene;
    private scenes: Scene[];
    
    constructor() {
        this.overlayContainer = new PIXI.Container();
        this.sceneContainer = new PIXI.Container();
        this.scenes = [];
    }


    push(scene: Scene, hide: boolean = true, args? : any) {
        if (this._current) {
            this._current.visible = !hide;
        }
        this.add(this.resolve(scene), args)
    }
    pop() {
        if (this._current) {
            this._current.exit();
            this.sceneContainer.removeChild(this._current);
            this.scenes.pop();
        }
        if (this.scenes.length > 0) {
            let scene = this.scenes[this.scenes.length - 1];
            scene.visible = true;
            this._current = scene;
        }
    }
    remove(scene:Scene) {
      this.sceneContainer.removeChild(scene);
      this.scenes.splice(this.scenes.indexOf(scene), 1);
    }
  
    replace(scene: Scene, args?: any) {
        if (this._current) {
          this._current.exit();
          this.remove(this._current);
        }
        this.add(this.resolve(scene), args);
      }
    resolve(scene: Scene): Scene {
      return scene as Scene;
    }
    
    get current() {
        return this._current;
    }
    add(scene: Scene, args?: any) {
        this.scenes.push(scene);
        this.sceneContainer.addChild(scene);
        this._current = scene;
        this._current.enter(args);
    }
}