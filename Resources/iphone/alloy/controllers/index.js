function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    var __alloyId48 = [];
    $.__views.__alloyId49 = Alloy.createController("tabViewOne", {
        apiName: "Alloy.Require",
        id: "__alloyId49",
        classes: []
    });
    __alloyId48.push($.__views.__alloyId49.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId50 = Alloy.createController("paywindow", {
        apiName: "Alloy.Require",
        id: "__alloyId50",
        classes: []
    });
    __alloyId48.push($.__views.__alloyId50.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId48,
        apiName: "Ti.UI.TabGroup",
        id: "index",
        classes: []
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Ti.Geolocation.locationServicesEnabled || alert("In order for theTollEasy to capture tollplazas. Please enable location services. Thanks.");
    var trackingEnabled = false;
    Titanium.App.Properties.setInt("complextracking", 0);
    var simpletrackingEnabled = false;
    Titanium.App.Properties.setInt("simpletracking", 0);
    Titanium.App.Properties.setInt("maildebug", 0);
    Titanium.App.Properties.setInt("count", 0);
    Titanium.App.Properties.setInt("maildebug", 0);
    loc = Titanium.App.Properties.getString("loc") ? Titanium.App.Properties.getString("loc") : "newberlin";
    var firstplazadist = 1e4;
    Titanium.App.Properties.setInt("firstplazadist", firstplazadist);
    var debugfile = "maildebug.txt";
    var locfile = "location.txt";
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
    var locationCallback = function(e) {
        if (trackingEnabled) {
            var lon1 = +e.coords.longitude;
            var lat1 = +e.coords.latitude;
            var time1 = +e.coords.timestamp;
            var mmsg = new Date(time1) + "," + time1 + "," + lat1 + "," + lon1;
            var count = Titanium.App.Properties.getInt("count", count);
            count++;
            console.log(mmsg);
            if (1 == Titanium.App.Properties.getInt("mindebug") && count >= 30) {
                console.log(mmsg + " should be appended to maildebug.txt");
                Alloy.Globals.appendFile(mmsg, locfile);
                var count = 0;
            }
            Titanium.App.Properties.setInt("count", count);
            Titanium.Geolocation.reverseGeocoder(lat1, lon1, function(evt) {
                if (evt.success) {
                    var places = evt.places;
                    currentaddr = places && places.length ? places[0].address : "No address found";
                    Titanium.App.Properties.setString("currentaddr", currentaddr);
                    Ti.API.debug("reverse geolocation result = " + JSON.stringify(evt));
                }
            });
            for (i = 0; json.poi.length > i; i++) {
                var tolltollplaza = json.poi[i].plaza;
                var lat2 = json.poi[i].latitude;
                var lon2 = json.poi[i].longitude;
                var dist = Alloy.Globals.calcDistance(lat1, lon1, lat2, lon2, "F");
                distmatch.push({
                    tolltollplaza: tolltollplaza,
                    dist: dist,
                    latitude: lat2,
                    longitude: lon2,
                    hwy: hwy,
                    cost: cost,
                    type: type,
                    note: note
                });
            }
            var closestdist = distmatch.sort(function(a, b) {
                return a.dist - b.dist;
            });
            closestdist[0].tolltollplaza;
            var closesttollbydist0 = closestdist[0].tolltollplaza;
            closestdist[0].dist;
            closestdist[1].tolltollplaza;
            closestdist[1].dist;
            closestdist[2].tolltollplaza;
            closestdist[2].dist;
            var outputclosesttollbydist0 = closestdist[0].tolltollplaza + " distance : " + closestdist[0].dist;
            Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
            var range = 100;
            var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
            var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
            var timelastupd = parseFloat(timelastupd);
            var timediff = time1 - timelastupd;
            var timerange = 1e4;
            if (range > closestdist[0].dist && timediff > timerange && closesttollbydist0 != tolllastupd) {
                var tollplaza = closestdist[0].tolltollplaza;
                var longitude = closestdist[0].longitude;
                var latitude = closestdist[0].latitude;
                var timestamp = time1;
                var cost = closestdist[0].cost;
                var type = closestdist[0].type;
                var hwy = closestdist[0].hwy;
                var note = closestdist[0].note;
                Alloy.Globals.updateFound(tollplaza, longitude, latitude, timestamp, cost, type, hwy);
                Titanium.App.Properties.setString("timelastupd", timestamp);
                Titanium.App.Properties.setString("tolllastupd", tollplaza);
                Ti.App.iOS.scheduleLocalNotification({
                    alertBody: new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away",
                    date: new Date(new Date().getTime() + 1e3)
                });
                var mmsg = new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away";
                1 == Titanium.App.Properties.getInt("maildebug") && Alloy.Globals.appendFile(mmsg, debugfile);
            } else if (1 == Titanium.App.Properties.getInt("maildebug")) {
                var now = new Date();
                var mmsg = now + ": index.js :" + closesttollbydist0 + ":x:" + tolllastupd;
                mmsg += "|range<" + range + "?:" + closestdist[0].dist;
                mmsg += "|timediff>" + timerange + "?:" + timediff;
                console.log(mmsg);
                Alloy.Globals.appendFile(mmsg, debugfile);
            }
        }
    };
    var headingCallback = function(e) {
        if (trackingEnabled) {
            if (e.error) {
                updatedHeading = "error: " + e.error;
                return;
            }
            var x = e.heading.x;
            var y = e.heading.y;
            var z = e.heading.z;
            e.heading.magneticHeading;
            e.heading.accuracy;
            var trueHeading = e.heading.trueHeading;
            var timestamp = e.heading.timestamp;
            currentHeading = "x:" + x + " y: " + y + " z:" + z;
            Titanium.API.info("geo - current heading: " + new Date(timestamp) + " x " + x + " y " + y + " z " + z);
            Titanium.App.Properties.setString("currentHeading", trueHeading);
        }
    };
    if (Ti.Geolocation.locationServicesEnabled) {
        var distmatch = closestdist = [];
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.distanceFilter = 0;
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.addEventListener("location", locationCallback);
        locationAdded = true && Titanium.App.Properties.setString("locationAdded", "true");
        if (Titanium.Geolocation.hasCompass) {
            Titanium.Geolocation.showCalibration = false;
            Titanium.Geolocation.headingFilter = 45;
            Titanium.Geolocation.addEventListener("heading", headingCallback);
            headingAdded = true;
        } else {
            Titanium.API.info("No Compass on device");
            currentHeading = "No compass available";
            var trueHeading = "No compass available";
            Titanium.App.Properties.setString("currentHeading", trueHeading);
        }
    } else alert("Please enable location services");
    var tracking = function(e) {
        var count = Titanium.App.Properties.getInt("count");
        if (simpletrackingEnabled) {
            var count = Titanium.App.Properties.getInt("count", count);
            count++;
            mmsg = new Date(e.coords.timestamp) + "," + e.coords.timestamp + "," + e.coords.latitude + "," + e.coords.longitude;
            if (1 == Titanium.App.Properties.getInt("mindebug") && count >= 30) {
                console.log(mmsg + " should be appended to maildebug.txt");
                Alloy.Globals.appendFile(mmsg, locfile);
                var count = 0;
            }
            Ti.API.info("Location: " + e.coords.latitude + " , " + e.coords.longitude + " , " + new Date(e.coords.timestamp));
            Titanium.App.Properties.setInt("count", count);
        }
    };
    Ti.Geolocation.addEventListener("location", tracking);
    Ti.App.addEventListener("pause", function() {
        Alloy.Globals.eventDetectTollPlaza(loc, "remove");
    });
    Ti.App.addEventListener("resume", function() {
        Alloy.Globals.eventDetectTollPlaza("newberlin", "add");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;