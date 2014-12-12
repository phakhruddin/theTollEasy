function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    Alloy.Collections.instance("tollsource");
    var __alloyId53 = [];
    $.__views.__alloyId54 = Alloy.createController("tabViewOne", {
        apiName: "Alloy.Require",
        id: "__alloyId54",
        classes: []
    });
    __alloyId53.push($.__views.__alloyId54.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId55 = Alloy.createController("paywindow", {
        apiName: "Alloy.Require",
        id: "__alloyId55",
        classes: []
    });
    __alloyId53.push($.__views.__alloyId55.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId53,
        apiName: "Ti.UI.TabGroup",
        id: "index",
        classes: []
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Ti.Geolocation.locationServicesEnabled || alert("In order for theTollEasy to capture tollplazas. Please enable location services. Thanks.");
    maildebug = Titanium.App.Properties.getInt("maildebug") ? Titanium.App.Properties.getInt("maildebug") : 0;
    var mindebug = Titanium.App.Properties.getInt("mindebug", 1);
    loc = Titanium.App.Properties.getString("loc") ? Titanium.App.Properties.getString("loc") : "newberlin";
    Titanium.App.Properties.setInt("closercount", 500);
    radius = Titanium.App.Properties.getInt("radius") ? Titanium.App.Properties.getInt("radius") : 3e3;
    Ti.App.Properties.removeProperty("distmatchobj");
    Ti.App.Properties.removeProperty("thedistanceNearbyFilter");
    Titanium.App.Properties.getInt("distanceFilter", 75);
    Titanium.App.Properties.getInt("detectionRange", 200);
    foundexit = "0";
    var writeFile = function(content, filename) {
        var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
        file.write(content + "\n");
    };
    var debugfile = "maildebug.txt";
    if ("1" == mindebug) {
        writeFile(new Date() + ": MIN DEBUG start", debugfile);
        "1" == maildebug && writeFile(new Date() + ": debugging start", debugfile);
    }
    var thefile = loc + ".txt";
    var file4 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile);
    var thefile5 = loc + "1.txt";
    var file5 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile5);
    var contents = file4.read() || file5.read();
    if (!contents) {
        console.log("contents is empty, download tollplaza information");
        Alloy.Globals.updateTollPlaza("newberlin");
    }
    if (contents && contents.text) {
        var preParseData = contents.text;
        var json = json || JSON.parse(preParseData);
    }
    var mmsg = "json data : " + JSON.stringify(json);
    1 == Titanium.App.Properties.getInt("maildebug") && Alloy.Globals.appendFile(mmsg, debugfile);
    lat1 = time1 = timelastdebug = 0;
    var service = Ti.App.iOS.registerBackgroundService({
        url: "bg-service1-3.js"
    });
    service.start;
    Ti.App.addEventListener("pause", function() {});
    Ti.App.addEventListener("resume", function() {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;