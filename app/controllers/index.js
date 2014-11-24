$.index.open();

// make sure GPS is running.
if (Ti.Geolocation.locationServicesEnabled) {
    // perform other operations with Ti.Geolocation
} else {
    alert('In order for theTollEasy to capture tollplazas. Please enable location services. Thanks.');
}
// Start tollPlaza Detect on the FG
//Alloy.Globals.eventDetectTollPlaza(loc,"add");



// initialize variable
var action = "add";
var trackingEnabled = false ; Titanium.App.Properties.setInt('complextracking',0);
var simpletrackingEnabled = false ; Titanium.App.Properties.setInt('simpletracking',0);
Titanium.App.Properties.setInt('maildebug',0);
Titanium.App.Properties.setInt('count', 0); // reset counter
//maildebug is disabled initially.
var maildebug = 0; Titanium.App.Properties.setInt('maildebug',0);
!Titanium.App.Properties.getString('loc') ? loc = "newberlin" : loc = Titanium.App.Properties.getString('loc');
var firstplazadist = 10000;Titanium.App.Properties.setInt('firstplazadist',firstplazadist);

// BG
var debugfile = "maildebug.txt";
var locfile = "location.txt";
var thefile = loc+".txt";
var file4 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
var thefile5 = loc+"1.txt";
var file5 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile5
			);
var contents = file4.read() || file5.read();
if(!contents){
	console.log("contents is empty, download tollplaza information");
	Alloy.Globals.updateTollPlaza("newberlin");
}
//*console.log("contents text :" +contents.text);
if(contents && contents.text){
		var preParseData = (contents.text); 
		var json = json || JSON.parse(preParseData);
}

