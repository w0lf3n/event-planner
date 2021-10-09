
import {isBoolean, isString} from "../native/typecheck.js";


/**
 * @param {string} id
 *
 * @returns {boolean}
 */
const isUnique = (id) => (isString(id) && !document.getElementById(id));

/**
 * @param {HTMLElement} target
 * @param {Object} options
 * @param {Array<string>} allowedAttributes
 */
const setAttributesFromOptions = function (target, options, allowedAttributes) {
    if (target instanceof HTMLElement && options instanceof Object && allowedAttributes instanceof Array) {
        for (const attr in options) {
            if (allowedAttributes.includes(attr) && isBoolean(options[attr])) {
                target.setAttribute(attr, options[attr]);
                target[attr] = options[attr];
            }
        }
    }
};

/** shortened method to create DOM elements
 *
 * @param  {string} tagName
 * @param  {string} className
 *
 * @returns {HTMLElement}
 */
const create = (tagName, className = null) => {

    let obj = null;

    if (isString(tagName)) {

        // make sure tagName is in correct writing to match checks
        tagName = tagName.toLowerCase();
        obj = document.createElement(tagName);

        if (isString(className)) {
            obj.className = className;
        }

    }

    return obj;
};

/**
 * @param {HTMLElement} elementToAdd
 * @param {boolean} clearInnerHTML
 */
const appendToBody = (elementToAdd = null, clearInnerHTML = false) => {
    if (elementToAdd instanceof HTMLElement) {
        if (clearInnerHTML) {
            // clear document
            document.body.innerHTML = "";
        }
        document.body.appendChild(elementToAdd);
    }
};

const insertStyleSheet = function (path) {
    document.styleSheets[0].insertRule(`@import url(${path})`, 0);
};

/**
 * @param {string} title
 */
const setDocumentTitle = (title = null) => {
    if (isString(title)) {
        document.title = title;
    }
};

const disableContextMenu = () => {
    // eslint-disable-next-line no-console
    console.warn("contet menu is disabled");
    document.addEventListener("contextmenu", (event) => {
        event.stopPropagation();
        event.preventDefault();
    });
};

const toggleFullScreen = function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};


export {
    appendToBody,
    create,
    disableContextMenu,
    insertStyleSheet,
    isUnique,
    setAttributesFromOptions,
    setDocumentTitle,
    toggleFullScreen
};
