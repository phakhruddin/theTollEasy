function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewTwo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId6 = Ti.UI.createWindow({
        title: "Map",
        id: "__alloyId6"
    });
    $.__views.open_button_two = Ti.UI.createButton({
        title: "ClickForMAP",
        id: "open_button_two"
    });
    $.__views.__alloyId6.add($.__views.open_button_two);
    $.__views.tab_two = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        id: "tab_two",
        title: "Map View"
    });
    $.__views.tab_two && $.addTopLevelView($.__views.tab_two);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.open_button_two.addEventListener("click", function() {
        console.debug("open this one after clikcing on button two");
        var tabViewTwoChildController = Alloy.createController("tabViewTwoChild");
        tabViewTwoChildController.openMainTwoWindow($.tab_two);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;