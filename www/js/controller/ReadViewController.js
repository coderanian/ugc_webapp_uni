/**
 * @author Jörn Kreutel
 */
import {mwf} from "../Main.js";
import {entities} from "../Main.js";

export default class ReadViewController extends mwf.ViewController {

    constructor() {
        super();
        this.viewProxy = null;
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        // All arguments from listview item
        const mediaItem = this.args.item
        this.viewProxy = this.bindElement(
            "mediaReadviewTemplate",
            {item: mediaItem},
            this.root
        ).viewProxy;

        // Open delete confirmation dialogue and fill it with item from readview
        this.viewProxy.bindAction(
            "deleteItem",
            (() => {this.deleteItemConfirm(mediaItem)})
        );

        // Switch to edit view and fill it with item from readview
        this.viewProxy.bindAction("editItem", (() => {
            this.nextView("mediaEditview", {item: mediaItem})
        }));

        // Skip the view in case of item being deleted in editview as nextview (return straight to overview)
        this.addListener(
            new mwf.EventMatcher("crud","deleted","MediaItem"),
            ((e) => {this.markAsObsolete();}),
            true
        );

        // call the superclass once creation is done
        super.oncreate();
    }

    /**
     * Pause the video on return to previews view (onpause event automatic on going back)
     * @returns {Promise<void>}
     */
    async onpause() {
        const video = this.root.querySelector('video');
        if (video) {
            video.pause();
        }

        super.onpause();
    }


    /**
     * Open delete confirmation dialogue on button press
     * @param item
     */
    deleteItemConfirm(item){
        this.showDialog("mediaDeleteConfirmation", {
                item: this.mediaItem,
                actionBindings: {
                    confDeleteItem: (() => {
                        this.previousView({deletedItem: item});
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
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view.
     * Otherwise, do not return anything.
     * @param nextviewid return from this view
     * @param returnValue data from return view
     * @param returnStatus optional
     * @returns {Promise<void>}
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
        // Update readview if update operation happened in editview
        if(nextviewid === "mediaEditview" && returnValue){
            this.viewProxy.update({item: returnValue.item});
        }
    }

}

