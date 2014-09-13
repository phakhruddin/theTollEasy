function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    var __alloyId39 = [];
    $.__views.__alloyId40 = Alloy.createController("tabViewOne", {
        id: "__alloyId40"
    });
    __alloyId39.push($.__views.__alloyId40.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId41 = Alloy.createController("tabViewTwo", {
        id: "__alloyId41"
    });
    __alloyId39.push($.__views.__alloyId41.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId39,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;