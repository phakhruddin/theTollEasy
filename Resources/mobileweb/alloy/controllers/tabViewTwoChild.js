function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewTwoChild";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window_two = Ti.UI.createWindow({
        id: "child_window_two",
        title: "MAP"
    });
    $.__views.child_window_two && $.addTopLevelView($.__views.child_window_two);
    $.__views.map_label = Ti.UI.createLabel({
        text: "Map Window Label",
        id: "map_label",
        top: "20"
    });
    $.__views.child_window_two.add($.__views.map_label);
    $.__views.check_map = Ti.UI.createButton({
        title: "MAP",
        id: "check_map"
    });
    $.__views.child_window_two.add($.__views.check_map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainTwoWindow = function(_tab) {
        _tab.open($.child_window_two);
        console.debug("This is child widow tabViewTwoChild.js" + _tab);
        $.check_map.addEventListener("click", function(_tab) {
            console.debug("before showMap, _tab is" + _tab);
            themapview(_tab);
        });
    };
    var themapview = function(_tab) {
        Ti.API.info("themapview " + JSON.stringify(_tab));
        var Map = require("ti.map");
        var win = Titanium.UI.createWindow({
            fullscreen: true,
            tabBarHidden: true,
            navBarHidden: false
        });
        var tollPlaza0 = Map.createAnnotation({
            latitude: 42.432276,
            longitude: -87.952004,
            title: "Waukegan Toll Plaza 21",
            subtitle: "I-94 Gurnee, IL",
            pincolor: Map.ANNOTATION_RED,
            myid: 1
        });
        var mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            region: {
                latitude: 42.432276,
                longitude: -87.952004,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ tollPlaza0 ]
        });
        Ti.API.info("mapview:" + JSON.stringify(mapview));
        var btnBack = Ti.UI.createButton({
            title: "< Back",
            top: 0,
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
            Ti.API.info("tab:" + JSON.stringify(_tab));
            win1.close();
        });
        listener = function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        };
        mapview.addEventListener("click", listener);
        win.add(mapview);
        win1.open();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;