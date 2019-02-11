/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */


import * as mwfUtils from "../../lib/js/mwf/mwfUtils.js";
import * as EntityManager from "../../lib/js/mwf/crud/mwfEntityManager.js";

/*************
 * example entity
 *************/

class MyEntity extends EntityManager.Entity {

    constructor() {
        super();
    }

}

// TODO-REPEATED: add new entity type declarations here


// TODO-REPEATED: do not forget to export all type declarations
export {
    MyEntity
};

