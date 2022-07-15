import { Image } from "../../engine/component/image";
import { Label } from "../../engine/component/label";
import * as director from "../../engine/core/director";
import * as tween from "../../engine/util/tween";
import { Animatable } from "../../engine/animation/animatable";
import { rangeFloat, rangeInteger } from "../../engine/util/random";


export class Letter extends Image implements Animatable{
    
    character: Label;
    strvalue: string;
    isGold: boolean;
    fallSpeed: number;
    active: boolean;

    constructor(_isGold: boolean, _strvalue: string ) {
        if(_isGold) {
            super(director.resourceManager.resolve("@atlas/spriteAtlas/gold_block.png"));
        } else {
            super(director.resourceManager.resolve("@atlas/spriteAtlas/blue_block.png"));
        }
        this.setPivot(0.5);
        this.isGold = _isGold;
        this.strvalue = _strvalue;

        let option =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 45,
                fill: 0xffffff
            },
            value: _strvalue.toUpperCase(),
            bitmap: false,
            align: "center",
            case: "uppercase",
            comma: false,
        }
        
        this.character = new Label(option);
        this.addChild(this.character);
        this.character.position.set(0,10);

        this.fallSpeed = rangeFloat(0.8, 0.3);
        if (this.isGold) this.fallSpeed = rangeFloat(1.3, 0.7);
        director.updater.add(this);
        this.active = true;
    }

    collect() {
        if (this.active == false) return;
        director.updater.remove(this);
        this.fadeDestroy();
    }

    fadeDestroy() {
        tween.fadeOut(this, 200, () => {
            this.destroy();
        });
    }

    dispose() {
        this.fadeDestroy();
    }
    
    
    
    advanceTime(elapsedFrames: number): boolean {
        if(this.active == false) return;
        this.position.y += (this.fallSpeed * elapsedFrames * 10);
        if(this.position.y >= director.appContext.GAME_HEIGHT) {
            this.active = false;
            this.dispose();
        }        
        return true;
    }




    
}