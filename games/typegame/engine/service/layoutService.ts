import { Service } from "./service";
import { OrientationService } from "./orientationService";
import * as director from "../core/director";

export class LayoutService extends Service {

    private orientationService: OrientationService;
    private prevOrientation = 0;
    resizeAndOrientaionChecker: number;
    windowHeight: number;
    windowWidth: number;
    windowOrientation: number | string;

    configure(options) { }

    startup() {
        if (!director.services.has("orientationService")) {
            director.services.register("orientationService", OrientationService).startup();
        }
        this.orientationService = director.services.get<OrientationService>("orientationService");
        if (!this.orientationService.started) this.orientationService.startup();


        this.resizeAndOrientaionChecker = window.setInterval(() => {
            this.checkResize();
            this.checkSecondaryOrientation();
        }, 30);
        this.checkResize();
    }

    checkResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (this.windowHeight !== h || this.windowWidth !== w) {
            this.windowHeight = h;
            this.windowWidth = w;
            this.layout();
        }
    }

    checkSecondaryOrientation() {
        if (this.windowOrientation !== window.orientation) {
            this.windowOrientation = window.orientation;
            this.layout();
        }
    }

    shutdown() {
        clearInterval(this.resizeAndOrientaionChecker);
    }

    private layout() {
        let options = director.options;
        let minWidth = options.minWidth;
        let orignalWidth = options.width;
        let orignalHeight = options.height;
        let rotation = 0;
        let orientation = this.orientationService.getOrientation();
        orignalWidth = options.height;
        orignalHeight = options.width;

        let ratio = Math.min(window.innerWidth / (minWidth > 0 ? minWidth : orignalWidth), window.innerHeight / orignalHeight);
        let width = Math.ceil(orignalWidth * ratio);
        let height = Math.ceil(orignalHeight * ratio);

        director.stage.scale.set(ratio);
        director.stage.rotation = rotation;

        director.stage.position.set(0, 0);
        director.stage.pivot.set(0, 0);
      //  director.stage.position.set(width / 2, height / 2);

        director.renderer.resize(width, height);

        let canvas = options.canvas;
        canvas.style.marginLeft = ((window.innerWidth - width) / 2) + "px";
        canvas.style.marginTop = ((window.innerHeight - height) / 2) + "px";

        this.prevOrientation = orientation;
    }  
   

}
