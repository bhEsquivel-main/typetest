import EventEmitter from "../util/eventEmitter";
import { LoadItems, Resource } from "./resource";
import * as PIXI from 'pixi.js'


export class ResourceManager extends EventEmitter {

    private resources: { [id: string]: Resource };
    private postLoading: boolean;
    private loaderHasError = false;
    private retryArr = [];
    private postResources: Resource[];


    constructor(public loader: PIXI.Loader = PIXI.Loader.shared) {
        super();
        this.postLoading = false;
        this.loader.on('progress', (_, data: PIXI.LoaderResource) => {
            const resource = this.resources[data.name];
            if (resource) {
                resource.loaded(data);
                this.emit("progress", resource);

            }
        });
        this.loader.on('complete', (_, resources) => {
            this.loader.reset();
            if (this.loaderHasError) {
                this.addResourceAgain();
                this.load();
            }
            else {
                this.emit("complete", this.postLoading);
                this.postLoading = false;
            }
        });
        this.loader.on('error', (err: Error, resource: PIXI.Loader) => {
            this.loaderHasError = true;
            this.retryArr.push(resource);
        })
        this.resources = {};
        this.postResources = [];

    }
    load() {
        this.loader.load();
    }
    postLoad() {
        if (this.loader.loading) return;
        if (this.postResources.length && !this.postLoading) {
            this.postResources.forEach((resource: Resource, i: number) => {
                this.add(resource);
            })
            this.postLoading = true;
            this.postResources = [];
            this.loader.load();
        }
    }

    add(resource: Resource, post?: boolean) {
        if (post) {
            this.postResources.push(resource);
            return;
        }
        resource.addTo(this.loader);
        this.resources[resource.id] = resource;
    }

    resource(name: string): Resource {
        return this.resources[name];
    }
    texture(name: string): PIXI.Texture {
        let r = this.resource(name);
        if (r) {
            return r.data.texture;
        }
        return undefined;
    }

    atlas(name: string): { [name: string]: PIXI.Texture } {
        let r = this.resources[name];
        if (r) {
            return (r.data as any).textures;
        }
        return undefined;
    }
    addResourceAgain() {
        this.retryArr.forEach(element => {
            this.loader.add(element.name, element.url);
        })
        this.retryArr = [];
        this.loaderHasError = false;
    }
    clear(global: boolean = false) {
        let res: Resource[] = [];
        for (let id in this.resources) {
            let r = this.resources[id];
            if (global || !r.global) {
                r.destroy(true);
                res.push(r);
            }
        }
        res.forEach((r, i, arr) => {
            delete this.resources[r.id];
        });
        res = null;
    }
    get progress() {
        return this.loader.progress;
    }

    get isPostLoading() {
        return this.postLoading;
    }


    //get resource loaded

    resolve(res: string) {
        let defaultValue = PIXI.Texture.EMPTY;
        if (!res || res.length === 0) {
            return defaultValue;
        }
        let params = res.split("/");
        switch (params[0]) {
            case "@img":
                return resolveImage(this, params);
            case "@atlas":
                return resolveTextureAtlas(this, params);
            default:
                return defaultValue;
        }
    }
}
function resolveImage(resources, params) {
    return resources.texture(params[1]) || PIXI.Texture.EMPTY;
}

function resolveTextureAtlas(resources, params) {
    let atlas = resources.atlas(params[1]);
    if (!atlas) {
        return [];
    }
    if (params.length === 2) {
        let textures = [];
        for (let key in atlas) {
            textures.push(atlas[key]);
        }
        return textures;
    } else {
        let extra = params[2];
        let textures = [];
        extra.split("|").forEach((name, i, arr) => {
            textures.push(atlas[name]);
        });
        return textures.length === 1 ? textures[0] : textures;
    }
}


export type ResourceFactory = { create(loadItem): Resource };

let registry: { [id: string]: ResourceFactory } = {
    "atlas": Resource,
    "img": Resource
};


export function create(loadItem: LoadItems): Resource {
    let factory = registry[loadItem.type];
    if (factory) {
        return factory.create(loadItem);
    }
    throw `not found the resource by ${loadItem.id}`;
}