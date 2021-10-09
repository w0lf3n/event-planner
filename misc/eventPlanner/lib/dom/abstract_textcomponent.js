
import {Component} from "./component.js";
import {isString} from "../native/typecheck.js";


const AbstractTextComponent = class extends Component {

    /** @param {string} text */
    set text (text) {
        if (isString(text, true)) {
            this.tag.textContent = text;
        }
    }

    get text () {
        return this.tag.textContent;
    }

};


export {AbstractTextComponent};
