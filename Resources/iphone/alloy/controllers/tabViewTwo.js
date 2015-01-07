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
    this.__controllerPath = "tabViewTwo";
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
    $.__views.__alloyId85 = Ti.UI.createWindow({
        apiName: "Ti.UI.Window",
        title: "Map",
        classes: [ "container" ],
        id: "__alloyId85"
    });
    $.__views.mapbutton = Ti.UI.createButton({
        title: "ClickForMAP Ti.MAP",
        apiName: "Ti.UI.Button",
        id: "mapbutton",
        top: "40",
        classes: []
    });
    $.__views.__alloyId85.add($.__views.mapbutton);
    $.__views.mapbutton2 = Ti.UI.createButton({
        title: "ClickForMAP GMAP API V2",
        apiName: "Ti.UI.Button",
        id: "mapbutton2",
        top: "100",
        classes: []
    });
    $.__views.__alloyId85.add($.__views.mapbutton2);
    $.__views.mapbutton3 = Ti.UI.createButton({
        title: "ClickForMAP Hybrid",
        apiName: "Ti.UI.Button",
        id: "mapbutton3",
        top: "160",
        classes: []
    });
    $.__views.__alloyId85.add($.__views.mapbutton3);
    $.__views.tab_two = Ti.UI.createTab({
        window: $.__views.__alloyId85,
        apiName: "Ti.UI.Tab",
        id: "tab_two",
        title: "Map View",
        fontSize: "30dp",
        classes: []
    });
    $.__views.tab_two && $.addTopLevelView($.__views.tab_two);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var thelatitude = 42.432276;
    var thelongitude = -87.952004;
    $.mapbutton.addEventListener("click", function() {
        console.debug("open this one after clikcing on button two");
        var Map = require("ti.map");
        var win = Titanium.UI.createWindow({
            fullscreen: true,
            tabBarHidden: false,
            navBarHidden: false
        });
        var tollPlaza0 = Map.createAnnotation({
            latitude: thelatitude,
            longitude: thelongitude,
            title: "Waukegan Toll Plaza 21",
            subtitle: "I-94 Gurnee, IL",
            pincolor: Map.ANNOTATION_RED,
            myid: 1
        });
        var mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            region: {
                latitude: thelatitude,
                longitude: thelongitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ tollPlaza0 ]
        });
        if ("android" == Ti.Platform.osname) {
            alert("adding mapview on android");
            win.add(mapview);
        } else {
            win.add(mapview);
            var btnBack = Ti.UI.createButton({
                title: "< Back",
                top: 0,
                left: 10
            });
            var win1 = Titanium.UI.iOS.createNavigationWindow({
                title: "MAP",
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
        if ("android" == Ti.Platform.osname) {
            alert("android win.open() mapview");
            win.open();
        } else {
            alert("opening iphone map");
            win1.open();
        }
    });
    $.mapbutton2.addEventListener("click", function() {
        var win = Titanium.UI.createWindow({
            title: "Titanium.Map.STANDARD_TYPE"
        });
        var tollPlaza0 = Titanium.Map.createAnnotation({
            latitude: thelatitude,
            longitude: thelongitude,
            title: "Waukegan Toll Plaza 21 MAP2",
            subtitle: "I-94 Gurnee, IL",
            pincolor: Titanium.Map.ANNOTATION_RED,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            myid: 1
        });
        var mapview = Titanium.Map.createView({
            mapType: Titanium.Map.STANDARD_TYPE,
            region: {
                latitude: thelatitude,
                longitude: thelongitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ tollPlaza0 ]
        });
        win.add(mapview);
        win.open();
    });
    $.mapbutton3.addEventListener("click", function() {
        var win = Titanium.UI.createWindow({
            title: "Hybrid",
            fullscreen: true,
            tabBarHidden: false,
            navBarHidden: false
        });
        if ("android" == Ti.Platform.osname) {
            var Map = Titanium.Map;
            var tollPlaza0 = Map.createAnnotation({
                latitude: thelatitude,
                longitude: thelongitude,
                title: "Waukegan Toll Plaza 21",
                subtitle: "I-94 Gurnee, IL",
                myid: 1
            });
            var mapview = Map.createView({
                mapType: Titanium.Map.STANDARD_TYPE,
                region: {
                    latitude: thelatitude,
                    longitude: thelongitude,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                },
                animate: true,
                regionFit: true,
                userLocation: true,
                annotations: [ tollPlaza0 ]
            });
            alert("android win.open() mapview");
            win.add(mapview);
            win.open();
        } else {
            var Map = require("ti.map");
            var tollPlaza0 = Map.createAnnotation({
                latitude: thelatitude,
                longitude: thelongitude,
                title: "Waukegan Toll Plaza 21",
                subtitle: "I-94 Gurnee, IL",
                myid: 1
            });
            var mapview = Map.createView({
                mapType: Map.NORMAL_TYPE,
                region: {
                    latitude: thelatitude,
                    longitude: thelongitude,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                },
                animate: true,
                regionFit: true,
                userLocation: true,
                annotations: [ tollPlaza0 ]
            });
            win.add(mapview);
            var win1 = Titanium.UI.iOS.createNavigationWindow({
                title: "MAP",
                backgroundColor: "transparent",
                window: win
            });
            var btnBack = Ti.UI.createButton({
                title: "< Back",
                top: 0,
                left: 10
            });
            win1.add(btnBack);
            btnBack.addEventListener("click", function(_tab) {
                console.debug("closing map" + _tab);
                win1.close();
            });
            win1.open();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;