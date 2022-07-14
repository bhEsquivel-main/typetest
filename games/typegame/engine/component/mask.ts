import * as director from '../core/director';
import * as graphics from '../util/graphics';
import { Component } from './component';

export enum GraphicType {
  Rectangle,
  Image
}

export type GraphicOption = {
  width: number,
  height: number,
  x: number,
  y: number,
  res?: string
};

export class Mask extends Component {
  content: PIXI.Graphics | PIXI.Sprite;

  constructor(private target: PIXI.Container, type: GraphicType, option: GraphicOption) {
    super();

    switch (type) {
      case GraphicType.Image:
        if(director.renderer.type === PIXI.RENDERER_TYPE.WEBGL) {
          this.content =  new PIXI.Sprite(director.resourceManager.resolve(option.res));
        }
        else {
          this.content = graphics.rectangle(option.width, option.height);
        }
        break;
      case GraphicType.Rectangle:
        this.content = graphics.rectangle(option.width, option.height);
        break;
    }
    this.content.x = option.x;
    this.content.y = option.y;
    this.target.addChild(this.content);
    this.target.mask = this.content;
  }

  activate() {
    if (this.active !== true) {
      if (this.target.mask != this.content) {
        this.target.mask = this.content;
      }
      this.active = true;
    }
  }

  deactivate() {
    if (this.active !== false) {
      if (this.target.mask != null) {
        this.target.mask = null;
      }
      this.active = false;
    }
  }

}