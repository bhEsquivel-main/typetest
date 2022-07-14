import EventEmitter from "./eventEmitter";

export enum InputSource {
  Mouse, Keyboard, None
}

export class InputManager extends EventEmitter {

  emit(str: string, args?): boolean {
    return super.emit(str, args);
  }
}
