import * as director from "../core/director";
import { InputSource } from "../util/inputManager";
import { View } from "./component";
import * as PIXI from 'pixi.js'



type ButtonOption = {
  up: PIXI.Texture
  command: string,
}

export class Button extends View {
  sprite: PIXI.Sprite;
  private _enabled: boolean = true;
  private upTexture: PIXI.Texture;
  command: string;

  constructor(public options: ButtonOption) {
    super();
    this.upTexture = options.up;
    this.sprite = new PIXI.Sprite(this.upTexture);
    
    this.addChild(this.sprite);
    this.interactive = true;
    this.command = options.command;
    this.buttonMode = true;

    this.on("click", this.buttonClickedHandler)
      .on("tap", this.buttonClickedHandler);
  }


  private buttonClickedHandler() {
    if (!this._enabled) return;
    director.inputManager.emit(this.command, { source: InputSource.Mouse, context: this });
    this.activate();
  }

  setPivot(x = 0, y = 0) {
    this.sprite.pivot.x = this.sprite.width * x;
    this.sprite.pivot.y = this.sprite.height * y;
}


  public set enabled(value: boolean) {
    this._enabled = value;
    this.buttonMode = value;
  }

  public get enabled() {
    return this._enabled;
  }

}
