function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "geobgexe";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.geobgexe = Ti.UI.createView({
        apiName: "Ti.UI.View",
        classes: [ "container" ],
        id: "geobgexe"
    });
    $.__views.geobgexe && $.addTopLevelView($.__views.geobgexe);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    alert("geobg: service has been invoked once, and will now be stopped to release it from memory. ");
    Ti.App.currentService.stop();
    Ti.App.currentService.addEventListener("stop", function() {
        alert("geobg: Although the service has been stopped, it is still registered and will be executed again on next pause");
        alert("geobg: As all background services are automatically stopped on resume, it is not always necessary to explicitly stop a service");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;