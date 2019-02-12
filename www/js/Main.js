/**
 * Created by master on 11.02.19
 *
 * the purpose of this module is to bundle all application resources that are
 * dynamically loaded by the framework, and to initialise the framework
 */

// import the framework
import * as mwf from "../lib/js/mwf/mwf.js";

// import the generic dialog controller
import GenericDialogTemplateViewController from "../../lib/js/mwf/controller/mwfGenericDialogTemplateViewController.js";

/* application libraries: the main application class */
import MyApplication from "./MyApplication.js";
/* application libraries: model */
import * as entities from "./model/MyEntities.js";
/* application libraries: view controllers */
import MyInitialViewController from "./controller/MyInitialViewController.js";
// TODO-REPEATED: import any further view controllers here


export {
    GenericDialogTemplateViewController,
    MyApplication,
    entities,
    MyInitialViewController
    // TODO-REPEATED: export any further view controllers here
}

// then start the application
window.onload = () => {
    mwf.onloadApplication();
}
