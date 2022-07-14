import * as TWEEN from "@tweenjs/tween.js";

export function fadeIn(object: any, duration: number, callback?: Function, maxAlpha: number = 1) {
    object.alpha = 0;
    return create(object, { alpha: 0 }, { alpha: maxAlpha }, duration, callback)
}

export function fadeOut(object: any, duration: number, callback?: Function, maxAlpha: number = 1) {
    object.alpha = 1;
    return create(object, { alpha: maxAlpha }, { alpha: 0 }, duration, callback)
}
export function zoomOut(object: any, initScale, targetScale, duration: number, callback?, easing = TWEEN.Easing.Linear.None) {
    let tween = createBasic(object, { scale: initScale }, { scale: targetScale }, duration, callback, easing);
    tween.start();
    return tween;
}
export function zoomInOut(object: any, initScale, targetScale, duration: number, callback?, easing = TWEEN.Easing.Linear.None) {
    let tween1 = createBasic(object, { scale: initScale }, { scale: targetScale }, duration, null, easing);
    let tween2 = createBasic(object, { scale: targetScale }, { scale: initScale }, duration, callback, easing);
    tween1.chain(tween2);
    tween1.start();
    return tween1;
}

// added this to just create a tween without playing it by default
export function createBasic(object: any, fromProp: any, toProp: any, duration: number, callback?: Function, easing = TWEEN.Easing.Linear.None) {
    let properties = fromProp;
    
    let tween = new TWEEN.Tween(properties)
    .to(toProp, duration)
    .onUpdate(() => {
        for (let key in fromProp) {
            if (key === "scale") {
                object.scale.x = object.scale.y = properties[key];
            }
            else {
                object[key] = properties[key];
            }
        }
    })
    .easing(easing)
    .onComplete(() => {
        if (callback) callback();
    });

    return tween;
}

export function create(object: any, fromProp: any, toProp: any, duration: number, callback?: Function, easing = TWEEN.Easing.Linear.None) {
    let tween = createBasic(object, fromProp, toProp, duration, callback, easing);
    tween.start();
    return tween;
}
