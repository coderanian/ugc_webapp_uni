/**
 * Created by master on 17.02.16.
 */
define(["mwf", "mwfUtils", "EntityManager", "entities", "GenericCRUDImplLocal", "GenericCRUDImplRemote"], function (mwf, mwfUtils, EntityManager, entities, GenericCRUDImplLocal, GenericCRUDImplRemote) {

    class MyApplication extends mwf.Application {

        constructor() {
            super();
        }

        oncreate(callback) {
            console.log("MyApplication.oncreate(): calling supertype oncreate");

            // first call the supertype method and pass a callback
            super.oncreate(() => {

                // initialise the local database
                // TODO-REPEATED: add new entity types to the array of object store names
                GenericCRUDImplLocal.initialiseDB("mwftutdb", 1, ["MyEntity"], (() => {

                    //// TODO-REPEATED: if entity manager is used, register entities and crud operations for the entity types
                    //this.registerEntity("MyEntity", entities.MyEntity, true);
                    //this.registerCRUD("MyEntity", this.CRUDOPS.LOCAL, GenericCRUDImplLocal.newInstance("MyEntity"));
                    //this.registerCRUD("MyEntity", this.CRUDOPS.REMOTE, GenericCRUDImplRemote.newInstance("MyEntity"));

                    // TODO: do any further application specific initialisations here

                    // THIS MUST NOT BE FORGOTTEN: initialise the entity manager!
                    EntityManager.initialise();

                    // do not forget to call the callback
                    callback();
                }));

            });

        };

    }

    return new MyApplication();

});