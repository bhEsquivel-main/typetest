import { Image } from "../../engine/component/image";
import { Label } from "../../engine/component/label";
import * as director from "../../engine/core/director";


export class Letter extends Image {
    
    character: Label;
    
   isGold: boolean;

    constructor(_isGold: boolean, strvalue: string ) {
        if(_isGold) {
            super(director.resourceManager.resolve("@atlas/spriteAtlas/gold_block.png"));
        } else {
            super(director.resourceManager.resolve("@atlas/spriteAtlas/blue_block.png"));
        }
        this.setPivot(0.5);
        this.isGold = _isGold;

        let option =  {
            style: {
                fontFamily: "Consolas",
                fontSize: 55,
                fill: 0xffffff
            },
            value: strvalue.toUpperCase(),
            bitmap: false,
            align: "center",
            case: "uppercase",
            comma: false,
        }
        
        this.character = new Label(option);
        this.addChild(this.character);
        this.character.position.set(0,15);
    }


    
}