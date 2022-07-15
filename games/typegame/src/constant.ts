import * as director from "../engine/core/director";


export function effect_textures(): any[] {
	let textures: any[] = [];
    textures.push(director.resourceManager.resolve("@atlas/animAtlas/blue.png"));
    textures.push(director.resourceManager.resolve("@atlas/animAtlas/green.png"));
    return textures;
}


export function spritesheet_textures(): any[] {
	let textures: any[] = [];
    for (let i : number = 1; i <= 19; i++) 
    {
        let numName = i  < 10 ? "000" : "00";
        textures.push(director.resourceManager.resolve("@atlas/circleAtlas/circle_"+numName + i+".png"));
    }
    return textures;
}

export const effect_config = {
          
    "alpha": {
    "start": 1,
    "end": .5
    },
    "scale": {
    "start": 1.6,
    "end": 0.6,
    "minimumScaleMultiplier": 1
    },
    "color": {
    "start": "#ffffff",
    "end": "#ffffff"
    },
    "speed": {
    "start": 300,
    "end": 20,
    "minimumSpeedMultiplier": 0.5
    },
    "acceleration": {
    "x": 20,
    "y": 20
    },
    "maxSpeed": 0,
    "startRotation": {
    "min": 0,
    "max": 360
    },
    "noRotation": true,
    "rotationSpeed": {
    "min": 0,
    "max": 360
    },
    "lifetime": {
    "min": 0.1,
    "max": 0.3
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": 0.21,
    "maxParticles": 30,
    "pos": {
    "x": 0,
    "y": 0
    },
    "addAtBack": false,
    "spawnType": "burst",
    "particlesPerWave": 1,
    "particleSpacing": 0,
    "angleStart": 0
};


export const circleSS_option = {
    loop: -1,
    blendMode: "screen",
    continuous: false,
    removeOnComplete: true,
}