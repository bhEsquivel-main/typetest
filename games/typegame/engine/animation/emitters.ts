import * as director from "../core/director";
import * as particles from "pixi-particles";
import { Animatable } from "./animatable";
import * as PIXI from 'pixi.js'

const SPEED: number = 0.001;

export class AnimatedEmitter implements Animatable {

    private emitter: particles.Emitter;
    private elapsed: number;

    constructor(private parent, assets, config, private speed = SPEED, framerate = 30){
		let container = new PIXI.Container();
		let textures = [{
			textures: assets,
			framerate: framerate,
			loop: true
		}];	
		this.emitter = new particles.Emitter(container, textures, config);
		this.emitter.particleConstructor = particles.AnimatedParticle;
		this.emitter.particleImages[0].textures = assets;
		this.emitter.particleImages[0].framerate = framerate;
		this.emitter.particleImages[0].loop = true;
		this.emitter.emit = false;
        container.position.y += 15;
		parent.addChild(container);
		director.updater.add(this);
    }

    show(level = 0,pos?) {
		if(!this.emitter) return;
        if (pos) this.updatePosition(pos);
		if(level > 0) {
			this.emitter.maxParticles = 100;
		}
        this.elapsed = Date.now();
        this.emitter.emit = true;
    }

    showOnce(callback?) {
		if(!this.emitter) return;
        this.elapsed = Date.now();
        this.emitter.emit = true;
        this.emitter.playOnceAndDestroy(callback);
    }

	stop() {
        this.emitter.emit = false;
	}
	updatePosition(position) {
		if(this.emitter) {
			this.emitter.updateOwnerPos(position.x, position.y);
		}
	}
	destroy() {
		director.updater.remove(this);
		this.emitter.destroy();
        this.emitter.cleanup();
		this.emitter = null;
		this.parent.removeChildren();
	}

    advanceTime(elapsedFrames: number): boolean {
		if(!this.emitter) return true;
        let now = Date.now();        
		this.emitter.update((now - this.elapsed) * this.speed);
        this.elapsed = now; 
        return true;
    }
}

export class SimpleEmitter implements Animatable {

    private emitter: particles.Emitter;
    private elapsed: number;

    constructor(private parent, textures, config, private speed = SPEED){
        if(director.renderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
            config.blendMode = "normal";
        }
		let container = new PIXI.Container();
		this.emitter = new particles.Emitter(container, textures, config);
		this.emitter.emit = false;
		parent.addChild(container);
		director.updater.add(this);
    }

    show(position?) {
		if(!this.emitter) return;
        this.elapsed = Date.now();
		this.emitter.update(this.elapsed * this.speed);
        this.emitter.emit = true;
    }
	stop() {        
		if(this.emitter) {
			this.emitter.emit = false;
		}
	}

	updatePosition(position) {
		if(this.emitter) {
            console.log(position);
			this.emitter.updateOwnerPos(position.x, position.y);
		}
	}

	destroy() {
		director.updater.remove(this);
		if(!this.emitter) return;
        this.emitter.emit = false;
        this.emitter.destroy();
        this.emitter.cleanup();
		this.emitter = null;
		this.parent.removeChildren();
    }
    
    pause() {
		if(!this.emitter) return;
        director.updater.remove(this);
    }
    
    resume() {
		if(!this.emitter) return;
        director.updater.add(this);
    }

    advanceTime(elapsedFrames: number): boolean {
		if(!this.emitter) return true;
        let now = Date.now();        
		this.emitter.update((now - this.elapsed) * this.speed);
        this.elapsed = now; 
        return true;
    }

	get emit(): boolean {
		return this.emitter && this.emitter.emit;
	}
}

export class ParticleEmitter implements Animatable {
	emitter: particles.Emitter;
    elapsed: number;
	
    constructor(private parent, textures, config, private xPos:number = 0, private yPos:number = 0){
        if(director.renderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
            config.blendMode = "normal";
        }
		let container = new PIXI.Container();
		this.emitter = new particles.Emitter(container, textures, config);
        this.emitter.emit = false;
        this.emitter.updateSpawnPos(this.xPos, this.yPos);
        this.setPosition(xPos, yPos);
		parent.addChild(container);
    }

    show(){        
        director.updater.add(this);
        this.elapsed = Date.now();
        this.emitter.emit = true;
    }

    hide() {
        this.emitter.emit = false;
    }

    setPosition(x, y) {
		this.xPos = x;
        this.yPos = y;
    }

    advanceTime(elapsedFrames: number): boolean {
        let now = Date.now();        
        this.emitter.update((now - this.elapsed) * 0.001);
        this.emitter.updateSpawnPos(this.xPos, this.yPos);
        this.elapsed = now; 
        return true;
    }

    destroy(){
        director.updater.remove(this);
        this.emitter.emit = false;
        this.emitter.destroy();
        this.emitter.cleanup();
		this.emitter = null;
    }
}