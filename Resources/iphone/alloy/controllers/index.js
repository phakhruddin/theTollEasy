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
    Alloy.Models.instance("dummy");
    var __alloyId55 = [];
    $.__views.__alloyId56 = Alloy.createController("tabViewOne", {
        apiName: "Alloy.Require",
        id: "__alloyId56",
        classes: []
    });
    __alloyId55.push($.__views.__alloyId56.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId57 = Alloy.createController("paywindow", {
        apiName: "Alloy.Require",
        id: "__alloyId57",
        classes: []
    });
    __alloyId55.push($.__views.__alloyId57.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId55,
        apiName: "Ti.UI.TabGroup",
        id: "index",
        classes: []
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info(e.coords);
                var latX = e.coords.latitude;
                Titanium.App.Properties.setInt("latX", latX);
                var lonX = e.coords.longitude;
                Titanium.App.Properties.setInt("lonX", lonX);
                console.log("latitude :" + latX + " longitude : " + lonX);
            }
        });
    } else alert("In order for theTollEasy to capture tollplazas. Please enable location services. Thanks.");
    var someDummy = Alloy.Models.dummy;
    console.log("stringify dummy :" + JSON.stringify(someDummy));
    someDummy.set("id", "1234");
    someDummy.fetch();
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
    var mindebug = Titanium.App.Properties.getInt("mindebug", 0);
    1 == mindebug ? someDummy.set("mindebugvalue", true) : someDummy.set("mindebugvalue", false);
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
    Ti.App.addEventListener("pause", function() {
        var service = Ti.App.iOS.registerBackgroundService({
            url: "bg-service1-3.js"
        });
        service.start;
    });
    Ti.App.addEventListener("resume", function() {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;