export interface LoadItems {
    type: string;
    id: string;
    src: string;
}
export class Resource {

  data;

  constructor(public id: string, public src: string, public global: boolean = true) { }

  addTo(loader: PIXI.Loader) {
    loader.add(this.id, this.src);
  }

  loaded(data: PIXI.LoaderResource) {
    this.data = data;
  }

  destroy(destroyBase?: boolean) {
    if (this.data) {
      this.data.texture.destroy(destroyBase);
    }
  }
  static create(loadItem: LoadItems): Resource {
    return new Resource(loadItem.id,loadItem.src, true);
  }
}


//OTHER RESOURCES
//IF ANY AUDIO