var mmsg = "json data : "+JSON.stringify(json);
(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
var lon1 = lat1 = time1 = timelastdebug = 0;

var locationCallback = function(e)
{
	if(trackingEnabled) {
		var lon1 = +e.coords.longitude;
		var lat1 = +e.coords.latitude;
		var time1 = +e.coords.timestamp;
		var mmsg = (new Date(time1))+','+time1+','+lat1+','+lon1;
		var count = Titanium.App.Properties.getInt('count', count);count++;
		console.log(mmsg);
      	if((Titanium.App.Properties.getInt('mindebug'))==1 && count >= 30){	//log loc to debug file every 30 secs
	      	console.log(mmsg+" should be appended to maildebug.txt");	
			Alloy.Globals.appendFile(mmsg,locfile);
			var count = 0;
		}
		Titanium.App.Properties.setInt('count', count);
		Titanium.Geolocation.reverseGeocoder(lat1,lon1,function(evt)
		{
			if (evt.success) {
				var places = evt.places;
				if (places && places.length) {
					currentaddr = places[0].address;
				} else {
					currentaddr = "No address found";
				}
				Titanium.App.Properties.setString('currentaddr', currentaddr);
				//*console.log("currentaddr :" +currentaddr);
				Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
			}
			else {
				//*Ti.API.info("Code translation: "+JSON.stringify(e.code));
			}
		});	
		   //JSON FILE
		for (i=0;i< json.poi.length;i++){
		   		var tolltollplaza = json.poi[i].plaza;
		   		var lat2 = json.poi[i].latitude;
		   		var lon2 = json.poi[i].longitude;
		   		var alt2 = thearray[i].altitude;
		   		var head2 = thearray[i].heading;
		   		var hwy = thearray[i].hwy;
		   		var cost = thearray[i].cost;
		   		var type = thearray[i].type;
		   		var note = thearray[i].note;
		   		var dist = Alloy.Globals.calcDistance(lat1,lon1,lat2,lon2,"F");
		        	distmatch.push({
		        		tolltollplaza:tolltollplaza, 
		        		dist:dist,
		        		latitude:lat2,
		        		longitude:lon2,
		        		altitude:alt2,
		        		heading:head2,
		        		hwy:hwy,
		        		cost:cost,
		        		type:type,
		        		note:note
		        });		        			   	
		   }	   		   
		   // JSON FILE ENDS
		//*console.log("JSON distance unsort :" +JSON.stringify(distmatch));
		var closestdist = distmatch.sort(function(a, b)
		{
			return a.dist - b.dist;
		});
		//*console.log("JSON distance SORT :" +JSON.stringify(closestdist));
		var closesttollbydist = closestdist[0].tolltollplaza;
		var closesttollbydist0 = closestdist[0].tolltollplaza;
		var closestdist0 = closestdist[0].dist;
		var closesttollbydist1 = closestdist[1].tolltollplaza;
		var closestdist1 = closestdist[1].dist;
		var closesttollbydist2 = closestdist[2].tolltollplaza;
		var closestdist2 = closestdist[2].dist;
		var outputclosesttollbydist0 = closestdist[0].tolltollplaza+" distance : "+closestdist[0].dist;
		Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
		//Update Found if distance is closer than 5 ft and last update 30 secs ago.
		var range = 100;
		var timelastupd = Titanium.App.Properties.getString('timelastupd') || 0;
		var tolllastupd = Titanium.App.Properties.getString('tolllastupd') || "None";
		var timelastupd = parseFloat(timelastupd);
		var timediff = time1 - timelastupd;
		var timerange = 10000;
		//*console.log("time diff is : time 1 - timelastupd : "+time1+" - "+timelastupd+" = "+timediff);
		if (closestdist[0].dist < range && timediff > timerange && closesttollbydist0 != tolllastupd  ) {
			var tollplaza = closestdist[0].tolltollplaza;			
			var longitude = closestdist[0].longitude;
			var latitude = closestdist[0].latitude;
			var timestamp = time1;
			var cost = closestdist[0].cost;
			var type = closestdist[0].type;
			var hwy = closestdist[0].hwy;
			var note = closestdist[0].note;
			Alloy.Globals.updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
			//*console.log("timestamp is :" +timestamp);
			Titanium.App.Properties.setString('timelastupd',timestamp);
			Titanium.App.Properties.setString('tolllastupd',tollplaza);
			var curNotif = Ti.App.iOS.scheduleLocalNotification({
				alertBody: (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away",
				date:new Date(new Date().getTime() + 1000)
			}); 
			var mmsg = (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away";
	 		(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
		} else {
			if ((Titanium.App.Properties.getInt('maildebug'))==1){
				var now = new Date();
				var mmsg = now+": index.js :"+closesttollbydist0+":x:"+tolllastupd;
				mmsg += "|range<"+range+"?:"+closestdist[0].dist;
				mmsg += "|timediff>"+timerange+"?:"+timediff;
				console.log(mmsg);
				Alloy.Globals.appendFile(mmsg,debugfile);
			}
		}
		
	}
};
	

var headingCallback = function(e){
	if(trackingEnabled) {
	if (e.error)
	{
		updatedHeading = 'error: ' + e.error;
		//*Ti.API.info("Code translation: "+translateErrorCode(e.code));
		return;
	}
	var x = e.heading.x;
	var y = e.heading.y;
	var z = e.heading.z;
	var magneticHeading = e.heading.magneticHeading;
	var accuracy = e.heading.accuracy;
	var trueHeading = e.heading.trueHeading;
	var timestamp = e.heading.timestamp;	
	currentHeading = 'x:' + x + ' y: ' + y + ' z:' + z;
	Titanium.API.info('geo - current heading: ' + new Date(timestamp) + ' x ' + x + ' y ' + y + ' z ' + z);
	Titanium.App.Properties.setString('currentHeading', trueHeading);
	}
};
	


	if (Ti.Geolocation.locationServicesEnabled) {
		var distmatch = closestdist = [];
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 0;
		Titanium.Geolocation.purpose = 'Get Current Location';
		
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true && Titanium.App.Properties.setString('locationAdded', "true");
		
	   if (Titanium.Geolocation.hasCompass)
		{
			Titanium.Geolocation.showCalibration = false;
			Titanium.Geolocation.headingFilter = 45;
			Titanium.Geolocation.addEventListener('heading', headingCallback);
			headingAdded = true;
		}
		else {
			Titanium.API.info("No Compass on device");
			currentHeading = 'No compass available';
			var trueHeading = 'No compass available';
			Titanium.App.Properties.setString('currentHeading', trueHeading);
		}
	} else {
	    alert('Please enable location services');
	}

	
	var tracking = function(e) {  //Simple Tracking
     // Only update location is app is paused
    var count = Titanium.App.Properties.getInt('count');
    if(simpletrackingEnabled)
	    {
	        var count = Titanium.App.Properties.getInt('count', count);count++;
	        mmsg = new Date(e.coords.timestamp)+','+e.coords.timestamp+','+e.coords.latitude+','+e.coords.longitude;
	        //console.log(" maildebug is: "+Titanium.App.Properties.getInt('maildebug')+" , count is : "+count);
	      	if((Titanium.App.Properties.getInt('mindebug'))==1 && count >= 30){	//log loc to debug file every 30 secs
		      	console.log(mmsg+" should be appended to maildebug.txt");	
				Alloy.Globals.appendFile(mmsg,locfile);
				var count = 0;
			}
	        Ti.API.info("Location: "+e.coords.latitude+" , "+e.coords.longitude+" , " + new Date(e.coords.timestamp));
	        Titanium.App.Properties.setInt('count', count);
	    }
	}; 
	// Add eventlistener on location
	Ti.Geolocation.addEventListener("location", tracking);
	
/* temp disable
Ti.App.addEventListener("pause", function() {	// App is paused or HOME SCREEN button pressed
	if (Titanium.App.Properties.getInt('complextracking') == 1 ) {
		trackingEnabled = true;
		console.log("transition to background with complextracking and debug set to :"+Titanium.App.Properties.getInt('maildebug'));
	} 
	if (Titanium.App.Properties.getInt('simpletracking') == 1 ){
		simpletrackingEnabled = true;
		console.log("transition to background with simpletracking and debug set to :"+Titanium.App.Properties.getInt('maildebug'));
	}
	});
*/

//Start BG Detection Service once the App start
var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1-3.js'});
service.start;

Ti.App.addEventListener("pause", function() {
	Alloy.Globals.eventDetectTollPlaza(loc,"remove");
});

Ti.App.addEventListener("resume", function(){ 
	Alloy.Globals.eventDetectTollPlaza("newberlin","add");
	//    trackingEnabled = false ; Titanium.App.Properties.setInt('complextracking',0);
	 //   simpletrackingEnabled = false ; Titanium.App.Properties.setInt('simpletracking',0);
	});
	
/*
var SimpleBGTest = function () {
	var simpletrackingEnabled             = false;
	Ti.Geolocation.purpose      = "Determine device location";
	Ti.Geolocation.accuracy         = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter   = 0;     
	 
	var tracking = function(e) {
	 
	     // Only update location is app is paused
	    if(simpletrackingEnabled)
	    {
	        // Do some server stuff...
	        Ti.API.info("Location: " + new Date(e.coords.timestamp));
	    }
	};
	 
	// Add eventlistener on location
	Ti.Geolocation.addEventListener("location", tracking);
	 
	// App is paused
	Ti.App.addEventListener("pause", function(){ 
	    trackingEnabled = true; 
	});
	 
	// App is resumed
	Ti.App.addEventListener("resume", function(){ 
	    trackingEnabled = false; 
	});
};
*/
