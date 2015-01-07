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
    this.__controllerPath = "tabViewOneChild";
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
    $.__views.child_window = Ti.UI.createWindow({
        apiName: "Ti.UI.Window",
        id: "child_window",
        title: "Curr Coordinates",
        classes: []
    });
    $.__views.child_window && $.addTopLevelView($.__views.child_window);
    $.__views.__alloyId84 = Ti.UI.createLabel({
        text: "Current Location",
        apiName: "Ti.UI.Label",
        top: "20",
        fontSize: "100dp",
        id: "__alloyId84",
        classes: []
    });
    $.__views.child_window.add($.__views.__alloyId84);
    $.__views.check_loc = Ti.UI.createButton({
        title: "Press to Check Location",
        apiName: "Ti.UI.Button",
        id: "check_loc",
        classes: []
    });
    $.__views.child_window.add($.__views.check_loc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.child_window);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.check_loc.addEventListener("click", function() {
            Alloy.Globals.checkLoc();
        });
    };
    Alloy.Globals.getLocation;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;