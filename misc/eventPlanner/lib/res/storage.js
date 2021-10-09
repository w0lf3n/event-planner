
import {hasProperty, isString} from "../native/typecheck.js";


const errors = [];

/**
 * @param {string} key
 *
 * @returns {boolean}
 */
const has = (key) => isString(key) && hasProperty(localStorage, key);

/**
 * @param {string} key
 * @param {Object} data
 * @param {boolean} update default = false, if set to true, it will update the existing item
 *
 * @returns {boolean} result of operation, true = successful, false = failed
 */
const save = function (key, data, update = false) {

    let success = false;

    if (isString(data)) {

        let item = null;

        // eslint-disable-next-line no-restricted-syntax
        try {
            item = JSON.parse(data);
        } catch (e) {
            errors.push(e);
        }

        if (item && ((has(key) && update) || !has(key))) {
            localStorage.setItem(key, JSON.parse(data));
            success = true;
        }

    }

    return success;

};

/** loads a data string (JSON) from localStorage and transforms it into an object via JSON.stringify
 *
 * @param {string} key
 *
 * @returns {Object}
 */
const load = function (key) {

    let data = null;

    if (has(key)) {
        const item = localStorage.getItem(key);
        if (isString(item)) {
            data = JSON.stringify(item);
        }
    }

    return data;
};

const remove = function (key) {
    if (has(key)) {
        localStorage.removeItem(key);
    }
};

const clear = localStorage.clear;

const getErrors = () => errors.splice(0);


export {clear, getErrors, has, load, remove, save};
