import * as array from "../util/array";
import { Orientation } from "../util/types";
import * as PIXI from 'pixi.js'
import { isPresent } from "../util/util";
import * as graphics from "../util/graphics";

export abstract class Component {
  abstract activate();
  abstract deactivate();
  active?: boolean;
  id: string;
}

export abstract class View extends PIXI.Container implements Component {
  components: Component[] = [];
  id: string;
  removeChildren(beginIndex?: number, endIndex?: number): PIXI.DisplayObject[] {
    this.removeAllComponents();
    return super.removeChildren(beginIndex, endIndex);
  }

  removeAllComponents() {
    this.deactivate();
    this.components = [];
  }

  activate() {
    this.components.forEach(x => x.activate());
  }

  deactivate() {
    this.components.forEach(x => x.deactivate());
  }
  private boundingBox: PIXI.Graphics;

  showBoundingBox() {
    if (isPresent(this.boundingBox)) {
      this.boundingBox.destroy();
      this.removeChild(this.boundingBox);
    }
    let bounds = this.getBounding();
    this.boundingBox = graphics.border(bounds.width, bounds.height, 0x555, 5);
    this.addChild(this.boundingBox);
  }

  getBounding() {
    return this.getBounds();
  }

}

export type ActionHandler = (sender) => void;
