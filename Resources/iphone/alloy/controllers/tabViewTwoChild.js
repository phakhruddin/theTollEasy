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
    this.__controllerPath = "tabViewTwoChild";
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
    $.__views.child_window_two = Ti.UI.createWindow({
        apiName: "Ti.UI.Window",
        id: "child_window_two",
        title: "MAP",
        classes: []
    });
    $.__views.child_window_two && $.addTopLevelView($.__views.child_window_two);
    $.__views.map_label = Ti.UI.createLabel({
        text: "Map Window Label",
        apiName: "Ti.UI.Label",
        id: "map_label",
        top: "20",
        classes: []
    });
    $.__views.child_window_two.add($.__views.map_label);
    $.__views.check_map = Ti.UI.createButton({
        title: "MAP",
        apiName: "Ti.UI.Button",
        id: "check_map",
        classes: []
    });
    $.__views.child_window_two.add($.__views.check_map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    exports.openMainTwoWindow = function(_tab) {
        console.log(" json _tab :" + JSON.stringify(_tab));
        console.log(" json args :" + JSON.stringify(args));
        var latitude = args.latitude || 42.432276;
        var longitude = args.longitude || -87.952004;
        var title = args.title || "Waukegan Toll Plaza 21";
        args.hwy || "I-94 Gurnee, IL";
        if ("android" == Ti.Platform.osname) {
            var Map = Titanium.Map;
            var tollPlaza0 = Map.createAnnotation({
                latitude: latitude,
                longitude: longitude,
                title: title,
                pincolor: Map.ANNOTATION_RED,
                myid: 1
            });
            var mapview = Map.createView({
                mapType: Titanium.Map.STANDARD_TYPE,
                region: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                },
                animate: true,
                regionFit: true,
                userLocation: true,
                annotations: [ tollPlaza0 ]
            });
        } else {
            var Map = require("ti.map");
            var tollPlaza0 = Map.createAnnotation({
                latitude: latitude,
                longitude: longitude,
                title: title,
                pincolor: Map.ANNOTATION_RED,
                myid: 1
            });
            var mapview = Map.createView({
                mapType: Map.NORMAL_TYPE,
                region: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                },
                animate: true,
                regionFit: true,
                userLocation: true,
                annotations: [ tollPlaza0 ]
            });
        }
        var win = Titanium.UI.createWindow({
            fullscreen: true,
            tabBarHidden: true,
            navBarHidden: false
        });
        if ("android" == Ti.Platform.osname) alert("do nothing this is android"); else {
            var btnBack = Ti.UI.createButton({
                title: "< Back",
                top: 5,
                left: 10
            });
            var win1 = Titanium.UI.iOS.createNavigationWindow({
                Title: "MAP",
                backgroundColor: "transparent",
                window: win
            });
            win1.add(btnBack);
            btnBack.addEventListener("click", function(_tab) {
                console.debug("closing map" + _tab);
                win1.close();
            });
        }
        listener = function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        };
        mapview.addEventListener("click", listener);
        win.add(mapview);
        "android" == Ti.Platform.osname ? win.open() : win1.open();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;