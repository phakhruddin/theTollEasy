function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bg-service2";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var count = Ti.App.Properties.getInt("bg-svc2-count", 0);
    count > 4 && (count = 0);
    count++;
    Ti.App.Properties.setInt("bg-svc2-count", count);
    Ti.API.info("bg-service2 has been run " + count + " times");
    if (count > 4) {
        Ti.App.currentService.unregister();
        Ti.App.iOS.scheduleLocalNotification({
            alertBody: "bg-service2: As service has been invoked more than 4 times, it has been unregistered and will NOT run again. Relaunch the app to re-register it",
            date: new Date(new Date().getTime() + 1e3)
        });
    } else Ti.App.iOS.scheduleLocalNotification({
        alertBody: "bg-service2: has been invoked " + count + " times. It is still registered and will run again when the app is transitioned to the background",
        date: new Date(new Date().getTime() + 1e3)
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;