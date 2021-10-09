
import {Container} from "./container.js";


const Pane = class extends Container {};

const RootPane = class extends Pane {

    constructor () {

        super("RootPane");

    }

};

export {Pane, RootPane};
