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
    this.__controllerPath = "paywindow";
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
    $.__views.payWindow = Ti.UI.createWindow({
        apiName: "Ti.UI.Window",
        id: "payWindow",
        modal: "true",
        classes: []
    });
    $.__views.payView = Ti.UI.createWebView({
        apiName: "Ti.UI.WebView",
        id: "payView",
        classes: []
    });
    $.__views.payWindow.add($.__views.payView);
    $.__views.paytab = Ti.UI.createTab({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "32dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        window: $.__views.payWindow,
        apiName: "Ti.UI.Tab",
        id: "paytab",
        title: "Pay",
        icon: "light_cart.png",
        classes: []
    });
    $.__views.paytab && $.addTopLevelView($.__views.paytab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log("JSON stringify args :" + JSON.stringify(args));
    $.payView.url = args.url || "http://www.illinoistollway.com/tolls-and-i-pass/unpaid-tolls/unpaid-toll-opening-page";
    console.log("url :" + args.url);
    exports.openMainWindow = function(_tab) {
        _tab.open($.payWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;