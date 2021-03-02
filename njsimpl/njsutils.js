/**
 * @author Jörn Kreutel
 */

/*
 * functions that shall also be used internally can be declared like this:
 */
var startsWith = function startsWith(string, substring) {
    return string.indexOf(substring) == 0;
};

var endsWith = function endsWith(string, substring) {
    return string.length >= substring.length && string.substring(string.length - substring.length) == substring;
}

module.exports = {

    // see: https://gist.github.com/savokiss/96de34d4ca2d37cbb8e0799798c4c2d3
    // getIPAddress : function getIPAddress() {
    //     var interfaces = require('os').networkInterfaces();
    //     for (var devName in interfaces) {
    //         var iface = interfaces[devName];
    //
    //         for (var i = 0; i < iface.length; i++) {
    //             var alias = iface[i];
    //             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
    //                 return alias.address;
    //         }
    //     }
    //
    //     return '127.0.0.1';
    // },

    // more sophisticated solution by Jens Bekersch, see https://github.com/JensBekersch/org.dieschnittstelle.iam.css_jsl_jsr/blob/master/publish/webserver.js
    getIPAddress: function() {

        var operatingSystem= process.platform;
        var networkInterfaces= require('os').networkInterfaces();
        var allowedAdapterNamesRegExp= new RegExp("^(Ethernet|WLAN|WiFi|Wi-Fi)");
        var ipAddress= '127.0.0.1';

        switch(operatingSystem) {
            case 'win32':
                getWindowsEthernetAdapterName();
                break;
            default:
                getLinuxEthernetAdapter();
                break;
        }

        function getWindowsEthernetAdapterName() {
            var ethernetAdapterName;
            for(ethernetAdapterName in networkInterfaces)
                selectEthernetAdapterByName(ethernetAdapterName);
        }

        function selectEthernetAdapterByName(ethernetAdapterName) {
            if(ethernetAdapterName.match(allowedAdapterNamesRegExp))
                getIPAdressOfEthernetAdapter(networkInterfaces[ethernetAdapterName]);
        }

        function getLinuxEthernetAdapter() {
            var ethernetAdapterName;
            for(ethernetAdapterName in networkInterfaces)
                getIPAdressOfEthernetAdapter(networkInterfaces[ethernetAdapterName]);
        }

        function getIPAdressOfEthernetAdapter(selectedNetworkAdapter) {
            var i;
            for (i=0; i<selectedNetworkAdapter.length; i++)
                checkIfAliasIsIPv4NotLocalAndNotInternal(selectedNetworkAdapter[i]);
        }

        function checkIfAliasIsIPv4NotLocalAndNotInternal(alias) {
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                ipAddress= alias.address;
        }

        return ipAddress;
    },
    clearNode : function clearNode(node) {
        while (node.firstChild) {
            console.log("removing child node: " + node.firstChild);
            node.removeChild(node.firstChild);
        }
    },

    /*
     * utility treat null as empty string
     */
    nullAsEmptyString : function nullAsEmptyString(val) {
        return (val == null ? "" : val);
    },

    /*
     * some substring functionality
     */
    substringAfter : function substringAfter(string, separator) {
        //console.log("substringAfter(\'" + string + "\',\'" + separator + "\')");
        var split = string.split(separator);
        //console.log("split result is: " + split);
        var rest = "";
        for (var i = 1; i < split.length; i++) {
            if (i != 1) {
                rest += separator;
            }
            rest += split[i]
        }

        return rest;
    },

    startsWith : startsWith,

    replaceWith : function replaceWith(string, token, replacement) {
        return string.replace(token, replacement);
    },

    endsWith : endsWith,

    trimQuotes : function trimQuotes(string) {
        var trimmed = string.trim();
        if ((startsWith(trimmed, "\"") && endsWith(trimmed, "\"")) || (startsWith(trimmed, "\'") && endsWith(trimmed, "\'"))) {
            return trimmed.substring(1, trimmed.length - 1);
        }
        return string;
    }
};
