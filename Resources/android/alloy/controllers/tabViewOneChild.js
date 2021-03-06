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
    $.__views.__alloyId57 = Ti.UI.createLabel({
        text: "Current Location",
        top: "20",
        fontSize: "100dp",
        id: "__alloyId57"
    });
    $.__views.child_window.add($.__views.__alloyId57);
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
            Alloy.Globals.checkLoc();
        });
    };
    Alloy.Globals.getLocation;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;