import { View } from "./component";
import * as director from "../core/director";
import { LoadItems, Resource } from "../core/resource";
import * as resources from "../core/resourceManager";
import * as PIXI from 'pixi.js'

export class Image extends View {

    private _sprite: PIXI.Sprite;
    private _xPivot: number = 0;
    private _yPivot: number = 0;

    constructor(texture: PIXI.Texture) {
        super();
        this._sprite = new PIXI.Sprite(texture);
        this.addChild(this._sprite);
        // this.showBoundingBox();
    }

    get SPRITE(): any {
        return this._sprite;
    }

    setPivot(x = 0, y = 0) {
        this._xPivot = x;
        this._yPivot = y;
        this.reDraw();
    }

    reDraw() {
        this._sprite.pivot.x = this._sprite.width * this._xPivot;
        this._sprite.pivot.y = this._sprite.height * this._yPivot;
    }

    set resource(res: string | PIXI.Texture) {
        if (res instanceof PIXI.Texture) {
            this._sprite.texture = res;
        } else {
            let texture = director.resourceManager.resolve(res) as PIXI.Texture;
            this._sprite.texture = texture;
        }
        
        this.reDraw();
    }
    set tint(value: number) {
        if (value >= 0) this._sprite.tint = value;
    }
}