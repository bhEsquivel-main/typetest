import { View } from "../component/component";
import * as director from "./director";
import { LoadItems, Resource } from "./resource";
import * as resources from "./resourceManager";

export abstract class State<T extends Scene> {
    scene: T;
    abstract enter();
    abstract exit();
}


export class Scene extends View {

    id: string;
    transitions: string;
    next: Scene;
    resourceArray: LoadItems[];
    state: { enter(); exit(); scene; };

    constructor() {
        super();
        this.visible = false;
    }

    enter(args?: any) {
        if (this.resourceArray && this.resourceArray.length > 0) {
            this.loadResources();
        }
        this.create(args);
    }

    exit() {
        this.removeChildren();
    }
    protected transit() {
        changeScene(this.transitions)(this.next);
    }
    setState(state: { enter(): void; exit(): void; scene: Scene; }) {
        state.scene = this;
        if (this.state) {
          this.state.exit();
        }
        this.state = state;
        this.state.enter();
      }
    private create(args?: any) {
        let scene = this;
        this.onCreated(args);
      }
    
    protected onCreated(args?: any) { }

    private loadResources() {
        let res = director.resourceManager;
        this.resourceArray.forEach(element => {
            let resource: Resource = resources.create(element)
            res.add(resource, false);
        });

        res.on("progress", (x: any, p: boolean) => {
            if (p) director.sceneManager.current.onPostResourcesProgress(x);
            else this.onProgress(x);
        });
        res.on("complete", (p: boolean) => {
            if (p) director.sceneManager.current.onPostResourcesLoaded();
            else this.onLoaded();
        });
        res.load();
    }

    onPostResourcesProgress(x) { }
    onPostResourcesLoaded() { this.removeResourcesListeners(); }
    protected onProgress(resource: Resource) { }
    protected onLoaded() {
        director.resourceManager.postLoad();
    }
    private removeResourcesListeners() {
        director.resourceManager.removeAllListeners();
        director.resourceManager.clear();
    }
}


export function changeScene(params: String):any
{
    let args = params? params.split(",") : null;

    return (next: Scene) => { 
        director.sceneManager.replace(next);
    }
}