
import {appendToBody, disableContextMenu, setDocumentTitle} from "./basic.js";
import {Container} from "./container.js";
import {isString} from "../native/typecheck.js";


const AbstractApplication = class extends Container {

    /** @param {string} title */
    constructor (title = null) {

        super("Application");

        this.setTitle(title);

        if (isString(title)) {
            title = title.replace(/\s/g, "_");
        }

        this.addClass(title);

        appendToBody(this.tag);

    }

    /** @param {string} title */
    setTitle (title) {
        setDocumentTitle(title);
    }

    /** @param {boolean} enable */
    setContextMenuEnabled (enable = true) {
        if (!enable) {
            disableContextMenu();
        }
    }

};

export {AbstractApplication};
