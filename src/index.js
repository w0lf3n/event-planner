
import * as Lang from "../lib/res/lang.js";

import {Application} from "../lib/dom/application.js";
import {Container} from "../lib/dom/container.js";
import {JSONLoader} from "../lib/res/loaders.js";


const app = new Application("Event Planner");


const autoLoadLanguage = function () {

    const availableLanguages = ["en", "de"];

    // get language used by browser
    let browserLanguage = navigator.language;
    // load language pack if available
    
    // check

    JSONLoader("langauge_%LANG%.json".replace(/%LANG%/, availLangPack))
        .then(data => {
            Lang.addLanguagePack(data);
        });

};


// create start window
const welcomeScreen = new Container("Welcome");
// add title
welcomeScreen
// add options language and location
// navigator.language -> use for country as well as defaults
// add options for calendar range, 1st of current month is start and size is 6 month by default
