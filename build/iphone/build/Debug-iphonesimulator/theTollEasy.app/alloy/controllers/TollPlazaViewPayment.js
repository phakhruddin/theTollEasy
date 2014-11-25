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
    this.__controllerPath = "TollPlazaViewPayment";
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
    $.__views.win_payment = Ti.UI.createWindow({
        backgroundColor: "black",
        apiName: "Ti.UI.Window",
        id: "win_payment",
        title: "payment",
        classes: [ "container" ]
    });
    $.__views.win_payment && $.addTopLevelView($.__views.win_payment);
    var __alloyId33 = [];
    $.__views.tittle_toll_plaza = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tittle_toll_plaza",
        Title: "Toll Plaza View > ",
        classes: []
    });
    __alloyId33.push($.__views.tittle_toll_plaza);
    $.__views.listoftoll = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        text: "Your Cost is $1.75. Click to Pay  >",
        apiName: "Ti.UI.Label",
        id: "listoftoll",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.tittle_toll_plaza.add($.__views.listoftoll);
    $.__views.tableview_payment = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_payment",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId33.push($.__views.tableview_payment);
    $.__views.plazahit = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        apiName: "Ti.UI.Label",
        id: "plazahit",
        top: "5",
        left: "20",
        fontSize: "20",
        text: "Click for Location",
        classes: []
    });
    $.__views.tableview_payment.add($.__views.plazahit);
    $.__views.paymenttable = Ti.UI.createTableView({
        data: __alloyId33,
        apiName: "Ti.UI.TableView",
        id: "paymenttable",
        backgroundColor: "black",
        classes: []
    });
    $.__views.win_payment.add($.__views.paymenttable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainTollWindow = function(_tabone) {
        _tabone.open($.win_payment);
        console.debug("This is child window tollPlazaViewPayment.js" + _tabone);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;