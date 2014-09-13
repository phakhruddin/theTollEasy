function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOneChild";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        id: "child_window",
        title: "COORD"
    });
    $.__views.child_window && $.addTopLevelView($.__views.child_window);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        text: "Child Window Label",
        top: "20",
        id: "__alloyId5"
    });
    $.__views.child_window.add($.__views.__alloyId5);
    $.__views.check_loc = Ti.UI.createButton({
        title: "Press to Check Location",
        id: "check_loc"
    });
    $.__views.child_window.add($.__views.check_loc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.child_window);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.check_loc.addEventListener("click", function() {
            checkLoc();
        });
    };
    var getLocation = function() {
        var chicago = '{"poi":[{"plaza":"0","latitude":"A1","longitude":"A1","altitude":"99.99","heading":"north","speed":"","hwy":"amazon.com"},{"name":"john","count":2},{"name":"joe","count":3}]}';
        var poiObject = JSON.parse(chicago);
        var theplaza = poiObject.poi[0].plaza;
        var url = "http://54.197.150.195:10000/data";
        Ti.UI.createTableView();
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    json = JSON.parse(this.responseText);
                    var file1 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "chicago.txt");
                    var file2 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "json.txt");
                    file1.write(chicago);
                    file2.write(this.responseText);
                    Ti.Api.info("check chicago: " + chicago);
                    var plaza1 = json.poi[0].plaza;
                    Ti.Api.info("data1: " + plaza1);
                    return plaza1;
                } catch (e) {
                    Ti.API.info("cathing e: " + e);
                }
            }
        });
        xhr.onerror = function(e) {
            alert(e);
        };
        xhr.open("GET", url);
        xhr.send();
        return theplaza;
    };
    var checkLoc = function() {
        if (Ti.Geolocation.locationServicesEnabled) {
            Titanium.Geolocation.purpose = "Get Current Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {
                if (e.error) Ti.API.error("Error: " + e.error); else {
                    Ti.API.info(e.coords);
                    e.coords.latitude;
                    var thetollplaza = getLocation();
                    console.debug("thetollplaza: " + thetollplaza);
                    alert("latitude :" + e.coords.latitude + " longitude : " + e.coords.longitude + " TollPlaza : " + thetollplaza);
                }
            });
        } else alert("Please enable location services");
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;