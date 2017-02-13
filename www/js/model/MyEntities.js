/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */

/*
 * a global counter for ids
 */
define(["mwfUtils", "EntityManager"], function (mwfUtils, EntityManager) {


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

});
