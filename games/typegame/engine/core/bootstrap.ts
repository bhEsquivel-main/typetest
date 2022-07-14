import * as director from "./director";
import { LayoutService } from "../service/layoutService";


export function bootstrap(context?) {
    director.initialize(context)
    .then(() => {
        director.services.register("layoutservice", new LayoutService());
        director.run();

    })
    .catch(e => {
      alert(e);
    });
}