var args = arguments[0] || {};
console.log("JSON stringify args :" +JSON.stringify(args));
$.payView.url = args.url || "http://www.illinoistollway.com/tolls-and-i-pass/unpaid-tolls/unpaid-toll-opening-page";
console.log("url :" +args.url);
exports.openMainWindow = function(_tab) {
	_tab.open($.payWindow);
};