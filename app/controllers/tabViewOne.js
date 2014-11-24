var trigger1 = Titanium.App.Properties.getInt('trigger1',0);
var trigger2 = Titanium.App.Properties.getInt('trigger2',0);
var trigger3 = Titanium.App.Properties.getInt('trigger3',0);
var newdistanceFilter = Titanium.App.Properties.getInt('distanceFilter',0);

function openDetail(e) {
 console.debug("Test1 "+e);
 console.debug('row index = ' + JSON.stringify(e.index));
 Ti.API.info('row rowData = ' + JSON.stringify(e.rowData));
 Ti.API.info('row index = ' + JSON.stringify(e.index));
}


$.location.addEventListener ("click", function(e){
	console.debug('row index = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.rowData));
	console.debug("in open_button click event handler");

  // load the tabViewOneChild controller and call the index method
  var tabViewOneChildController = Alloy.createController("tabViewOneChild");

  // pass in the tab to give navigation and back button
  tabViewOneChildController.openMainWindow($.tab_one);
	
});

$.row_settings.addEventListener("click", function(e){
	var tabViewSettingsController = Alloy.createController("settings");
  // pass in the tab to give navigation and back button
  	tabViewSettingsController.openMainWindow($.tab_one);	
});

$.row_tpfound.addEventListener("click", function(e){
	var tabViewTV1TPFoundController = Alloy.createController("TV1TPFoundTable");
  // pass in the tab to give navigation and back button
  	tabViewTV1TPFoundController.openMainWindow($.tab_one);	
});

//* TIME DISPLAY 
var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var adhocContDateUpd = setInterval(function () {
	  //console.log("JSON stringify user :" +JSON.stringify(someDummy));
	  var date = new Date();
	  !Titanium.App.Properties.getString('currentaddr')? currentaddr = "no address detected" : currentaddr = Titanium.App.Properties.getString('currentaddr');
	  !Titanium.App.Properties.getString('outputclosesttollbydist0')? lastclosesttoll = "no closest toll found": lastclosesttoll = Titanium.App.Properties.getString('outputclosesttollbydist0');
	  if ( !Titanium.App.Properties.getString('currentHeading') ) { 
	  	var currentHeading = ""; 
	  	} else {
		  	var currentHeading = Titanium.App.Properties.getString('currentHeading');
		  	var currentHeading = parseFloat(currentHeading).toFixed(2);
		  	var currentHeading = "Current heading is "+currentHeading+" degrees from North";
	  	};
	  someDummy.set('localtime', date.getHours()+":"+("0"+date.getMinutes()).slice(-2)+":"+("0"+date.getSeconds()).slice(-2));
	  someDummy.set('localdate', date.toString().slice(0,16));
	  someDummy.set('currentaddr', currentaddr);
	  someDummy.set('lastclosesttoll', "TollPlaza "+lastclosesttoll.replace("distance : ","is ")+" ft away");
	  someDummy.set('currentHeading', currentHeading);
	  someDummy.set('gmttime', (new Date));
	}, 1000);
	
adhocContDateUpd=1;
	
$.switch_contupd.addEventListener("change", function(e){
	var switchValue = $.switch_contupd.value;
	Ti.API.info("switch value :" +switchValue);
	if ( switchValue == true ) {		
		Ti.API.info('Registering background services');
		if (Titanium.App.Properties.getInt('distanceFilter') == 0) {
			var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1-2.js'});
		} else {
			var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1-3.js'});
		}
		console.log("service after start is: "+JSON.stringify(service));
		Ti.API.info('*** Press home button to pause application ***');
	} else {
		var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1-2.js'});
		service.stop();
		service.unregister();
		console.log("stopping service :"+JSON.stringify(service));
		var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1-3.js'});
		service.stop();
		service.unregister();
   		console.log("stopping service :"+JSON.stringify(service));    
		alert("Detect TollPlaza is OFF");
	};
});

/*
$.label_contupd.addEventListener("click", function(e) {
	var tabViewgeobgController = Alloy.createController("geobg");
  	tabViewgeobgController.openMainWindow($.tab_one);	
});*/
