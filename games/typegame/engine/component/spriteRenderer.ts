import * as director from "../core/director";
import { View } from "./component";
import * as PIXI from 'pixi.js'

export type SpriteSheetOption = {
    loop: number,
    blendMode: string,
    continuous: boolean,
    removeOnComplete: boolean,
};

export class SpriteRenderer extends View {

    animator: PIXI.AnimatedSprite;
    options: SpriteSheetOption;
    loop: number;
    currentFrame: number;

    constructor(textures: PIXI.Texture[], options: SpriteSheetOption) {
        super();
        this.options = options;
        this.animator = new PIXI.AnimatedSprite(textures);
        this.animator.loop = false;
        this.animator.pivot.set(0.5,0.5);
        this.animator.position.set(0,0);
        this.currentFrame = 0;
        this.setBlendMode(this.animator);
        this.addChild(this.animator);
    }

    activate() {
        super.activate();
        if (!this.options.continuous) this.currentFrame = 0;
        this.play(this.options.loop);
    }
    private setBlendMode(target) {
        if (this.options.blendMode) {
            if (this.options.blendMode === "screen") target.blendMode = PIXI.BLEND_MODES.SCREEN;
            else if (this.options.blendMode === "add") target.blendMode = PIXI.BLEND_MODES.ADD;
        }
    }

    play(loop: number = -1) {
        if (loop === 0) return;
        this.loop = loop;
        return new Promise((resolve, reject) => {
            this.animator.onComplete = this.makeCompleteHandler(resolve);
            this.animator.gotoAndPlay(this.currentFrame);
        });
    }
    playOnce() {
        return this.play(1);
    }
    private makeCompleteHandler(resolve) {
        return () => {
            if (this.loop === 1) {
                resolve();
                this.onComplete();
            } else if (this.loop === -1) {
                this.animator.gotoAndPlay(0);
            } else if (this.loop > 1) {
                this.loop--;
                this.animator.gotoAndPlay(0);
            }
        };
    }

    private onComplete() {
        if (this.options.removeOnComplete && this.parent)
            this.parent.removeChild(this);
    }

}