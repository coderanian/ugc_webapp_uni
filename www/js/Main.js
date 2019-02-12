/**
 * Created by master on 11.02.19
 *
 * this module replaces the requirejs based management of module and
 * dependency management employing es6 modules in the following way:
 * - all application specific module implementations are explicitly imported here
 * and will be published by this module
 * - all dependencies among application modules are resolved via this module
 * - this way, only Main.js needs to be aware of the actual implementations of
 * of modules, whereas the modules themselves are agnostic with respect to the
 * implementation of their dependencies
 * - in the same way, all dependencies to framework modules are resolved
 * via the framework-modules module, which abstracts away from concrete implementations
 * on its part
 * - additionally, this module will be imported by the main framework implementation
 * (the mwf module), from which the latter obtains all resources that
 * are dynamically instantiated at runtime
 */

// import the framework
import {mwf} from "../lib/js/framework-modules.js";
import {mwfUtils} from "../lib/js/framework-modules.js";
import {EntityManager} from "../lib/js/framework-modules.js";
import {GenericCRUDImplLocal} from "../lib/js/framework-modules.js";
import {GenericCRUDImplRemote} from "../lib/js/framework-modules.js";

// import generic application components
import {GenericDialogTemplateViewController} from "../lib/js/framework-modules.js";
/* TODO: only include the mapHolder if maps are actually used. Do not forget to export it below */
// import {mapHolder} from "../lib/js/framework-modules.js";

/* application libraries: the main application class */
import MyApplication from "./MyApplication.js";
/* application libraries: model */
import * as entities from "./model/MyEntities.js";
/* application libraries: view controllers */
import MyInitialViewController from "./controller/MyInitialViewController.js";
// TODO-REPEATED: import any further view controllers here


// we export the framework modules required by the application and the application modules required by the framework
export {
    /* framework modules */
    mwf,
    mwfUtils,
    EntityManager,
    GenericCRUDImplLocal,
    GenericCRUDImplRemote,
    GenericDialogTemplateViewController,
    /* TODO: export the mapHolder in case it is used by the application */
    // mapHolder,
    /* application modules */
    MyApplication,
    entities,
    MyInitialViewController,
    // TODO-REPEATED: export any further view controllers here
}

// then start the application
window.onload = () => {
    mwf.onloadApplication();
}
