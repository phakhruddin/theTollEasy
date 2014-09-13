function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "payment";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.payment = Ti.UI.createWindow({
        id: "payment",
        title: "payment"
    });
    $.__views.payment && $.addTopLevelView($.__views.payment);
    var __alloyId4 = [];
    $.__views.tittle_payment = Ti.UI.createTableViewRow({
        id: "tittle_payment",
        Title: "Payment View > "
    });
    __alloyId4.push($.__views.tittle_payment);
    $.__views.listoftoll = Ti.UI.createLabel({
        text: "Payment View >",
        id: "listoftoll",
        color: "orange",
        top: "5",
        left: "20"
    });
    $.__views.tittle_payment.add($.__views.listoftoll);
    $.__views.payments = Ti.UI.createTableViewRow({
        id: "payments",
        Title: "Payments"
    });
    __alloyId4.push($.__views.payments);
    $.__views.paymenthit = Ti.UI.createLabel({
        id: "paymenthit",
        color: "orange",
        top: "5",
        left: "20",
        fontSize: "20",
        text: "Your Cost is $1.75. Click to Pay > "
    });
    $.__views.payments.add($.__views.paymenthit);
    $.__views.payments = Ti.UI.createTableViewRow({
        id: "payments",
        Title: "Payments"
    });
    __alloyId4.push($.__views.payments);
    $.__views.payment = Ti.UI.createLabel({
        id: "payment",
        color: "#D8D8BF",
        top: "5",
        left: "20",
        text: "Plaza Map >"
    });
    $.__views.payments.add($.__views.payment);
    $.__views.paymenttable = Ti.UI.createTableView({
        data: __alloyId4,
        id: "paymenttable",
        backgroundColor: "black"
    });
    $.__views.payment.add($.__views.paymenttable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tabone) {
        _tabone.open($.payment);
        console.debug("This is child window tollPlazaView.js" + _tabone);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;