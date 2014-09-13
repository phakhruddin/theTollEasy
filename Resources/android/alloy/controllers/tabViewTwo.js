function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewTwo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId58 = Ti.UI.createWindow({
        title: "Map",
        id: "__alloyId58"
    });
    $.__views.mapbutton = Ti.UI.createButton({
        title: "ClickForMAP Ti.MAP",
        id: "mapbutton",
        top: "40"
    });
    $.__views.__alloyId58.add($.__views.mapbutton);
    $.__views.mapbutton2 = Ti.UI.createButton({
        title: "ClickForMAP GMAP API V2",
        id: "mapbutton2",
        top: "100"
    });
    $.__views.__alloyId58.add($.__views.mapbutton2);
    $.__views.mapbutton3 = Ti.UI.createButton({
        title: "ClickForMAP Hybrid",
        id: "mapbutton3",
        top: "160"
    });
    $.__views.__alloyId58.add($.__views.mapbutton3);
    $.__views.tab_two = Ti.UI.createTab({
        window: $.__views.__alloyId58,
        id: "tab_two",
        title: "Map View",
        fontSize: "30dp"
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
        alert("adding mapview on android");
        win.add(mapview);
        listener = function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        };
        mapview.addEventListener("click", listener);
        alert("android win.open() mapview");
        win.open();
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
        var Map;
        var tollPlaza0;
        var mapview;
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
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;