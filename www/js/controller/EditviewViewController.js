/**
 * @author Jörn Kreutel
 */
import {GenericCRUDImplLocal, GenericCRUDImplRemote, mwf} from "../Main.js";
import {entities} from "../Main.js";

export default class EditviewViewController extends mwf.ViewController {

    constructor() {
        super();
        this.viewProxy = null;
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        this.mediaItem = this.args?.item || new entities.MediaItem("", "", "");

        //Represent the initialized template as object
        this.viewProxy = this.bindElement(
            "mediaEditviewTemplate",
            {item: this.mediaItem},
            this.root
        ).viewProxy;

        //Form listener
        this.editviewForm = this.root.querySelector("#mediaEditviewForm");

        //File upload listener
        this.editviewForm.filesrc.onchange = () => {
            //Filedata saved as array
            const filedata = this.editviewForm.filesrc.files[0];
            //Preview of img with local path as URL
            /*
            const filereader = new FileReader();
            filereader.onload=()=>{
                this.mediaItem.src = filereader.result;
                this.mediaItem.contentType = filedata.type;
                this.viewProxy.update({item: this.mediaItem});
                this.editviewForm.src.focus()
            }*/
            const filedataurl = URL.createObjectURL(filedata);
            this.mediaItem.src = filedataurl;
            this.mediaItem.contentType = filedata.type;
            //Rerender with video or img preview based on content type
            this.viewProxy.update({item: this.mediaItem});
            this.editviewForm.src.focus()
        }

        this.viewProxy.bindAction(
            "editItem",
            () => {
                this.editviewForm.onsubmit = (event) => {
                    event.preventDefault();
                    const filedata = this.editviewForm.filesrc.files[0];
                    if (filedata) {
                        //1. Upload filedata to server
                        const requestBody = new FormData()
                        requestBody.append("filesrc", filedata);
                        const request = new XMLHttpRequest();
                        request.open("POST", "api/upload");
                        //Send request body
                        request.send(requestBody);
                        //2. Find out url to identify datatype
                        request.onload = () => {
                            const responseBodyData = JSON.parse(request.responseText);
                            this.mediaItem.src = responseBodyData.data.filesrc
                            this.createOrUpdateMediaItem(this.mediaItem);
                        }
                    }else{
                        this.createOrUpdateMediaItem(this.mediaItem);
                    }
                }
            });

        // Open delete confirmation dialogue and fill it with item from overview
        this.viewProxy.bindAction(
            "confDeleteItem",
            () => {
                this.deleteItemConfirm(this.mediaItem)
            }
        )

        // Fill editForm src with default url, clear previous file input and focus on input field
        this.viewProxy.bindAction(
            "srcDefault",
            () => {
                this.editviewForm.src.value = "http://placekitten.com/300/300"
                //this.editviewForm.src.value = "https://picsum.photos/200/300"
                this.mediaItem.src = this.editviewForm.src.value
                //Clear file input if anything uploaded prior to entering url
                this.editviewForm.filesrc.value=null;
                //Focus on input so that blur event can be activated upon leaving to refresh thumbnail
                this.editviewForm.src.focus()
            }
        )

        // Show thumbnail if item.created
        this.thumbnail = this.root.querySelector(".preview");
        this.thumbnail.src = this.mediaItem.src;

        // Execute on leaving src input field of editform
        this.editviewForm.src.onblur = () => {
            //Fetch content type of url (both remote and upload)
            fetch(this.mediaItem.src,{mode:"cors"})
                .then((response) => {
                    const contentType = response.headers.get("content-type");
                    //console.log(contentType);
                    if(contentType){
                        this.mediaItem.contentType = contentType;
                    }else{
                        //Placekitten sends no content type in header, no idea why
                        this.mediaItem.contentType = "image/jpeg"
                    }
                    //console.log(this.mediaItem.src);
                    this.viewProxy.update({item: this.mediaItem});
                    this.thumbnail = this.root.querySelector(".preview");
                    this.thumbnail.src = this.mediaItem.src;
                    this.viewProxy.update({item: this.mediaItem})
                });
            /*
            //XMLHttpRequest
            const request = new XMLHttpRequest();
            request.open("GET", this.mediaItem.src, false);
            request.send();
            request.onreadystatechange=()=>{
                if(request.readyState === 4){
                    const contentType = request.getResponseHeader("content-type");
                    alert(contentType);
                }
            }
            */
        }

        //Disable upload button if local scope
        this.fileUploadBtn = this.root.querySelector("#upload");
        if (this.application.currentCRUDScope === "local") {
            this.fileUploadBtn.disabled = true;
        } else {
            this.fileUploadBtn.disabled = false;
        }
        // call the superclass once creation is done
        super.oncreate();

    }

    /**
     * Overwrite img-back button event handler, reset form prior to returning to previous view without changes
     * @returns {Promise<void>}
     */
    //From ViewController documentation
    async onback(){
        this.editviewForm.reset();
        this.previousView()
    }

    /**
     * Pause the video on return to previews view (onpause event automatic on going back)
     * @returns {Promise<void>}
     */
    async onpause() {
        if(this.mediaItem.mediaTypes === 'video'){
            this.thumbnail.pause();
        }
        super.onpause();
    }

    /**
     * Open delete confirmation dialogue on button press
     * @param item
     */
    deleteItemConfirm(item) {
        this.showDialog("mediaDeleteConfirmation", {
                item: this.mediaItem,
                actionBindings: {
                    confDeleteItem: (() => {
                        this.notifyListeners(new mwf.Event("crud", "deleted", "MediaItem", item._id));
                        this.hideDialog();
                        this.previousView();
                    }),
                    cancel: (() => {
                        this.hideDialog();
                    })
                }
            }
        )
    }

    /**
     * Execute CRUD operations on form submit and notify event listeners
     * @param item
     */
    createOrUpdateMediaItem(item) {
        if (!item.created) {
            //Create new media item
            item.create().then(() => {
                this.notifyListeners(new mwf.Event('crud', 'created', 'MediaItem', item._id));
                this.previousView({item: item});
            });
        } else {
            //Update existing media item
            item.update().then(() => {
                this.notifyListeners(new mwf.Event('crud', 'updated', 'MediaItem', item._id));
                this.previousView({item: item});
            });
        }
    }

}
