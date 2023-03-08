/**
 * @author Jörn Kreutel
 */
import {GenericCRUDImplLocal, GenericCRUDImplRemote, mwf, mwfUtils, MyApplication} from "../Main.js";
import {entities} from "../Main.js";

export default class ListviewViewController extends mwf.ViewController {

    constructor() {
        super();
        this.addNewMediaItemElement = null; //used with reference to add element later
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        // Add listener to Add-Btn
        this.addNewMediaItemElement = this.root.querySelector("#addNewMediaItem");
        this.addNewMediaItemElement.onclick = () => {
            this.nextView("mediaEditview");
        };

        this.switchCRUDElement = this.root.querySelector("#scopeBtn");
        let scope = this.application.currentCRUDScope;
        this.scopeLabel = this.root.querySelector("#scopeDetails");

        //Disable remote operations if offline (can't get isWebserverAvailable working)
        if(window.navigator.onLine){
            this.switchCRUDElement.onclick = () => {
                scope = scope === 'remote' ? 'local' : 'remote';
                this.application.switchCRUD(scope)
                //Refresh list view based on objects retrieved locally or remotely on switch
                entities.MediaItem.readAll().then((items) => {
                    this.initialiseListview(items);
                    this.scopeLabel.textContent = scope;
                });

            }
        }else{
            this.application.switchCRUD("local");
            entities.MediaItem.readAll().then((items) => {
                this.initialiseListview(items);
                this.scopeLabel.textContent = "local";
            });
        }

        //Initialize view
        entities.MediaItem.readAll().then((items) => {
            this.initialiseListview(items);
        });

        //Add event listeners to handle incoming CRUD events from other views
        this.addListener(new mwf.EventMatcher('crud', 'created', 'MediaItem'), (e) => {
            this.addToListview(e.data);
        });

        this.addListener(new mwf.EventMatcher('crud', 'deleted', 'MediaItem'), (e) => {
            this.removeFromListview(e.data);
        });

        this.addListener(new mwf.EventMatcher('crud', 'updated', 'MediaItem'), (e) => {
            this.updateInListview(e.data._id, e.data);
        });

        // call the superclass once creation is done
        super.oncreate();

    }


    /**
     * Switch to readview on item selection
     * @param mediaitem selected media item
     * @param mediaitemid id of selected media item
     */
    onListItemSelected(itemobj, itemviewid) {
        this.nextView('mediaReadview', { item: itemobj });
    }

    /**
     * Switch to readview on item selection (alt)
     * @param menuitemview current view
     * @param itemobj selected media item
     * @param listview view to switch to
     */
    onListItemMenuItemSelected(menuitemview, itemobj, listview) {
        super.onListItemMenuItemSelected(menuitemview, itemobj, listview);
    }

    /**
     * Switch to editview for media item upon selecting "Edit" in dialogue
     * @param itemobj selected media item
     */
    editItem(item){
        this.nextView("mediaEditview",
            {item: item})
    }

    /**
     * Switch to editview for media item upon selecting "Edit" in dialogue
     * @param itemobj selected media item

     editItem(itemobj){
        this.nextView("mediaEditview",
            {item: itemobj})
    }
     */
    editItemAlt(item){
        this.showDialog("mediaItemDialog", {
            item: item,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    item.update().then(() => {
                        this.updateInListview(item._id, item);
                        this.hideDialog();
                    });
                }),
                delete: ((event) => {
                    this.hideDialog();
                    this.deleteItemConfirm(item);
                })
            }
        });
    }

    /**
     * Create deep copy of media item object and add to list view
     * @param item to be copied
     */
    copyItem(item){
        let itemdata = {...item};
        let copy = new entities.MediaItem(itemdata.title, itemdata.src, itemdata.description)
        copy.create().then(() => {
            this.addToListview(copy);
        })
    }

    /**
     * Open delete confirmation dialogue on button press
     * @param item to be deleted
     */
    deleteItemConfirm(item){
        this.showDialog("mediaDeleteConfirmation", {
            item: item,
                actionBindings: {
                    confDeleteItem: (() => {
                        this.deleteItem(item);
                        this.hideDialog();
                    }),
                    cancel: (() => {
                        this.hideDialog();
                    })
                }
            }
        )
    }

    /**
     * Delete selected media item from server and view
     * @param item Media Item
     */
    //Interaction with delete button in dialog in listview menu
    deleteItem(item) {
        item.delete().then(() => {
            this.removeFromListview(item._id);
        });
    }

    /**
     * DEPRECATED
     * Handle CRUD events from other views, deprecated but left for reference
     * @param nextviewid
     * @param returnValue
     * @param returnStatus
     * @returns {Promise<void>}
    */
    /*
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
        //alert(JSON.stringify(returnValue));
        //alert(returnValue.hasOwnProperty('updatedItem'));
        if((nextviewid === "mediaReadview" || nextviewid === "mediaEditview") && returnValue){
            const crudType = Object.keys(returnValue);
            switch (crudType[0]){
                case 'deletedItem': this.deleteItem(returnValue.deletedItem); break;
                case 'updatedItem': this.updateInListview(returnValue.updatedItem._id, returnValue.updatedItem); break;
                case 'createdItem': this.addToListview(returnValue.createdItem); break;
            }
        }
    }
    */
}

