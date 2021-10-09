
import {isString} from "../native/typecheck.js";


/**
 * @param {Function} loader
 * @param  {Array<string>} url
 * @returns {Promise<any[]> | Promise<any>}
 */
const AbstractLoader = function (loader, url) {

    let promise = null;

    if (loader instanceof Function) {
        promise = (url.length > 1) ? Promise.all(url.map(path => loader(path))) : loader(url[0]);
    }

    return promise;
};

/**
 * @param {String} url
 *
 * @returns {Promise}
 */
const loadJSON = (url = null) => {

    if (!isString(url)) {
        return null;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    /** @type {RequestInit} */
    const options = {
        method: "GET",
        headers,
        mode: (url.includes("../")) ? "cors" : "same-origin"
    };

    if (!url.endsWith(".json")) {
        url = url + ".json";
    }

    const request = new Request(url);
    return fetch(request, options).then((response) => response.json());
};
/** @param  {...string} url */
export const JSONLoader = (...url) => AbstractLoader(loadJSON, url);

/** load image asynchronously
 *
 * @param {String} path
 *
 * @returns {Promise}
 */
const loadImage = (path) => {

    if (!isString(path)) {
        return null;
    }

    const img = new Image();
    img.src = path;
    return img.decode();
};
/** @param  {...string} url */
export const ImageLoader = (...url) => AbstractLoader(loadImage, url);
