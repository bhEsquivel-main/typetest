import * as PIXI from 'pixi.js'

export function border(width: number, height: number, color: number = 0x0, thickness: number = 1) {
    let g = new PIXI.Graphics();
    g.lineStyle(thickness, color);
    g.drawRect(0, 0, width, height);
    return g;
}

export function rectangle(width: number, height: number, color: number = 0x0) {
    let rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(0, 0, width, height);
    rect.endFill();
    return rect;
  }