
import * as Lang from "../lib/res/lang.js";
import * as Storage from "../lib/res/storage.js";
import {EventType, isNumber, isString} from "../lib/native/typecheck.js";
import {Table, TableCell, TableHeader, TableRow} from "../lib/dom/table.js";
import {Application} from "../lib/dom/application.js";
import {Container} from "../lib/dom/container.js";
import {JSONLoader} from "../lib/res/loaders.js";
import {TextComponent} from "../lib/dom/textcomponent.js";


const APP_TITLE = "Event Planner";
const STORAGE_ID_INIT = "init";
const DEFAULT_START_DATE = `${new Date().getFullYear()}-01-01`;

const app = new Application(APP_TITLE);

const Calendar = (function () {

    let startDate = null;
    let numberOfMonths = 12;

    let state = null;
    let region = null;

    let holidayDates = {};
    let freeDayDates = [];

    let days = [];
    let updates = [];

    let skipSaturday = true;
    let skipSunday = true;
    let skipHoliday = true;
    let skipFreeDay = true;

    /** @type {Container} */
    let container = null;


    const isSaturday = (date) => (date instanceof Date) ? date.getDay() === 6 : false;
    const isSunday = (date) => (date instanceof Date) ? date.getDay() === 0 : false;
    const isHoliday = (date) => (date instanceof Date) ? Object.values(holidayDates).includes(date.valueOf()) : false;
    const isFreeDay = (date) => (date instanceof Date) ? freeDayDates.includes(date.valueOf()) : false;

    const core = {};

    core.init = function () {

        container = new Container("Calendar");
        container.addEventListener(EventType.click, (event) => {
            if (event.target.className.includes("Day")) {
                console.log(event.target);
            }
        });
    };

    core.setStartDate = function (dateString) {
        startDate = new Date((isString(dateString)) ? dateString : DEFAULT_START_DATE);
    };

    core.setHolidayDates = function (dataObject) {
        if (dataObject instanceof Object) {

            Object.values(dataObject.constant).forEach(holiday => {
                holidayDates[holiday.id] = new Date(`${year}-${holiday.M}-${holiday.D}`).valueOf();
            });

            Object.values(dataObject.changing[String(year)]).forEach(holiday => {
                // console.log(holiday.id, new Date(`${year}-${holiday.M}-${holiday.D}`).valueOf());
                holidayDates[holiday.id] = new Date(`${year}-${holiday.M}-${holiday.D}`).valueOf();
            });

        }
    };

    core.setFreeDayDates = function (...dates) {
        dates.forEach(date => freeDayDates.push(new Date(date).valueOf()));
    };

    core.draw = function () {

        container.clear();

        // const title = new TextComponent(`${Lang.getWord("calendar")} ${year}`, "Title");
        const title = new TextComponent(Lang.getWord("calendar"), "Title");
        const table = new Table();
        container.append(title, table);

        const headerRow = new TableRow();
        table.addComponent(headerRow);

        const start = startDate.getMonth();
        const end = start + numberOfMonths;
        let currentYear = startDate.getFullYear();

        for (let counter = start; counter < end; counter = counter + 1) {

            const month = counter % 12;
            if (counter > 0 && month === 0) {
                currentYear = currentYear + 1;
            }

            const date = new Date(currentYear, month, 1);
            const name = Lang.formatDate(date, {month: "short"});

            const header = new TableHeader();
            header.setAttribute("scope", "col");
            header.text = name;

            headerRow.addComponent(header);

        }

        currentYear = startDate.getFullYear();
        for (let day = 1; day < 32; day = day + 1) {

            const row = new TableRow();
            table.addComponent(row);

            for (let month = start; month < end; month = month + 1) {

                const cell = new TableCell("Day");
                row.addComponent(cell);

                if (month > 0 && month % 12 === 0) {
                    currentYear = currentYear + 1;
                }
                month = month % 12;

                const date = new Date(currentYear + "-" + (month + 1) + "-" + day);
                if (date.getMonth() === month) {

                    if (isHoliday(date)) {
                        cell.addClass("Holiday");
                    } else if (isFreeDay(date)) {
                        cell.addClass("FreeDay");
                    } else if (isSaturday(date)) {
                        cell.addClass("Saturday");
                    } else if (isSunday(date)) {
                        cell.addClass("Sunday");
                    }

                    days.push({cell, date});

                    cell.addComponent(new TextComponent(
                        `${day} ${Lang.formatDate(date, {weekday: "short"})}`,
                        "Date"
                    ));

                }
            }
        }

        days.sort((a, b) => a.date > b.date);

    };

    core.getContainer = () => container;

    // FOR DEVELOPMENT ONLY
    core.calcEventPeriod = function (dateString, lengthInDays) {

        const start = new Date(dateString);
        const index = days.findIndex(obj => start.valueOf() === obj.date.valueOf());

        for (let i = index, dayOfEvent = 0, stop = i + lengthInDays; i < stop; i = i + 1) {

            const currentDay = days[i];
            dayOfEvent = dayOfEvent + 1;

            if (isSaturday(currentDay.date) || isSunday(currentDay.date) || isHoliday(currentDay.date) || isFreeDay(currentDay.date)) {
                dayOfEvent = dayOfEvent - 1;
                stop = stop + 1;
            } else {
                currentDay.cell.setStyle("background-color", "#00ffff");
                currentDay.cell.addComponent(new TextComponent(String(dayOfEvent), "Text"));
            }

        }

    };

    return Object.freeze(core);

})();

