/**
 * Created by master on 14.01.16.
 */
// we disable displaying the body as long as the application is being initialised
document.querySelector("body").classList.add("mwf-loading-app");

requirejs.config({

        baseUrl: "",

        // TODO-REPEATED: add all new modules here, e.g. ViewController implementations
        paths: {
            /* start: generic libraries */
            xhr: 'lib/js/mwf/crud/mwfXhr',
            indexeddb: 'lib/js/mwf/crud/mwfIndexeddb',
            mwf: 'lib/js/mwf/mwf',
            mwfUtils: 'lib/js/mwf/mwfUtils',
            GenericCRUDImplLocal: 'lib/js/mwf/crud/mwfGenericCRUDImplLocal',
            GenericCRUDImplRemote: 'lib/js/mwf/crud/mwfGenericCRUDImplRemote',
            EntityManager: 'lib/js/mwf/crud/mwfEntityManager',
            eventhandling: 'lib/js/mwf/mwfEventhandling',
            GenericDialogTemplateViewController: 'lib/js/mwf/controller/mwfGenericDialogTemplateViewController',
            /* TODO: comment in if maps shall be used */
            mapHolder: 'lib/js/mwf/controller/mwfMapHolderLeaflet',
            /* end: generic libraries */

            /* application libraries: the main application class */
            MyApplication: 'js/MyApplication',
            /* application libraries: model */
            entities: 'js/model/MyEntities',
            /* application libraries: view controllers */
            MyInitialViewController: 'js/controller/MyInitialViewController'
        }
    }
);

// here, we load all modules that will be required at runtime, those that will be instantiated dynamically by the mwf core framework need to be declared explicitly here - this is necessary for all ViewController components
// TODO-REPEATED: add new ViewControllers to the dependency array
requirejs(["mwf","GenericDialogTemplateViewController","MyApplication", "MyInitialViewController"],
    function (mwf) {
        mwf.onloadApplication();
        //entitiesTest.test();
    });
