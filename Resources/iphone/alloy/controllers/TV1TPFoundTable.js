function Controller() {
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = transformFunction(__alloyId11);
            var __alloyId12 = Ti.UI.createTableViewRow({
                apiName: "Ti.UI.TableViewRow",
                height: Ti.UI.SIZE,
                title: "undefined" != typeof __alloyId11.__transform["title"] ? __alloyId11.__transform["title"] : __alloyId11.get("title"),
                classes: []
            });
            rows.push(__alloyId12);
            var __alloyId13 = Ti.UI.createLabel({
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "20dp",
                    fontStyle: "bold",
                    fontWeight: "normal"
                },
                apiName: "Ti.UI.Label",
                top: "5",
                color: "#D8D8BF",
                width: "300",
                height: Ti.UI.SIZE,
                text: "undefined" != typeof __alloyId11.__transform["tollplaza"] ? __alloyId11.__transform["tollplaza"] : __alloyId11.get("tollplaza"),
                classes: []
            });
            __alloyId12.add(__alloyId13);
            var __alloyId15 = Ti.UI.createImageView({
                apiName: "Ti.UI.ImageView",
                image: "dark_info.png",
                top: "30",
                right: "10",
                classes: []
            });
            __alloyId12.add(__alloyId15);
            var __alloyId16 = Ti.UI.createLabel({
                color: "gray",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "10dp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                apiName: "Ti.UI.Label",
                top: "50",
                text: "undefined" != typeof __alloyId11.__transform["custom"] ? __alloyId11.__transform["custom"] : __alloyId11.get("custom"),
                classes: []
            });
            __alloyId12.add(__alloyId16);
        }
        $.__views.table_tpfound.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.orgtimestamp = transform.timestamp;
        transform.timestamp = new Date(transform.timestamp);
        transform.title = transform.tollplaza + "," + transform.latitude + "," + transform.longitude + "," + transform.cost + "," + transform.hwy + "," + transform.note + "," + transform.timestamp + "," + transform.orgtimestamp;
        transform.tollplaza = transform.tollplaza;
        transform.cost = " Your cost is $" + transform.cost + ", click for details.";
        transform.custom = " Detected on " + transform.timestamp;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1TPFoundTable";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    $.__views.win_tpfound = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "win_tpfound",
        title: "TollPlaza Detected",
        classes: [ "container" ]
    });
    $.__views.search_tpfound = Ti.UI.createSearchBar({
        apiName: "Ti.UI.SearchBar",
        id: "search_tpfound",
        height: "24",
        classes: []
    });
    $.__views.table_tpfound = Ti.UI.createTableView({
        backgroundColor: "black",
        search: $.__views.search_tpfound,
        apiName: "Ti.UI.TableView",
        id: "table_tpfound",
        editable: "true",
        moveable: "true",
        classes: []
    });
    $.__views.win_tpfound.add($.__views.table_tpfound);
    var __alloyId17 = Alloy.Collections["found"] || found;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    $.__views.tab_tpfound = Ti.UI.createTab({
        window: $.__views.win_tpfound,
        apiName: "Ti.UI.Tab",
        id: "tab_tpfound",
        classes: []
    });
    $.__views.tab_tpfound && $.addTopLevelView($.__views.tab_tpfound);
    exports.destroy = function() {
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_tpfound);
        $.table_tpfound.search = $.search_tpfound;
        $.win_tpfound.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
            var title = e.row.title;
            var tabViewTV1TPFTDetailController = Alloy.createController("TV1TPFTDetail", {
                title: title
            });
            tabViewTV1TPFTDetailController.openMainWindow($.tab_tpfound);
        });
    };
    $.table_tpfound.addEventListener("delete", function(e) {
        console.log("JSON stringify e from table_tpfound : " + JSON.stringify(e));
        var title = e.row.title;
        var titlesplit = title.split(",");
        var timestampdelete = titlesplit[7];
        titlesplit[0];
        console.log("timestamp to be deleted is : " + timestampdelete);
        Alloy.Collections.found.deleteTimestamp(timestampdelete);
    });
    console.log("fetching found");
    Alloy.Collections.found.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;