
import {Pane, RootPane} from "./pane.js";
import {AbstractApplication} from "./abstract_application.js";


const Application = class extends AbstractApplication {

    /**
     * @param {string} title
     * @param {Object} options
     */
    constructor (title = null, options) {

        super(title);

        this.setOptions(options);
        this.rootPane = new RootPane();
        this.addPane(this.rootPane);

    }

    /** @param {Object} options */
    setOptions (options) {

        if (options instanceof Object) {
            //
        }

    }

    /** @param {Pane} pane */
    addPane (pane) {
        if (pane instanceof Pane) {
            pane.addClass("Maximize");
            super.addComponent(pane);
        }
    }

    /** calls Application.addPane(), so use that method instead
     *
     * @override
     *
     * @param {Pane} pane
    */
    addComponent (pane) {
        this.addPane(pane);
    }

    /**
     * @override
     *
     * @param {Array<Pane>} panes
    */
    append (...panes) {
        if (panes instanceof Array) {
            panes.forEach(pane => this.addPane(pane));
        }
    }

    /** @param {Component} component */
    addToRootPane (component) {
        this.rootPane.addComponent(component);
    }

    getRootPane () {
        return this.rootPane;
    }

    // TODO add/set color scheme

};

export {Application};
