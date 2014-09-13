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
        barColor: "#6d0a0c",
        id: "win_tpftdetail",
        title: "TollPlaza"
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
        headerTitle: "TollPlaza",
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.row_tollplaza = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "100",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "row_tollplaza",
        Title: "Toll Plaza "
    });
    $.__views.__alloyId3.add($.__views.row_tollplaza);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        font: {
            fontFamily: "Helvetica",
            fontSize: "40dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        id: "title"
    });
    $.__views.row_tollplaza.add($.__views.title);
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
        headerTitle: "Cost",
        id: "__alloyId4"
    });
    __alloyId2.push($.__views.__alloyId4);
    $.__views.row_cost = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "50",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "row_cost",
        Title: "Cost "
    });
    $.__views.__alloyId4.add($.__views.row_cost);
    $.__views.cost = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "blue",
        font: {
            fontFamily: "Helvetica",
            fontSize: "25dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        id: "cost"
    });
    $.__views.row_cost.add($.__views.cost);
    $.__views.__alloyId5 = Ti.UI.createTableViewSection({
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
        headerTitle: "GEO Coordinates",
        id: "__alloyId5"
    });
    __alloyId2.push($.__views.__alloyId5);
    $.__views.row_latlon = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "50",
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "row_latlon",
        Title: "Latitude / Longitude "
    });
    $.__views.__alloyId5.add($.__views.row_latlon);
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
        id: "lat",
        left: "40"
    });
    $.__views.row_latlon.add($.__views.lat);
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
        id: "lon",
        left: "210"
    });
    $.__views.row_latlon.add($.__views.lon);
    $.__views.__alloyId6 = Ti.UI.createTableViewSection({
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
        headerTitle: "ACTION",
        id: "__alloyId6"
    });
    __alloyId2.push($.__views.__alloyId6);
    $.__views.row_pay = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "row_pay",
        left: "20",
        Title: "Pay "
    });
    $.__views.__alloyId6.add($.__views.row_pay);
    $.__views.pay = Ti.UI.createLabel({
        text: "Click to Pay >",
        id: "pay",
        color: "orange"
    });
    $.__views.row_pay.add($.__views.pay);
    $.__views.row_map = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        backgroundColor: "black",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "row_map",
        left: "20",
        Title: "MAP "
    });
    $.__views.__alloyId6.add($.__views.row_map);
    $.__views.map = Ti.UI.createLabel({
        text: "Click to locate in a MAP >",
        id: "map",
        color: "orange"
    });
    $.__views.row_map.add($.__views.map);
    $.__views.table_tpftdetail = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId2,
        id: "table_tpftdetail"
    });
    $.__views.win_tpftdetail.add($.__views.table_tpftdetail);
    $.__views.tab_tpfounddetail = Ti.UI.createTab({
        window: $.__views.win_tpftdetail,
        id: "tab_tpfounddetail"
    });
    $.__views.tab_tpfounddetail && $.addTopLevelView($.__views.tab_tpfounddetail);
    var __alloyId7 = function() {
        $.title.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["title"] : Alloy.Models.dummy.get("title");
        $.title.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["title"] : Alloy.Models.dummy.get("title");
        $.cost.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["cost"] : Alloy.Models.dummy.get("cost");
        $.cost.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["cost"] : Alloy.Models.dummy.get("cost");
        $.lat.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lattext"] : Alloy.Models.dummy.get("lattext");
        $.lat.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lattext"] : Alloy.Models.dummy.get("lattext");
        $.lon.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lontext"] : Alloy.Models.dummy.get("lontext");
        $.lon.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lontext"] : Alloy.Models.dummy.get("lontext");
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId7);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId7);
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
    var cost = tolldata[3];
    var hwy = tolldata[4];
    tolldata[5];
    console.log("title that was extracted " + title + " " + latitude + " " + longitude + " " + cost);
    var lattext = "LAT :" + latitude;
    var lontext = "LON :" + longitude;
    someDummy.set("title", title);
    someDummy.set("cost", cost);
    someDummy.set("latitude", latitude);
    someDummy.set("longitude", longitude);
    someDummy.set("lattext", lattext);
    someDummy.set("lontext", lontext);
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;