/**
 * Created by master on 17.02.16.
 */
import {mwf} from "./Main.js";
import {mwfUtils} from "./Main.js";
import {EntityManager} from "./Main.js";
import {GenericCRUDImplLocal} from "./Main.js";
import {GenericCRUDImplRemote} from "./Main.js";
import {entities} from "./Main.js";

class MyApplication extends mwf.Application {

    constructor() {
        super();
    }

    async oncreate() {
        console.log("MyApplication.oncreate(): calling supertype oncreate");

        // first call the supertype method and pass a callback
        await super.oncreate();

        console.log("MyApplication.oncreate(): initialising local database");
        // initialise the local database
        // TODO-REPEATED: add new entity types to the array of object store names
        await GenericCRUDImplLocal.initialiseDB("mwftutdb", 1, ["MyEntity"]);

        console.log("MyApplication.oncreate(): local database initialised");

        //// TODO-REPEATED: if entity manager is used, register entities and crud operations for the entity types
        //this.registerEntity("MyEntity", entities.MyEntity, true);
        //this.registerCRUD("MyEntity", this.CRUDOPS.LOCAL, GenericCRUDImplLocal.newInstance("MyEntity"));
        //this.registerCRUD("MyEntity", this.CRUDOPS.REMOTE, GenericCRUDImplRemote.newInstance("MyEntity"));

        // TODO: do any further application specific initialisations here

        // THIS MUST NOT BE FORGOTTEN: initialise the entity manager!
        EntityManager.initialise();
    };
}

const application = new MyApplication();
export {application as default}


