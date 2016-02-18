/**
 * @author Jörn Kreutel
 */
define(["mwf","entities"], function(mwf, entities) {

    function MyInitialViewController() {
        console.log("MyInitialViewController()");

        // declare a variable for accessing the prototype object (used für super() calls)
        var proto = MyInitialViewController.prototype;

        /*
         * for any view: initialise the view
         */
        this.oncreate = function (callback) {
            // TODO: do databinding, set listeners, initialise the view
            var helloEl = document.createElement("h1");
            helloEl.textContent = "Hello Mobile World...";
            this.root.appendChild(helloEl);

            // call the superclass once creation is done
            proto.oncreate.call(this,callback);
        }

        /*
         * for views with listviews: react to the selection of a listitem
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        this.onListItemSelected = function(listitem,listview) {
            // TODO: implement how selection of listitem shall be handled
        }

        /*
         * for views with listviews: react to the selection of a listitem menu option
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        this.onListItemMenuItemSelected = function(option, listitem, listview) {
            // TODO: implement how selection of option for listitem shall be handled
        }

        /*
         * for views with dialogs
         * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
         */
        this.bindDialog = function(dialogid,dialog,item) {
            // call the supertype function
            proto.bindDialog.call(this,dialogid,dialog,item);
            // TODO: implement action bindings for dialog, accessing dialog.root
        }


    }

    // extend the view controller supertype
    mwf.xtends(MyInitialViewController,mwf.ViewController);

    // and return the view controller function
    return MyInitialViewController;
});