const InputForm = (function () {

    /** @type {Container} */
    let container = null;

    const core = {};

    core.init = function () {

        container = new Container("InputForm");

    };

    core.getContainer = () => container;

    return Object.freeze(core);

})();

const Output = (function () {

    /** @type {Container} */
    let container = null;

    const core = {};

    core.init = function () {

        container = new Container("Output");

    };

    core.getContainer = () => container;

    return Object.freeze(core);

})();

const setup = function () {

    const initValues = Storage.load(STORAGE_ID_INIT) || {};

    Lang.setLocale(initValues.locale || "de-DE");

    Calendar.init();
    Calendar.setStartDate(initValues.startDate);
    // Calendar.setNumberOfMonths(12);
    InputForm.init();
    Output.init();

};

const createUI = function () {

    const main = new Container("Main Maximize");
    app.addToRootPane(main);
    main.append(
        new TextComponent(APP_TITLE, "Title"),
        InputForm.getContainer(),
        Calendar.getContainer(),
        Output.getContainer(),
        new TextComponent("", "Copyright")
    );
};

setup();
JSONLoader(
    `dat/holidays_region_${Lang.getRegion()}.json`,
    `dat/holidays_language_${Lang.getLanguage()}.json`,
    `dat/language_${Lang.getLanguage()}.json`
).then(data => {

    Calendar.setStartDate("2023-07-01");
    // Calendar.setHolidayDates(data[0]);
    // Calendar.setFreeDayDates("2023-05-19", "2023-10-02", "2023-10-30");

    Lang.addLanguagePack(data[1]);
    Lang.addLanguagePack(data[2]);

    createUI();

    Calendar.draw();

    // Calendar.calcEventPeriod("2023-08-15", 80);
    // Calendar.update();

});

/*
    design goals

        event start to end date -> calculate how many days minus (if selected)
            - weekends (default saturday and sunday are checked -> checkbox)
            - holidays(legal=gesetzlich) (default checked -> checkbox)
            - also additional holidays(periods) (for each addiditonal holiday add start and end name and description -> "mini form")
            - add additional days(free days) -> button "add free day" -> click on calendar -> add to list(show in text field)
            (if additional holidays/free days overlay legal holidays dont count)

        calculate how many total
            - set time unit (by default 60min = 1hour) -> possible to set also 45min = "teaching units"
            - set number of units per day (default 8)
            - set total minutes of breaks a day default 1hour=60min

        optional set goal of event number of days or number of total units

        optional show if not enough space for goal
            -> tweak days or units
            -> optional set default behaviour if goals not met, like add more days, raise number of units

    test 4.oktober 2021 - 17.märz 2022
    goal 704 units, 1 unit = 45min
    additional holidays 17.12.2021 - 09.01.2022
*/
