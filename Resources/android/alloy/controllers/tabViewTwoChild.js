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
    var args = arguments[0] || {};
    exports.openMainTwoWindow = function(_tab) {
        console.log(" json _tab :" + JSON.stringify(_tab));
        console.log(" json args :" + JSON.stringify(args));
        var latitude = args.latitude || 42.432276;
        var longitude = args.longitude || -87.952004;
        var title = args.title || "Waukegan Toll Plaza 21";
        var subtitle = args.hwy || "I-94 Gurnee, IL";
        var Map;
        var tollPlaza0;
        var mapview;
        var Map = Titanium.Map;
        var tollPlaza0 = Map.createAnnotation({
            latitude: latitude,
            longitude: longitude,
            title: title,
            subtitle: subtitle,
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
        var win = Titanium.UI.createWindow({
            fullscreen: true,
            tabBarHidden: true,
            navBarHidden: false
        });
        alert("do nothing this is android");
        listener = function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        };
        mapview.addEventListener("click", listener);
        win.add(mapview);
        win.open();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;