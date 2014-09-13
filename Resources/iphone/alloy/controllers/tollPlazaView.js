function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tollPlazaView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win_tollplaza = Ti.UI.createWindow({
        backgroundColor: "black",
        apiName: "Ti.UI.Window",
        id: "win_tollplaza",
        title: "TollPlaza",
        classes: [ "container" ]
    });
    var __alloyId78 = [];
    $.__views.tittle_toll_plaza = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tittle_toll_plaza",
        Title: "Toll Plaza View > ",
        classes: []
    });
    __alloyId78.push($.__views.tittle_toll_plaza);
    $.__views.listoftoll = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        text: "Toll Plaza View >",
        apiName: "Ti.UI.Label",
        id: "listoftoll",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.tittle_toll_plaza.add($.__views.listoftoll);
    $.__views.tableview_tollplaza_hit = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza_hit",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza_hit);
    $.__views.plazahit = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        apiName: "Ti.UI.Label",
        id: "plazahit",
        top: "5",
        left: "20",
        fontSize: "20",
        text: "Toll plazas that was hit today",
        classes: []
    });
    $.__views.tableview_tollplaza_hit.add($.__views.plazahit);
    $.__views.tableview_tollplaza = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza);
    $.__views.plaza = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza",
        top: "5",
        left: "20",
        text: "Plaza 21 Waukegan IL >",
        classes: []
    });
    $.__views.tableview_tollplaza.add($.__views.plaza);
    $.__views.tableview_tollplaza1 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza1",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza1);
    $.__views.plaza1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza1",
        top: "5",
        left: "20",
        text: "Plaza 24 Edens Spur IL >",
        classes: []
    });
    $.__views.tableview_tollplaza1.add($.__views.plaza1);
    $.__views.tableview_tollplaza2 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza2",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza2);
    $.__views.plaza2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza2",
        top: "5",
        left: "20",
        text: "Plaza 31 O'Hare West IL >",
        classes: []
    });
    $.__views.tableview_tollplaza2.add($.__views.plaza2);
    $.__views.tableview_tollplaza3 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza3",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza3);
    $.__views.plaz3 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaz3",
        top: "5",
        left: "20",
        text: "Plaza 35 Cermak Road  IL >",
        classes: []
    });
    $.__views.tableview_tollplaza3.add($.__views.plaz3);
    $.__views.tableview_tollplaza4 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza4",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza4);
    $.__views.plaz4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaz4",
        top: "5",
        left: "20",
        text: "Plaza 36 82nd Street IL >",
        classes: []
    });
    $.__views.tableview_tollplaza4.add($.__views.plaz4);
    $.__views.tableview_tollplaza5 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza5",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza5);
    $.__views.plaza5 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza5",
        top: "5",
        left: "20",
        text: "Plaza 39 83rd Street IL >",
        classes: []
    });
    $.__views.tableview_tollplaza5.add($.__views.plaza5);
    $.__views.tableview_tollplaza6 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza6",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza6);
    $.__views.plaza6 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza6",
        top: "5",
        left: "20",
        text: "Plaza 43 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza6.add($.__views.plaza6);
    $.__views.tableview_tollplaza7 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza7",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza7);
    $.__views.plaza7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza7",
        top: "5",
        left: "20",
        text: "Plaza 44 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza7.add($.__views.plaza7);
    $.__views.tableview_tollplaza8 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza8",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza8);
    $.__views.plaza8 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza8",
        top: "5",
        left: "20",
        text: "Plaza 45 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza8.add($.__views.plaza8);
    $.__views.tableview_tollplaza9 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza9",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza9);
    $.__views.plaza9 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza9",
        top: "5",
        left: "20",
        text: "Plaza 46 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza9.add($.__views.plaza9);
    $.__views.tableview_tollplaza10 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza10",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza10);
    $.__views.plaza10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza10",
        top: "5",
        left: "20",
        text: "Plaza 47 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza10.add($.__views.plaza10);
    $.__views.tableview_tollplaza11 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza11",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza11);
    $.__views.plaza11 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza11",
        top: "5",
        left: "20",
        text: "Plaza 48 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza11.add($.__views.plaza11);
    $.__views.tableview_tollplaza12 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza12",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza12);
    $.__views.plaza12 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza12",
        top: "5",
        left: "20",
        text: "Plaza 49 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza12.add($.__views.plaza12);
    $.__views.tableview_tollplaza13 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza13",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza13);
    $.__views.plaza13 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza13",
        top: "5",
        left: "20",
        text: "Plaza 50 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza13.add($.__views.plaza13);
    $.__views.tableview_tollplaza14 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza14",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza14);
    $.__views.plaza14 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza14",
        top: "5",
        left: "20",
        text: "Plaza 51 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza14.add($.__views.plaza14);
    $.__views.tableview_tollplaza15 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza15",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza15);
    $.__views.plaza15 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza15",
        top: "5",
        left: "20",
        text: "Plaza 52 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza15.add($.__views.plaza15);
    $.__views.tableview_tollplaza16 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza16",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza16);
    $.__views.plaza16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza16",
        top: "5",
        left: "20",
        text: "Plaza 53 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza16.add($.__views.plaza16);
    $.__views.tableview_tollplaza17 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza17",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza17);
    $.__views.plaza17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza17",
        top: "5",
        left: "20",
        text: "Plaza 54 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza17.add($.__views.plaza17);
    $.__views.tableview_tollplaza18 = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "tableview_tollplaza18",
        Title: "Toll Plazas",
        classes: []
    });
    __alloyId78.push($.__views.tableview_tollplaza18);
    $.__views.plaza18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#D8D8BF",
        apiName: "Ti.UI.Label",
        id: "plaza18",
        top: "5",
        left: "20",
        text: "Plaza 55 I-80, Westbound IL >",
        classes: []
    });
    $.__views.tableview_tollplaza18.add($.__views.plaza18);
    $.__views.tollplazatable = Ti.UI.createTableView({
        data: __alloyId78,
        apiName: "Ti.UI.TableView",
        id: "tollplazatable",
        backgroundColor: "black",
        editable: "true",
        moveable: "true",
        classes: []
    });
    $.__views.win_tollplaza.add($.__views.tollplazatable);
    $.__views.tab_tollplaza = Ti.UI.createTab({
        window: $.__views.win_tollplaza,
        apiName: "Ti.UI.Tab",
        id: "tab_tollplaza",
        title: "List View",
        classes: []
    });
    $.__views.tab_tollplaza && $.addTopLevelView($.__views.tab_tollplaza);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tabone) {
        _tabone.open($.win_tollplaza);
        console.debug("This is child window tollPlazaView.js" + _tabone);
        $.tollplazatable.addEventListener("click", function(e) {
            console.debug("row index = " + JSON.stringify(e.index));
            Ti.API.info("row rowData = " + JSON.stringify(e.index));
            Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
            console.debug("in open_button click event handler");
            var tabTollPlazaViewController = Alloy.createController("TollPlazaViewPayment");
            tabTollPlazaViewController.openMainTollWindow($.tab_tollplaza);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;