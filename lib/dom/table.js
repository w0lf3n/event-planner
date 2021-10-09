
import {AbstractContainer} from "./abstract_container.js";
import {AbstractTextComponent} from "./abstract_textcomponent.js";


const Table = class extends AbstractContainer {

    constructor (className = null) {
        super("table", className);
    }

};

const TableRow = class extends AbstractContainer {

    constructor (className = null) {
        super("tr", className);
    }
};

const TableHeader = class extends AbstractTextComponent {

    constructor (className = null) {
        super("th", className);
    }
};

const TableCell = class extends AbstractContainer {

    constructor (className = null) {
        super("td", className);
    }
};

export {Table, TableCell, TableHeader, TableRow};
