function Controller() {
    function __alloyId29(e) {
        if (e && e.fromAdapter) return;
        __alloyId29.opts || {};
        var models = __alloyId28.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId25 = models[i];
            __alloyId25.__transform = transformFunction(__alloyId25);
            var __alloyId26 = Ti.UI.createTableViewRow({
                apiName: "Ti.UI.TableViewRow",
                title: "undefined" != typeof __alloyId25.__transform["title"] ? __alloyId25.__transform["title"] : __alloyId25.get("title"),
                classes: []
            });
            rows.push(__alloyId26);
            var __alloyId27 = Ti.UI.createLabel({
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                font: {
                    fontSize: "16",
                    fontStyle: "bold"
                },
                apiName: "Ti.UI.Label",
                color: "#D8D8BF",
                text: "undefined" != typeof __alloyId25.__transform["tollplaza"] ? __alloyId25.__transform["tollplaza"] : __alloyId25.get("tollplaza"),
                classes: []
            });
            __alloyId26.add(__alloyId27);
        }
        $.__views.table_loaddataoutput.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.title = transform.tollplaza + "," + transform.latitude + "," + transform.longitude + "," + transform.cost + "," + transform.hwy + "," + transform.note + "," + transform.timestamp;
        transform.timestamp = new Date(transform.timestamp);
        transform.latitude = "LAT : " + transform.latitude;
        transform.longitude = "LON: " + transform.longitude;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1loadDataOutput";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("tollplaza");
    $.__views.win_loaddataoutput = Ti.UI.createWindow({
        backgroundColor: "white",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "win_loaddataoutput",
        title: "TollPlazas Data",
        classes: [ "container" ]
    });
    $.__views.search_loaddataoutput = Ti.UI.createSearchBar({
        apiName: "Ti.UI.SearchBar",
        id: "search_loaddataoutput",
        height: "24",
        classes: []
    });
    $.__views.table_loaddataoutput = Ti.UI.createTableView({
        backgroundColor: "black",
        search: $.__views.search_loaddataoutput,
        apiName: "Ti.UI.TableView",
        id: "table_loaddataoutput",
        editable: "true",
        moveable: "true",
        classes: []
    });
    $.__views.win_loaddataoutput.add($.__views.table_loaddataoutput);
    var __alloyId28 = Alloy.Collections["tollplaza"] || tollplaza;
    __alloyId28.on("fetch destroy change add remove reset", __alloyId29);
    $.__views.tab_tv1loaddataoutput = Ti.UI.createTab({
        window: $.__views.win_loaddataoutput,
        apiName: "Ti.UI.Tab",
        id: "tab_tv1loaddataoutput",
        classes: []
    });
    $.__views.tab_tv1loaddataoutput && $.addTopLevelView($.__views.tab_tv1loaddataoutput);
    exports.destroy = function() {
        __alloyId28.off("fetch destroy change add remove reset", __alloyId29);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_loaddataoutput);
        console.log("fetching tollplaza");
        $.table_loaddataoutput.search = $.search_loaddataoutput;
        Alloy.Collections.tollplaza.fetch();
        $.win_loaddataoutput.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
            var title = e.row.title;
            var tolldata = title.split(",");
            var title = tolldata[0];
            var latitude = tolldata[1];
            var longitude = tolldata[2];
            var hwy = tolldata[4];
            console.log("title:lat:lon " + title + ":" + latitude + ":" + longitude);
            var tabViewTwoChildController = Alloy.createController("tabViewTwoChild", {
                title: title,
                latitude: latitude,
                longitude: longitude,
                hwy: hwy
            });
            tabViewTwoChildController.openMainTwoWindow($.tab_tv1loaddataoutput);
        });
    };
    $.table_loaddataoutput.addEventListener("delete", function(e) {
        console.log("JSON stringify e from table_tpfound : " + JSON.stringify(e));
        var title = e.row.title;
        var titlesplit = title.split(",");
        var tollplazadelete = titlesplit[0];
        var latdelete = titlesplit[1];
        console.log("tollplaza to be deleted is : " + tollplazadelete + " with lat: " + latdelete);
        Alloy.Collections.tollplaza.deleteTollPlaza(tollplazadelete);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;