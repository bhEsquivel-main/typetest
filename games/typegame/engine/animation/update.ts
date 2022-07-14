import { Animatable } from "./animatable";
import { LinkedList } from "../util/linkedList";

export class Update implements Animatable {
  private list: LinkedList = new LinkedList();

  advanceTime(elapsedFrames: number): boolean {
    this.list.forEach(anim => {
      anim.advanceTime(elapsedFrames);
    });
    return true;
  }

  add(animatable: Animatable) {
    this.list.push(animatable);
  }

  remove(animatable: Animatable) {
    this.list.remove(animatable);
  }

  contains(animatable: Animatable): boolean {
    return this.list.has(animatable);
  }

  clear() {
    this.list.clear();
  }
}
