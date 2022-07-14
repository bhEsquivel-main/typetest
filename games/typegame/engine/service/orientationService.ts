import { Orientation } from "../../engine/util/types";
import { Service } from "./service";


export class OrientationService extends Service {
    public mode: string;
    public started: boolean = false;

    getOrientation(): Orientation {
        if (window.innerHeight <= window.innerWidth) {
            return Orientation.LANDSCAPE;
        } else {
            return Orientation.PORTRAIT;
        }
    }

    get isPortrait() {
        return this.getOrientation() === Orientation.PORTRAIT;
    }

    get isLandscape() {
        return this.getOrientation() === Orientation.LANDSCAPE;
    }

    configure(options) { }

    startup() {
        this.mode = "landscape";
        this.started = true;
    }


}
