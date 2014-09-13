var args = arguments[0] || {};
console.log("args.title : "+args.title);
exports.openMainWindow = function(_tab) {
	_tab.open($.win_tpftdetail);
	console.log("fetching found");
	Alloy.Collections.found.fetch();
	$.win_tpftdetail.addEventListener("click", function(e){
		console.log("JSON stringify e : "+JSON.stringify(e));
		var titledetail = e.row.title;
	});
};

var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

// title that was parsed in.
var tolldata = args.title.split(',');
var title = tolldata[0];
var latitude = tolldata[1];
var longitude = tolldata[2];
var cost = "Cost : "+tolldata[3];
var hwy = tolldata[4];
var note = tolldata[5];
var timestamp = tolldata[6];
console.log("title that was extracted "+title+" "+latitude+" "+longitude+" "+cost+" "+timestamp);

var lattext = "LAT :"+latitude;
var lontext = "LON :"+longitude;

someDummy.set('title', title);
someDummy.set('cost', cost);
someDummy.set('latitude', latitude);
someDummy.set('longitude', longitude);
someDummy.set('lattext', lattext);
someDummy.set('lontext', lontext);
someDummy.set('datetime', timestamp);

$.map.addEventListener("click",function(){
		console.log("title:lat:lon "+title+":"+latitude+":"+longitude);
		var tabViewTwoChildController = Alloy.createController('tabViewTwoChild',{
			title: title,
			latitude: latitude,
			longitude: longitude,
			hwy:hwy
		});
	  	tabViewTwoChildController.openMainTwoWindow($.tab_tpfounddetail);
});

$.row_pay.addEventListener("click",function(){
	var url = "http://www.illinoistollway.com/tolls-and-i-pass/unpaid-tolls/unpaid-toll-opening-page";
	/*
	var win = Titanium.UI.createWindow({
		fullscreen: true,
		tabBarHidden : true,
		navBarHidden: false,
		backgroundColor: "transparent",
		modal : true
	});	
	var webview = Ti.UI.createWebView({
    		url: url
	});
	win.add(webview);
	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 5,
			left: 10
	});
	var win1 = Titanium.UI.iOS.createNavigationWindow({
			Title: "Payment",
			backgroundColor: "transparent",
	   	  	window: win
	});
	win1.add(btnBack);
	btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing webview" +_tab);
	//		Ti.API.info("tab:" + JSON.stringify(_tab));
			win1.close();
	});
		win1.open();*/

var controller = Alloy.createController('paywindow', {url: url});
//controller.getView().open();
controller.openMainWindow($.tab_tpfounddetail);
});