/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */


import {GenericCRUDImplLocal, mwfUtils} from "../Main.js";
import {EntityManager} from "../Main.js";

/*************
 * example entity
 *************/

export class MyEntity extends EntityManager.Entity {

    constructor() {
        super();
    }

}

// TODO-REPEATED: add new entity type declarations here
export class MediaItem extends EntityManager.Entity {

    constructor(title, src, description, contentType) {
        super();
        this.title = title;
        this.description = description;
        this.added = Date.now();    //creation date
        this.src = src;
        this.srcType = null;    //created via external URL or upload
        this.contentType = contentType; //Pic or video
    }

    get addedDateString() {
        return (new Date(this.added)).toLocaleDateString()
    }

    get mediaTypes() {
        if (this.contentType) {
            var index = this.contentType.indexOf("/");
            if (index > -1) {
                return this.contentType.substring(0, index);
            } else {
                return "UNKNOWN";
            }
        } else {
            return "UNKNOWN";
        }
    }
}


