import { View } from "./component";
import * as director from "../core/director";
import { LoadItems, Resource } from "../core/resource";
import * as resources from "../core/resourceManager";
import * as PIXI from 'pixi.js'

export type LabelOption = {
    style: any,
    value: string,
    bitmap: boolean,
    align: string,
    case: string,
    comma: boolean,
    duration?: number,
    decimalPlace?: number,
    prefix?: string,
    suffix?: string
}
  
export class Label extends View {

    text: PIXI.Text | PIXI.BitmapText;
    options: LabelOption;
  
    constructor(options: LabelOption) {
      super();
      this.options = options;
      this.initText();
      this.update();
    }
    initText() {
        let style = this.options.style;
        if (this.options.bitmap) {
          this.text = new PIXI.BitmapText(this.options.value, { font: { size: style.fontSize, name: style.fontFamily } });
          this.text.tint = style.fill;
        } else {
          this.text = new PIXI.Text(this.options.value, style);
        }
        this.addChild(this.text);
      }
    
      set value(txt: string) {
        this.text.text = txt;
        this.update();
      }
    
      set align(txt: string) {
        this.options.align = txt;
        this.update();
      }
    
      set tint(color: number) {
        this.text.tint = color;
      }
    
      get value() {
        return this.text.text;
      }
    
      get anchorX(): number {
        if (this.options.align === "left") return 0;
        else if (this.options.align === "center") return 0.5;
        else if (this.options.align === "right") return 1;
      }
    
      update() {
        this.updateAnchorX();
      }
    
      updateAnchorX(){
        this.text.x = -this.text.width * this.anchorX;
      }
    
}