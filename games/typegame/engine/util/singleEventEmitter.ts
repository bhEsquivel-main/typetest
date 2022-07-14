import EventEmitter from "./eventEmitter";


export class SingleEventEmitter extends EventEmitter {

  on(event: string, fn: Function, context?: any) {
    this.off(event);
    return super.on(event, fn, context);
  }
  
}
