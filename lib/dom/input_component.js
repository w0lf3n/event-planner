
import {Component} from "./component.js";
import {isString} from "../native/typecheck.js";


const InputType = Object.freeze({
    CheckBox: "checkbox",
    RadioButton: "radio",
    Textarea: "textarea",
    TextField: "text",
    File: "file"
});

const InputComponent = class extends Component {

    /**
     * @param {string} type
     * @param {string} className
     */
    constructor (type, className = null) {

        if (isString(type) && type === InputType.Textarea) {
            super("textarea", className);
        } else if (Object.values(InputType).includes(type)) {
            super("input", className);
            this.setAttribute("type", type);
        } else {
            super(null);
        }

    }

    set value (value) {
        this.tag.value = String(value);
    }
    get value () {
        return this.tag.value;
    }

    set name (name) {
        if (isString(name)) {
            this.tag.name = name;
        }
    }
    get name () {
        return this.tag.name;
    }

    setOptions (options = {}) {
        //
    }

};

/*
const TextField = class extends InputComponent {

    constructor (text = null, className = null) {

        super(InputType.TextField, className);

        if (isString(text)) {
            this.value = text;
        }

    }

    set text (text) {
        if (isString(text)) {
            this.value = text;
        }
    }
    get text () {
        return this.value;
    }

};
*/

export {
    InputComponent,
    InputType
};
