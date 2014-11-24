function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId25(e) {
        if (e && e.fromAdapter) return;
        __alloyId25.opts || {};
        var models = __alloyId24.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId21 = models[i];
            __alloyId21.__transform = transformFunction(__alloyId21);
            var __alloyId22 = Ti.UI.createTableViewRow({
                apiName: "Ti.UI.TableViewRow",
                title: "undefined" != typeof __alloyId21.__transform["title"] ? __alloyId21.__transform["title"] : __alloyId21.get("title"),
                classes: []
            });
            rows.push(__alloyId22);
            var __alloyId23 = Ti.UI.createLabel({
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "white",
                apiName: "Ti.UI.Label",
                text: "undefined" != typeof __alloyId21.__transform["title"] ? __alloyId21.__transform["title"] : __alloyId21.get("title"),
                classes: []
            });
            __alloyId22.add(__alloyId23);
        }
        $.__views.loaddatatable.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.title = transform.state + " Toll Plazas (" + transform.country + ")";
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1loadData";
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
    Alloy.Collections.instance("tollsource");
    $.__views.loaddatawindow = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "loaddatawindow",
        classes: [ "container" ],
        title: "TollEasy"
    });
    $.__views.search_loaddatatable = Ti.UI.createSearchBar({
        apiName: "Ti.UI.SearchBar",
        id: "search_loaddatatable",
        height: "24",
        classes: []
    });
    $.__views.loaddatatable = Ti.UI.createTableView({
        backgroundColor: "black",
        search: $.__views.search_loaddatatable,
        apiName: "Ti.UI.TableView",
        id: "loaddatatable",
        editable: "true",
        moveable: "true",
        classes: []
    });
    $.__views.loaddatawindow.add($.__views.loaddatatable);
    var __alloyId24 = Alloy.Collections["tollsource"] || tollsource;
    __alloyId24.on("fetch destroy change add remove reset", __alloyId25);
    $.__views.tab_loaddata = Ti.UI.createTab({
        window: $.__views.loaddatawindow,
        apiName: "Ti.UI.Tab",
        id: "tab_loaddata",
        title: "Load TollPlazas Loc",
        classes: []
    });
    $.__views.tab_loaddata && $.addTopLevelView($.__views.tab_loaddata);
    exports.destroy = function() {
        __alloyId24.off("fetch destroy change add remove reset", __alloyId25);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.updatetollsource();
    $.loaddatatable.search = $.search_loaddatatable;
    Alloy.Collections.tollsource.fetch();
    exports.openMainWindow = function(_tab) {
        _tab.open($.loaddatawindow);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.loaddatatable.addEventListener("click", function(e) {
            e.row.id;
            console.log("JSON e : " + JSON.stringify(e));
            Alloy.Globals.updateTollPlaza("newberlin");
            var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
            tabViewLoadDataOutputController.openMainWindow($.tab_loaddata);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;