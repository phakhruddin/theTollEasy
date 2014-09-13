// this is the exported function that opens the controller and displays
// the main window
exports.openMainWindow = function(_tab) {
  _tab.open($.child_window);
  console.debug("This is child widow tabViewOneChild.js" +_tab);
  $.check_loc.addEventListener("click", function(e) {
		Alloy.Globals.checkLoc();
	});
	// checkLocation on some intervals.
	//setInterval(function(){checkLoc();},60000);
};

var globalgetLoc = Alloy.Globals.getLocation;

var getLocation = function() {	
// JSON Data - in future. REST call to outside
var chicago = '{"poi":[{"plaza":"0","latitude":"A1","longitude":"A1","altitude":"99.99","heading":"north","speed":"","hwy":"amazon.com"},{"name":"john","count":2},{"name":"joe","count":3}]}';
var poiObject = JSON.parse(chicago) ;
var theplaza = poiObject.poi[0].plaza ;
var url = "http://23.21.53.150:10000/data";
//var url = "http://127.0.0.1:10000/data";
var table = Ti.UI.createTableView();
var tableData = [];
var json, fighters, fighter, i, row, nameLabel, nickLabel;
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
    try {
		// parse the retrieved data, turning it into a JavaScript object
    	json = JSON.parse(this.responseText);
    	var file1 = Ti.Filesystem.getFile(
			Ti.Filesystem.tempDirectory, 'chicago.txt'
		);
		var file2 = Ti.Filesystem.getFile(
			Ti.Filesystem.tempDirectory, 'json.txt'
		);
		file1.write(chicago);
		file2.write(this.responseText);
		var x=1;
		Ti.Api.info("check chicago: "+chicago);
    	var plaza1 = json.poi[0].plaza ;
    	Ti.Api.info('data1: ' + plaza1 );
    	//alert("plaza : "+plaza1);
    	return plaza1;
		// ...
		} catch(e){
			Ti.API.info("cathing e: "+e);
		}
	}
});
xhr.onerror = function(e){
alert(e);
};
xhr.open("GET", url);
xhr.send();
return theplaza;

};
//alert("Hitting Plaza: "+theplaza);

// TollEasy start
// GPS need to be enabled.
var checkLoc = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            Ti.API.info(e.coords);
	            var coordslat =  e.coords.latitude;
	            console.debug("thetollplaza: "+thetollplaza);
	            alert( "latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude);
	        }
	    });
	} else {
	    alert('Please enable location services');
	}
};