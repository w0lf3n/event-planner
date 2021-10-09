
import {AbstractTextComponent} from "./abstract_textcomponent.js";


export const TextComponent = class extends AbstractTextComponent {

    /**
     * @param {string} text
     * @param {string} className
     */
    constructor (text = null, className = null) {
        super("span", className);
        this.text = text;
    }

};
