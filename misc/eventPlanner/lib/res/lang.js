
import {Cache} from "./cache.js";
import {isString} from "../native/typecheck.js";


const BASE = "base";

const cache = new Cache();

let locale = {};

/**
 * @param {Object} data
 * @param {string} id
 */
const addLanguagePack = function (data, id = null) {
    if (data instanceof Object) {
        cache.setItem(id || BASE, data);
    }
};

const removeLanguagePack = function (id = null) {
    cache.deleteItem(id || BASE);
};

const setLocale = function (tag, options = {}) {
    if (isString(tag)) {
        locale = new Intl.Locale(tag, options);
    }
};

const formatDate = (date, options = {}) => new Intl.DateTimeFormat(locale, options).format(date);

const getLanguage = () => locale.language || null;

const getRegion = () => locale.region || null;

const getWord = (wordId, id = null) => cache.getItem(id || BASE)[wordId];


export {addLanguagePack, formatDate, getLanguage, getRegion, getWord, removeLanguagePack, setLocale};
