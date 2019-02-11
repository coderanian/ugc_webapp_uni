/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */


import * as mwfUtils from "../../lib/js/mwf/mwfUtils";
import * as EntityManager from "../../lib/js/mwf/crud/mwfEntityManager";

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
return {
    MyEntity: MyEntity
};

