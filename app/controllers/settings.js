var args = arguments[0] || {};
//var distanceFilter = 0;
var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

function display () {
someDummy.set('distanceFilter', "Distance Filter : "+Titanium.App.Properties.getInt("distanceFilter", 0 ));
someDummy.set('detectionRange', "Detection Range : "+Titanium.App.Properties.getInt("detectionRange", 0 ));
};

display();

Titanium.App.Properties.getInt('maildebug') == 1 && someDummy.set('debugvalue',true);
Titanium.App.Properties.getInt('mindebug') == 1 && someDummy.set('mindebugvalue',true);

exports.openMainWindow = function(_tab) {
  _tab.open($.win_settings);
  console.debug("This is child widow settings.js" +_tab);
};

!Titanium.App.Properties.getString('loc') ? loc = "newberlin" : loc = Titanium.App.Properties.getString('loc');

$.switch_contupdfg.addEventListener("change", function(e){
	var switchFGValue = $.switch_contupdfg.value;
	Ti.API.info("switch value :" +switchFGValue);
	if ( switchFGValue == true ) {
		Alloy.Globals.eventDetectTollPlaza("newberlin","add");
		alert("Detect TollPlaza is ON");
	} else {
		Alloy.Globals.eventDetectTollPlaza("newberlin","remove");
		alert("Detect TollPlaza is OFF");
	};
});

$.row_loaddata.addEventListener("click", function(e){
	var tabViewLoadDataController = Alloy.createController("TV1loadData");
  // pass in the tab to give navigation and back button
  	tabViewLoadDataController.openMainWindow($.tab_settings);	
});

$.row_loaddataoutput.addEventListener("click", function(e){
	var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
  // pass in the tab to give navigation and back button
  	tabViewLoadDataOutputController.openMainWindow($.tab_settings);	
});

$.switch_debug.addEventListener("change", function(e){
	var switchdebugValue = $.switch_debug.value;
	Ti.API.info("debugging is :" +switchdebugValue);
	if ( switchdebugValue == true ) {
		Titanium.App.Properties.setInt('maildebug', "1") ; someDummy.set('debugvalue',true);
	} else {
		Titanium.App.Properties.setInt('maildebug', "0") ; someDummy.set('debugvalue',false);
	};
});

$.switch_mindebug.addEventListener("change", function(e){
	var switchmindebugValue = $.switch_mindebug.value;
	Ti.API.info("Minimum debugging is :" +switchmindebugValue);
	if ( switchmindebugValue == true ) {
		Titanium.App.Properties.setInt('mindebug', "1"); someDummy.set('mindebugvalue',true);
	} else {
		Titanium.App.Properties.setInt('mindebug', "0"); someDummy.set('mindebugvalue',false);
	};
});
/*
$.label_skinwhite.addEventListener("click", function(e){
	//alloy
});
*/

function sendEmail(loc) {	
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "TheTollEasy debug data";
	emailDialog.toRecipients = ['phakhruddin@gmail.com'];
	emailDialog.messageBody = 'Debug data on '+new Date();
	var ftxt1 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'maildebug.txt');
	var ftxt2 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,loc+'.txt');
	var ftxt3 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,loc+'1.txt');
	var location = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'location.txt');
	emailDialog.addAttachment(ftxt1);
	emailDialog.addAttachment(ftxt2);
	emailDialog.addAttachment(ftxt3);
	emailDialog.addAttachment(location);
	emailDialog.open();
};

$.label_emaildebug.addEventListener("click", function(){
	sendEmail();
});

function csvJSON(csv){
 
	var lines=csv.split("\n");
	 
	var result = [];
	 
	var headers=lines[0].split(",");
	 
	for(var i=1;i<lines.length;i++){
	 
	var obj = {};
	var currentline=lines[i].split(",");
	 
	for(var j=0;j<headers.length;j++){
	obj[headers[j]] = currentline[j];
	}
	 
	result.push(obj);
	 
	}
	//return result; //JavaScript object
	return JSON.stringify(result); //JSON
}

$.label_caplocdata.addEventListener("click", function(){
	
  	var locfile = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, "location.txt"
			);
	
	if(locfile.exists()) {
	var contentsin = locfile.read();
	var contents = csvJSON(contentsin.text);
	console.log(contents);
	var contents = JSON.parse(contents);
	for (var i=0; i < +contents.length; i++) {	
		!contents[i].Date?Update=0:Update=1;
		console.log("Updating location DB with :"+contents[i].Date+","+contents[i].LAT+","+contents[i].LON+","+contents[i].Timestamp);
		if(Update == 1) {
		Alloy.Collections.plazano.deleteTollPlaza(contents[i].Date);
		var locationModel = Alloy.createModel("plazano",{
			tollplaza : contents[i].Date,
			latitude : contents[i].LAT,
			longitude :  contents[i].LON,					
			altitude : "0",
			heading : "0",
			speed : "0",
			hwy : "0",
			accuracy : "0",
			timestamp : contents[i].Timestamp,
			altitudeAccuracy: "0",
			cost: "0",
			source : "0",
			location : "none",
			note : "none"
		});	
		locationModel.save();
		}		
	}
	} else {
		console.log("no locfile");
	}
	
	
	var tabViewCapLocDataController = Alloy.createController("caplocdata");
  	tabViewCapLocDataController.openMainWindow($.tab_settings);	
	  	
});
/*
$.distanceFilter_tf.addEventListener("focus", function(){
 	$.save_distanceFilter_button.show();
 });
 
$.save_distanceFilter_button.addEventListener('click', function(_e) {
    $.detectionRange_tf.blur();
    var newdistanceFilter = $.distanceFilter_tf.value;
    Titanium.App.Properties.setInt("distanceFilter", newdistanceFilter );
    console.log("distance Filter value is set to: "+Titanium.App.Properties.getInt('distanceFilter')+" and :" +newdistanceFilter);
    $.save_distanceFilter_button.hide();
    display();
 });
 
 $.detectionRange_tf.addEventListener("focus", function(){
 	$.save_detectionRange_button.show();
 });
 
$.save_detectionRange_button.addEventListener('click', function(_e) {
    $.detectionRange_tf.blur();
    var detectionRange = $.detectionRange_tf.value;
    Titanium.App.Properties.setInt("detectionRange", detectionRange );
    console.log("detection Range value is set to: "+Titanium.App.Properties.getInt('detectionRange')+" and :" +detectionRange);
    $.save_detectionRange_button.hide();
    display();
 });


 $.table_settings.addEventListener("click" , function(){
 	$.detectionRange_tf.blur();
 	$.distanceFilter_tf.blur();
 });
*/
