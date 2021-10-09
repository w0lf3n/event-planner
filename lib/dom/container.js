
import {AbstractContainer} from "./abstract_container.js";


const Layout = Object.freeze({
    FLEX: "flex",
    GRID: "grid"
});

const Container = class extends AbstractContainer {

    /** @param {string} className */
    constructor (className = null) {

        super("div", className);

    }

};

export {Container, Layout};
