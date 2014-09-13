function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1TPFTDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Models.instance("dummy");
    $.__views.win_tpftdetail = Ti.UI.createWindow({
        backgroundColor: "white",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "win_tpftdetail",
        title: "TollPlaza Details",
        classes: [ "container" ]
    });
    var __alloyId2 = [];
    $.__views.__alloyId3 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "gray",
        font: {
            fontSize: "30",
            fontStyle: "bold",
            fontColor: "yellow",
            color: "white"
        },
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "TollPlaza",
        id: "__alloyId3",
        classes: []
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.row_tollplaza = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "250",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        apiName: "Ti.UI.TableViewRow",
        id: "row_tollplaza",
        Title: "Toll Plaza ",
        classes: []
    });
    $.__views.__alloyId3.add($.__views.row_tollplaza);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#D8D8BF",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "title",
        top: "30",
        classes: []
    });
    $.__views.row_tollplaza.add($.__views.title);
    $.__views.cost = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "24dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "cost",
        top: "140",
        classes: []
    });
    $.__views.row_tollplaza.add($.__views.cost);
    $.__views.datetime = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "datetime",
        top: "174",
        classes: []
    });
    $.__views.row_tollplaza.add($.__views.datetime);
    $.__views.lat = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "lat",
        left: "20",
        top: "196",
        classes: []
    });
    $.__views.row_tollplaza.add($.__views.lat);
    $.__views.lon = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "lon",
        left: "190",
        top: "196",
        classes: []
    });
    $.__views.row_tollplaza.add($.__views.lon);
    $.__views.__alloyId4 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "gray",
        font: {
            fontSize: "30",
            fontStyle: "bold",
            fontColor: "yellow",
            color: "white"
        },
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "ACTION",
        id: "__alloyId4",
        classes: []
    });
    __alloyId2.push($.__views.__alloyId4);
    $.__views.row_map = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        apiName: "Ti.UI.TableViewRow",
        id: "row_map",
        left: "20",
        Title: "MAP ",
        classes: []
    });
    $.__views.__alloyId4.add($.__views.row_map);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        image: "dark_flag.png",
        left: "20",
        id: "__alloyId5",
        classes: []
    });
    $.__views.row_map.add($.__views.__alloyId5);
    $.__views.map = Ti.UI.createLabel({
        text: "Click to locate in a MAP >",
        apiName: "Ti.UI.Label",
        id: "map",
        color: "orange",
        classes: []
    });
    $.__views.row_map.add($.__views.map);
    $.__views.row_pay = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        apiName: "Ti.UI.TableViewRow",
        id: "row_pay",
        left: "20",
        Title: "Pay ",
        classes: []
    });
    $.__views.__alloyId4.add($.__views.row_pay);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        image: "dark_download.png",
        right: "20",
        id: "__alloyId6",
        classes: []
    });
    $.__views.row_pay.add($.__views.__alloyId6);
    $.__views.pay = Ti.UI.createLabel({
        text: "Click on cart below to pay",
        apiName: "Ti.UI.Label",
        id: "pay",
        color: "orange",
        classes: []
    });
    $.__views.row_pay.add($.__views.pay);
    $.__views.__alloyId7 = Alloy.createController("paywindow", {
        apiName: "Alloy.Require",
        id: "__alloyId7",
        classes: [],
        __parentSymbol: $.__views.row_pay
    });
    $.__views.__alloyId7.setParent($.__views.row_pay);
    $.__views.table_tpftdetail = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId2,
        apiName: "Ti.UI.TableView",
        id: "table_tpftdetail",
        classes: []
    });
    $.__views.win_tpftdetail.add($.__views.table_tpftdetail);
    $.__views.tab_tpfounddetail = Ti.UI.createTab({
        window: $.__views.win_tpftdetail,
        apiName: "Ti.UI.Tab",
        id: "tab_tpfounddetail",
        classes: []
    });
    $.__views.tab_tpfounddetail && $.addTopLevelView($.__views.tab_tpfounddetail);
    var __alloyId8 = function() {
        $.title.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["title"] : Alloy.Models.dummy.get("title");
        $.title.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["title"] : Alloy.Models.dummy.get("title");
        $.cost.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["cost"] : Alloy.Models.dummy.get("cost");
        $.cost.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["cost"] : Alloy.Models.dummy.get("cost");
        $.datetime.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["datetime"] : Alloy.Models.dummy.get("datetime");
        $.datetime.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["datetime"] : Alloy.Models.dummy.get("datetime");
        $.lat.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lattext"] : Alloy.Models.dummy.get("lattext");
        $.lat.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lattext"] : Alloy.Models.dummy.get("lattext");
        $.lon.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lontext"] : Alloy.Models.dummy.get("lontext");
        $.lon.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lontext"] : Alloy.Models.dummy.get("lontext");
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId8);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId8);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log("args.title : " + args.title);
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_tpftdetail);
        console.log("fetching found");
        Alloy.Collections.found.fetch();
        $.win_tpftdetail.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
            e.row.title;
        });
    };
    var someDummy = Alloy.Models.dummy;
    console.log("stringify dummy :" + JSON.stringify(someDummy));
    someDummy.set("id", "1234");
    someDummy.fetch();
    var tolldata = args.title.split(",");
    var title = tolldata[0];
    var latitude = tolldata[1];
    var longitude = tolldata[2];
    var cost = "Cost : " + tolldata[3];
    var hwy = tolldata[4];
    tolldata[5];
    var timestamp = tolldata[6];
    console.log("title that was extracted " + title + " " + latitude + " " + longitude + " " + cost + " " + timestamp);
    var lattext = "LAT :" + latitude;
    var lontext = "LON :" + longitude;
    someDummy.set("title", title);
    someDummy.set("cost", cost);
    someDummy.set("latitude", latitude);
    someDummy.set("longitude", longitude);
    someDummy.set("lattext", lattext);
    someDummy.set("lontext", lontext);
    someDummy.set("datetime", timestamp);
    $.map.addEventListener("click", function() {
        console.log("title:lat:lon " + title + ":" + latitude + ":" + longitude);
        var tabViewTwoChildController = Alloy.createController("tabViewTwoChild", {
            title: title,
            latitude: latitude,
            longitude: longitude,
            hwy: hwy
        });
        tabViewTwoChildController.openMainTwoWindow($.tab_tpfounddetail);
    });
    $.row_pay.addEventListener("click", function() {
        var url = "http://www.illinoistollway.com/tolls-and-i-pass/unpaid-tolls/unpaid-toll-opening-page";
        var controller = Alloy.createController("paywindow", {
            url: url
        });
        controller.openMainWindow($.tab_tpfounddetail);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;