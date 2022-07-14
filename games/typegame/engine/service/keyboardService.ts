import * as director from "../core/director";
import { Service } from "./service";
import { InputSource } from "../../engine/util/inputManager";

export class KeyBinding {
  key: any;
  command: string;
  when: string;
}

export const DEFAULT_KEYBOARD_COMMAND = "keyboard:default";
export class KeyboardService extends Service {
  private options: any[];
  private keybindings: KeyBinding[] = [];
  keys = [];



  constructor() {
    super();
    
    //default keyBinding
    this.keybindings.push(
      {key: "", command: DEFAULT_KEYBOARD_COMMAND, when: "main"});
  }

  private keyDownHandler(event) {
    if (event && event.key) {
      let key = event.key.toLowerCase();
      if (this.keys.indexOf(key) === -1)
        this.keys.push(key);
      
      let kb = this.getKeybinding();
      if (kb) director.inputManager.emit(kb.command, { source: InputSource.Keyboard, key: key });

    }
  }

  private keyUpHandler(event) {
    if (event && event.key) {
      let key = event.key.toLowerCase();
      let idx = this.keys.indexOf(key);
      let kb = this.getKeybinding();
      if (kb)
        director.inputManager.emit(kb.command+"_release", { source: InputSource.Keyboard, key: key });
      if (idx > -1)
        this.keys.splice(idx, 1);
    }
  }

  private getKeybinding(): KeyBinding {
    let defaultKb = this.keybindings[0]; // first entry

    for (let kb of this.keybindings) {
      if (kb.when !== director.sceneManager.current.id) continue;
      let res = true;
      if (this.keys.indexOf(kb.key) === -1) {
        res = false;
      }
      if (res)
        return kb;
      else 
       return defaultKb;
    }
    return undefined;
  }

  configure(options: any[]) {
    this.options = options;

    options.forEach(element => {
      this.keybindings.push({
        "key": element.key,
        "command": element.command,
        "when": element.when,
      }
      );
    });
  }


  startup() {
    window.addEventListener("keydown", (e) => this.keyDownHandler(e));
    window.addEventListener("keyup", (e) => this.keyUpHandler(e));
  }

  shutdown() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
    this.keybindings = [];
  }

}
