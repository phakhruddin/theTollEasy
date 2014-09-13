var args = arguments[0] || {};
require("tabViewOne.js");
alert('geobg: service has been invoked once, and will now be stopped to release it from memory. ');
Ti.App.currentService.stop();

var listener = Ti.App.currentService.addEventListener('stop',function(){
  alert('geobg: Although the service has been stopped, it is still registered and will be executed again on next pause');
  alert('geobg: As all background services are automatically stopped on resume, it is not always necessary to explicitly stop a service');
});



/*
var bgLocFound = function(e){

var locationCallback = function(e)
{
	Ti.API.info(JSON.stringify(e.coords));
	var lon1 = +e.coords.longitude;
	var lat1 = +e.coords.latitude;
	var time1 = +e.coords.timestamp;
	alert("lon : lat : time :"+lon1+":"+lat1+":"+(new Date(time1)));
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
			console.log("currentaddr :" +currentaddr);
			Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
		}
		else {
			Ti.API.info("Code translation: "+JSON.stringify(e.code));
		}
	});	
	var db = Ti.Database.open('_alloy_');
	var tolldata = db.execute('SELECT tollplaza,latitude,longitude,hwy,cost,type,note,location FROM tollplaza where location ='+"\""+loc+"\"");
	try
	{
	    while (tolldata.isValidRow())
	    {
	    	var tolltollplaza = tolldata.fieldByName('tollplaza');
	    	var lat2 = tolldata.fieldByName('latitude');		        	
	    	var lon2 = tolldata.fieldByName('longitude');
	    	var dist = Alloy.Globals.calcDistance(lat1,lon1,lat2,lon2,"F");
	        	distmatch.push({
	        		tolltollplaza:tolltollplaza, 
	        		dist:dist,
	        		latitude:lat2,
	        		longitude:lon2,
	        		hwy:hwy,
	        		cost:cost,
	        		type:type,
	        		note:note
	        	});		        			        				
				tolldata.next();
	        }
	   }
	   catch(err)
		{
		   alert(err);
		}
	    db.close();
	    console.log("JSON distance unsort :" +JSON.stringify(distmatch));
	var closestdist = distmatch.sort(function(a, b)
	{
		return a.dist - b.dist;
	});
	console.log("JSON distance SORT :" +JSON.stringify(closestdist));
	var closesttollbydist = closestdist[0].tolltollplaza;
	var closesttollbydist0 = closestdist[0].tolltollplaza;
	var closestdist0 = closestdist[0].dist;
	var closesttollbydist1 = closestdist[1].tolltollplaza;
	var closestdist1 = closestdist[1].dist;
	var closesttollbydist2 = closestdist[2].tolltollplaza;
	var closestdist2 = closestdist[2].dist;
	var outputclosesttollbydist0 = closestdist[0].tolltollplaza+"(BG)"+" distance : "+closestdist[0].dist;
	var outputclosesttollbydist1 = closestdist[1].tolltollplaza +" distance : "+closestdist[1].dist;
	var outputclosesttollbydist2 = closestdist[2].tolltollplaza +" distance : "+closestdist[2].dist;
	Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
	Titanium.App.Properties.setString('outputclosesttollbydist1', outputclosesttollbydist1);
	Titanium.App.Properties.setString('outputclosesttollbydist2', outputclosesttollbydist2);
	//Update Found if distance is closer than 5 ft and last update 30 secs ago.
	var range = 100;
	var timelastupd = Titanium.App.Properties.getString('timelastupd') || 0;
	var tolllastupd = Titanium.App.Properties.getString('tolllastupd') || "None";
	var timelastupd = parseFloat(timelastupd);
	var timediff = time1 - timelastupd;
	var timerange = 10000;
	console.log("time diff is : time 1 - timelastupd : "+time1+" - "+timelastupd+" = "+timediff);
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
		console.log("timestamp is :" +timestamp);
		Titanium.App.Properties.setString('timelastupd',timestamp);
		Titanium.App.Properties.setString('tolllastupd',tollplaza);
	} else {
		console.log(" is this existing toll? "+closesttollbydist0+" vs. tolllastupd: "+tolllastupd);
		console.log(" is range less than "+range+" ? : range is : "+closestdist[0].dist);
		console.log(" is timediff less than "+timerange+" ? : timediff is : "+timediff);
	}
	console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
};

var headingCallback = function(e){
	if (e.error)
	{
		updatedHeading = 'error: ' + e.error;
		Ti.API.info("Code translation: "+translateErrorCode(e.code));
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
};


if (Ti.Geolocation.locationServicesEnabled) {
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 1;
	Titanium.Geolocation.purpose = 'Get Current Location';

	Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            Ti.API.info(JSON.stringify(e.coords));
				var lon1 = +e.coords.longitude;
				var lat1 = +e.coords.latitude;
				var time1 = +e.coords.timestamp;
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
						console.log("currentaddr :" +currentaddr);
						Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
					}
					else {
						Ti.API.info("Code translation: "+JSON.stringify(e.code));
					}
				});	
				var db = Ti.Database.open('_alloy_');
		        var tolldata = db.execute('SELECT tollplaza,latitude,longitude,hwy,cost,type,note,location FROM tollplaza where location ='+"\""+loc+"\"");
				try
				{
			        while (tolldata.isValidRow())
			        {
			        	var tolltollplaza = tolldata.fieldByName('tollplaza');
			        	var lat2 = tolldata.fieldByName('latitude');		        	
			        	var lon2 = tolldata.fieldByName('longitude');
			        	var dist = Alloy.Globals.calcDistance(lat1,lon1,lat2,lon2,"F");
			        	distmatch.push({
			        		tolltollplaza:tolltollplaza, 
			        		dist:dist,
			        		latitude:lat2,
			        		longitude:lon2,
			        		hwy:hwy,
			        		cost:cost,
			        		type:type,
			        		note:note
			        	});		        			        				
						tolldata.next();
			        }
		       }
		       catch(err)
				{
				   alert(err);
				}
		        db.close();
		        console.log("JSON distance unsort :" +JSON.stringify(distmatch));
		        var closestdist = distmatch.sort(function(a, b)
		        {
		        	return a.dist - b.dist;
		        });
		        console.log("JSON distance SORT :" +JSON.stringify(closestdist));
		        var closesttollbydist = closestdist[0].tolltollplaza;
		        var closesttollbydist0 = closestdist[0].tolltollplaza;
		        var closestdist0 = closestdist[0].dist;
		        var closesttollbydist1 = closestdist[1].tolltollplaza;
		        var closestdist1 = closestdist[1].dist;
		        var closesttollbydist2 = closestdist[2].tolltollplaza;
		        var closestdist2 = closestdist[2].dist;
		        var outputclosesttollbydist0 = closestdist[0].tolltollplaza +" distance : "+closestdist[0].dist;
		        var outputclosesttollbydist1 = closestdist[1].tolltollplaza +" distance : "+closestdist[1].dist;
		        var outputclosesttollbydist2 = closestdist[2].tolltollplaza +" distance : "+closestdist[2].dist;
				Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
				Titanium.App.Properties.setString('outputclosesttollbydist1', outputclosesttollbydist1);
				Titanium.App.Properties.setString('outputclosesttollbydist2', outputclosesttollbydist2);
				//Update Found if distance is closer than 5 ft and last update 30 secs ago.
				//var range = 158672000000000000;
				//var range = 2000000000000;
				var range = 100; // feet
				var timelastupd = Titanium.App.Properties.getString('timelastupd') || 0;
				var tolllastupd = Titanium.App.Properties.getString('tolllastupd') || "None";
				var timelastupd = parseFloat(timelastupd);
				var timediff = time1 - timelastupd;
				var timerange = 10000;
				console.log("time diff is : time 1 - timelastupd : "+time1+" - "+timelastupd+" = "+timediff);
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
					console.log("timestamp is :" +timestamp);
					Titanium.App.Properties.setString('timelastupd',timestamp);
					Titanium.App.Properties.setString('tolllastupd',tollplaza);
				} else {
					console.log(" is this existing toll? "+closesttollbydist0+" vs. tolllastupd: "+tolllastupd);
					console.log(" is range less than "+range+" ? : range is : "+closestdist[0].dist);
					console.log(" is timediff less than "+timerange+" ? : timediff is : "+timediff);
				}
				console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
	        }
	    });

	Titanium.Geolocation.addEventListener('location', locationCallback);
	locationAdded = true;
	
   if (Titanium.Geolocation.hasCompass)
		{
			Titanium.Geolocation.showCalibration = false;
			Titanium.Geolocation.headingFilter = 45;
			Ti.Geolocation.getCurrentHeading(function(e)
				{
					if (e.error)
					{
						currentHeading = 'error: ' + e.error;
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
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
	});
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

};
*/




