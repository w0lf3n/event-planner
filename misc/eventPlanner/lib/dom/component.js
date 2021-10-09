
import {create, isUnique} from "./basic.js";
import {isEventType, isFunction, isString} from "../native/typecheck.js";
import {AbstractContainer} from "./abstract_container.js";


const Component = class {

    /**
     * @param {string} tagName
     * @param {string} className
     */
    constructor (tagName, className = null) {

        this.tag = create(tagName, className);
        // this.tag.class = this;

        this.saveLastDisplay = null;

    }

    /** @param {string} className */
    addClass (className) {
        if (isString(className)) {
            this.tag.classList.add(className);
        }
    }
    /** @param {string} className */
    removeClass (className = null) {
        if (isString(className)) {
            this.tag.classList.remove(className);
        } else if (className === null) {
            this.tag.className = "";
        }
    }
    /** @param {string} className */
    hasClass (className) {
        return (isString(className)) ? this.tag.classList.contains(className) : false;
    }

    getHTMLElement () {
        return this.tag;
    }

    /** @param {AbstractContainer} container */
    set parent (container) {
        if (container instanceof AbstractContainer) {
            this.parentContainer = container;
        }
    }
    get parent () {
        return this.parentContainer;
    }

    /**
     * @param {string} type
     * @param {EventListener} listener
     */
    addEventListener (type, listener) {
        if (isEventType(type) && isFunction(listener)) {
            this.tag.addEventListener(type, listener);
        }
    }

    // removeEventListener

    set id (id) {
        if (isUnique(id)) {
            this.tag.id = id;
        }
    }
    get id () {
        return this.tag.id;
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    setStyle (key, value) {
        if (isString(key) && isString(value, true)) {
            if (this.tag.style[key] !== undefined) {
                this.tag.style[key] = value;
            }
        }
    }
    /** @param {string} key */
    getStyle (key) {
        return (isString(key) && this.tag.style[key] !== undefined) ? this.tag.style[key] : "";
    }

    /**
     * @param {boolean} overrideDefault
     */
    show (overrideDefault = false) {
        let val = "";
        if (this.saveLastDisplay) {
            val = this.saveLastDisplay;
        }
        if (overrideDefault) {
            val = "block";
        }
        this.setStyle("display", val);
    }
    hide () {
        this.saveLastDisplay = this.tag.style.display;
        this.setStyle("display", "none");
    }

    remove () {
        this.tag.remove();
    }

    /** Returns the offset position in pixels to the nearest parent.
     *
     * @returns {{x: number, y: number}}
     */
    getOffsetPosition () {
        return {x: this.tag.offsetLeft, y: this.tag.offsetTop};
    }

    getOffsetSize () {
        return {width: this.tag.offsetWidth, height: this.tag.offsetHeight};
    }

    /** @returns {DOMRect} */
    getBounds () {
        return this.tag.getBoundingClientRect();
    }

    setAttribute (key, value = "") {
        if (isString(key)) {
            this.tag.setAttribute(key, value);
        }
    }

    // getAttribute

};

export {Component};
