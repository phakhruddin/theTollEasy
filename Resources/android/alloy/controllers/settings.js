function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win_settings = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "#6d0a0c",
        id: "win_settings"
    });
    var __alloyId43 = [];
    $.__views.row_contupd = Ti.UI.createTableViewRow({
        id: "row_contupd",
        Title: "Continous Update"
    });
    __alloyId43.push($.__views.row_contupd);
    $.__views.label_contupd = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "location capture ON/OFF",
        id: "label_contupd",
        top: "5",
        left: "20"
    });
    $.__views.row_contupd.add($.__views.label_contupd);
    $.__views.switch_contupd = Ti.UI.createSwitch({
        value: false,
        id: "switch_contupd",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON"
    });
    $.__views.row_contupd.add($.__views.switch_contupd);
    $.__views.table_settings = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId43,
        id: "table_settings"
    });
    $.__views.win_settings.add($.__views.table_settings);
    $.__views.tab_settings = Ti.UI.createTab({
        window: $.__views.win_settings,
        id: "tab_settings",
        title: "List View"
    });
    $.__views.tab_settings && $.addTopLevelView($.__views.tab_settings);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_settings);
        console.debug("This is child widow settings.js" + _tab);
    };
    var contFoundUpd = setInterval(function() {
        Alloy.Globals.distanceDetectTollPlaza("newberlin");
    }, 1e4);
    $.switch_contupd.addEventListener("change", function() {
        var switchValue = $.switch_contupd.value;
        Ti.API.info("switch value :" + switchValue);
        if (true == switchValue) {
            alert("TollPlaza detection is ON");
            contFoundUpd;
        } else {
            clearInterval(contFoundUpd);
            contFoundUpd = 0;
            alert("TollPlaza detection is OFF");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;