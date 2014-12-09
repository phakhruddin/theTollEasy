// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

!Titanium.App.Properties.getInt('maildebug') ? maildebug = 0 : maildebug = Titanium.App.Properties.getInt('maildebug');
var loc = Titanium.App.Properties.getString("loc","newberlin");
var detectionRange = Titanium.App.Properties.getInt('detectionRange',200);
var mindebug = Titanium.App.Properties.getInt('mindebug', "1");
Titanium.App.Properties.setInt('closercount',500); // reset closer count to 500 then go down

// JSON file for downloaded tolldata
var thefile = loc+".txt";
var file4 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
var thefile5 = loc+"1.txt";
var file5 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile5
			);
var urlsourcefile = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, "urlsource.txt"
			);
var alturlsourcefile = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, "alturlsource.txt"
			);

Alloy.Globals.writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};

Alloy.Globals.appendFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.append(content+"\n");
};

//* initialize debug file
var debugfile = "maildebug.txt";
var locfile = "location.txt";

if ((Titanium.App.Properties.getInt('maildebug')) == "1") {
	var mmsg = (new Date())+": debugging start with geo distance filter at : " +Titanium.App.Properties.getInt('distanceFilter');
	Alloy.Globals.writeFile(mmsg, debugfile);
	Alloy.Globals.writeFile("Date,Timestamp,LAT,LON",locfile);
}

if ((Titanium.App.Properties.getInt('mindebug')) == "1") {
	Alloy.Globals.writeFile("Date,Timestamp,LAT,LON",locfile);
}

Alloy.Globals.getLocation = function() {	
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

/// Initial Collection creation
Alloy.Collections.tollsources = Alloy.createCollection("tollsource");

Alloy.Globals.checkLoc = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            //alert(e.coords);
	            mmsg= new Date(+e.coords.timestamp)+" : latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude;
	            (Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
	            alert(mmsg);
	        }
	    });
	} else {
	    alert('Please enable location services');
	}
};

Alloy.Globals.getGeneralLocation = function(loc) {	
	var url = "http://23.21.53.150:10000/"+loc+".json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
	    	var file4 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			file4.write(this.responseText);
			} catch(e){
				Ti.API.info("cathing e: "+e);
			}
		}
	});
	xhr.onerror = function(e){
		alert(e);
	};
	xhr.open("GET", url);
	xhr.send() && alert(loc+" POIs were successfuly downloaded from "+url+". Please proceed.");
};

Alloy.Globals.updateTollPlazaTable = function(tollplaza,latitude,longitude,altitude,heading,speed,hwy,cost,type,source,location,note) {
	var tollplazaModel = Alloy.createModel("tollplaza",{
		tollplaza : tollplaza,
		latitude : latitude,
		longitude :  longitude,					
		altitude : altitude,
		heading : heading,
		speed : speed,
		hwy : hwy,
		accuracy : "0",
		timestamp : "0",
		altitudeAccuracy: "0",
		cost: cost,
		type: type,
		source : source,
		location : location,
		note : note
	});			
	tollplazaModel.save();
	//console.log("DB updated with:" +tollplaza+","+latitude+","+longitude+","+altitude+","+heading+","+speed+","+hwy+","+cost+","+type+","+source+","+location+","+note);
	// Alloy.Collections.tollplaza.fetch(); //too slow - disable it.
};

Alloy.Globals.updateTollPlazaAlternate = function(loc) {
		var mmsg = (new Date())+": error downloading data using a backup site instead";
		Alloy.Globals.appendFile(mmsg,debugfile); console.log(mmsg);
		Alloy.Collections.tollplaza.deleteAll();
		var url1 = "https://spreadsheets.google.com/feeds/list/1Omzwq1RKWeptvtV4H0ryLi3IP2fFdPFNqBPq2_nuuCc/od6/public/basic?hl=en_US&alt=json";
		var xhr1 = Ti.Network.createHTTPClient({
		    onload: function(ee) {
			    try {
	Alloy.Collections.tollplaza.deleteLOC(loc); // delete intended location only
			    	json = JSON.parse(this.responseText);
			    	var out = '{ "poi" : ['+"\n";
			    	for (var i=0; i < json.feed.entry.length; i++) {
			    		var tollplaza = json.feed.entry[i].title.$t.trim();
						var latitude = json.feed.entry[i].content.$t.split(',')[0].split(':')[1].trim();
						var longitude = json.feed.entry[i].content.$t.split(',')[1].split(':')[1].trim();
						var altitude = json.feed.entry[i].content.$t.split(',')[2].split(':')[1].trim() || "none";
						var heading = json.feed.entry[i].content.$t.split(',')[3].split(':')[1].trim() || "none";
						var speed = json.feed.entry[i].content.$t.split(',')[4].split(':')[1].trim() || "none";
						var hwy = json.feed.entry[i].content.$t.split(',')[5].split(':')[1].trim() || "interstate";
						var accuracy =  "0";
						var timestamp =  "0";
						var altitudeAccuracy=  "0";
						var cost= json.feed.entry[i].content.$t.split(',')[6].split(':')[1].trim() || "0";
						var type=  json.feed.entry[i].content.$t.split(',')[7].split(':')[1].trim() || "none";
						var source = json.feed.entry[i].content.$t.split(',')[8].split(':')[1].trim() || "unknown";
						var location = json.feed.entry[i].content.$t.split(',')[9].split(':')[1].trim() || "unknown";
						var note = i;
						Alloy.Globals.updateTollPlazaTable(tollplaza,latitude,longitude,altitude,heading,speed,hwy,cost,type,source,location,note);	
						if ( i == (json.feed.entry.length - 1)) {
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" , "type" : "'+type+'" }]}'+"\n";
						} else {
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" , "type" : "'+type+'" },'+"\n";
						}
			    	}
					file5.write(out);
					file4.write(out);
					var json = out;
			    } catch(ee){
						Ti.API.info("cathing e: "+ee);
						var mmsg = (new Date())+": load file error cathing ee: "+JSON.stringify(ee);
						(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
				}
			}	
		});			
		xhr1.open("GET", url1);
		xhr1.send();
};

Alloy.Globals.updateTollPlaza = function(loc) {
	var url = "http://23.21.53.150:10000/"+loc+".json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	Alloy.Collections.tollplaza.deleteLOC(loc); // delete intended location only
				// parse the retrieved data, turning it into a JavaScript object
		    	json = JSON.parse(this.responseText);
				// update DB
				for (var i=0; i < +json.poi.length; i++) {
					var tollplaza = json.poi[i].plaza;
					var latitude = json.poi[i].latitude;
					var longitude = json.poi[i].longitude;
					var altitude = json.poi[i].altitude || "none";
					var heading = json.poi[i].heading || "none";
					var speed = json.poi[i].speed || "none";
					var hwy = "interstate";
					var accuracy = "0";
					var timestamp = "0";
					var altitudeAccuracy= "0";
					var cost= json.poi[i].cost || "0";
					var type= json.poi[i].type || "none";
					var source = "thetolleasy.com";
					var location = loc;
					var note = i;
					//console.log("updating DB with:" +tollplaza+","+latitude+","+longitude+","+altitude+","+heading+","+speed+","+hwy+","+cost+","+type+","+source+","+location+","+note);
					//Update the tollplaza table.
					Alloy.Globals.updateTollPlazaTable(tollplaza,latitude,longitude,altitude,heading,speed,hwy,cost,type,source,location,note);	
				}
			} catch(e){
				Ti.API.info("cathing e: "+e);
				var mmsg = (new Date())+": error downloading data from primary site, "+url+" , data is not in the right format";
				Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
				Alloy.Globals.updateTollPlazaAlternate(loc);
			}
		}
	});
	xhr.onerror = function(e){
		var mmsg = (new Date())+": error downloading data from primary site, "+url+" , downloading data using a backup site instead";
		Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
		//*console.log(e);
		// backup sites
		Alloy.Collections.tollplaza.deleteAll();
		var url1 = "https://spreadsheets.google.com/feeds/list/1Omzwq1RKWeptvtV4H0ryLi3IP2fFdPFNqBPq2_nuuCc/od6/public/basic?hl=en_US&alt=json";
		var xhr1 = Ti.Network.createHTTPClient({
		    onload: function(e) {
			    try {
	Alloy.Collections.tollplaza.deleteLOC(loc); // delete intended location only
			    	json = JSON.parse(this.responseText);
			    	var out = '{ "poi" : ['+"\n";
			    	for (var i=0; i < json.feed.entry.length; i++) {
			    		var tollplaza = json.feed.entry[i].title.$t.trim();
						var latitude = json.feed.entry[i].content.$t.split(',')[0].split(':')[1].trim();
						var longitude = json.feed.entry[i].content.$t.split(',')[1].split(':')[1].trim();
						var altitude = json.feed.entry[i].content.$t.split(',')[2].split(':')[1].trim() || "none";
						var heading = json.feed.entry[i].content.$t.split(',')[3].split(':')[1].trim() || "none";
						var speed = json.feed.entry[i].content.$t.split(',')[4].split(':')[1].trim() || "none";
						var hwy = json.feed.entry[i].content.$t.split(',')[5].split(':')[1].trim() || "interstate";
						var accuracy =  "0";
						var timestamp =  "0";
						var altitudeAccuracy=  "0";
						var cost= json.feed.entry[i].content.$t.split(',')[6].split(':')[1].trim() || "0";
						var type=  json.feed.entry[i].content.$t.split(',')[7].split(':')[1].trim() || "none";
						var source = json.feed.entry[i].content.$t.split(',')[8].split(':')[1].trim() || "unknown";
						var location = json.feed.entry[i].content.$t.split(',')[9].split(':')[1].trim() || "unknown";
						var note = i;
						Alloy.Globals.updateTollPlazaTable(tollplaza,latitude,longitude,altitude,heading,speed,hwy,cost,type,source,location,note);	
						if ( i == (json.feed.entry.length - 1)) {
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" , "type" : "'+type+'" }]}'+"\n";
						} else {
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" , "type" : "'+type+'" },'+"\n";
						}
			    	}
					file5.write(out);
					file4.write(out);
					var json = out;
			    } catch(e){
						Ti.API.info("cathing e: "+e);
				}
			}	
		});			
		var mmsg = (new Date())+": load file error cathing e: "+JSON.stringify(e);
		(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
		xhr1.open("GET", url1);
		xhr1.send();
	};

	xhr.open("GET", url);
	xhr.send();
};

Alloy.Globals.calcDistance = function(tollplaza,lat1, lon1, lat2, lon2, unit){
	  var radlat1 = Math.PI * lat1/180;
	  var radlat2 = Math.PI * lat2/180;
	  var radlon1 = Math.PI * lon1/180;
	  var radlon2 = Math.PI * lon2/180;
	  var theta = lon1-lon2;
	  var radtheta = Math.PI * theta/180;
	  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	  dist = Math.acos(dist);
	  dist = dist * 180/Math.PI;
	  dist = dist * 60 * 1.1515; //miles.
	  if (unit=="K") {
     	dist = dist * 1.609344;	    //kilometers
	    }
	  if (unit=="N") {
     	dist = dist * 0.8684;   
   		}
   	  if (unit=="F") {
     	dist = dist * 5280;   
   		}
	//var calcresult = tollplaza+":"+(new Date())+": dist:"+dist+"lat1:"+lat1+",lat2:"+lat2+",radlat1:"+radlat1+",radlat2:"+radlat2+",lon1:"+lon1+",lon2:"+lon2+",radlon1:"+radlon1+",radlon2:"+radlon2+",radtheta:"+radtheta+"\n";
	//maildebug==1 && console.log(calcresult);
   	return Math.round(dist);
};

Alloy.Globals.updateFound = function(tollplaza,longitude,latitude,timestamp,cost,type,hwy) {
	var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
	var cost = cost || "0.00";	
	/*console.log("About to update found DB: tollplaza "+tollplaza+" longitude : "+longitude	+
		", latitude : "+latitude	+", heading : "+heading	+", speed : "+speed	+", timestamp : "+timestamp	+
		", cost : "+cost+" , type : " +type);	*/
	var mmsg = "Alloy.Globals.updateFound: "+new Date()+": About to update found DB: tp : "+tollplaza+", lon:"+longitude +", lat : "+latitude +", cost : "+cost+", type : "+type	+", timestamp : "+timestamp+"\n";
	(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
	console.log(mmsg);
	// DB manual insert.
	var db = Ti.Database.open('_alloy_');
	db.execute('BEGIN');
	db.execute('INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2);
	db.execute('COMMIT');
	db.close();
	/*
	var foundModel = Alloy.createModel("found",{
		tollplaza : tollplaza,
		longitude :  longitude,
		latitude : latitude,
		altitude : altitude,
		heading : heading,
		accuracy : accuracy,
		speed : speed,
		timestamp : timestamp,
		altitudeAccuracy : altitudeAccuracy,
		cost : cost,
		type : type,
		hwy : hwy,
		data1 : data1,
		data2 : data2
	});	
	foundModel.save();
	Alloy.Collections.found.fetch();
	*/
};


Alloy.Globals.distanceDetectTollPlaza = function(loc) {
	var distmatch = closestdist = [];
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.trackSignificantLocationChange = true;
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            ///*Ti.API.info(JSON.stringify(e.coords));
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
						//*console.log("currentaddr :" +currentaddr);
						Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
					}
					else {
						Ti.API.info("Code translation: "+JSON.stringify(e.code));
					}
				});	
				// START HERE MAYBE
				var db = Ti.Database.open('_alloy_');
		        var tolldata = db.execute('SELECT tollplaza,latitude,longitude,hwy,cost,type,note,location FROM tollplaza where location ='+"\""+loc+"\"");
				try
				{
			        while (tolldata.isValidRow())
			        {
			        	var tolltollplaza = tolldata.fieldByName('tollplaza');
			        	//var lat2 = tolldata.fieldByName('latitude');
			        	//var lat2 = tolldata.fieldByName('latitude').toString().trim().replace(/[^0-9\.]+/g,'');
			        	var lat2 = tolldata.fieldByName('latitude');
			        	var lon2 = tolldata.fieldByName('longitude');
			        	var dist = Alloy.Globals.calcDistance(lat1,lon1,lat2,lon2,"F");
			        	var mmsg = "tolldata each: "+tolltollplaza+":"+lat2+":"+lon2+":"+dist;
			        	//*console.log(mmsg); maildebug==1 && Alloy.Globals.appendFile(mmsg,debugfile);
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
		        var outputclosesttollbydist0 = closestdist[0].tolltollplaza +" distance : "+closestdist[0].dist;
				Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
				//Update Found if distance is closer than 5 ft and last update 30 secs ago.
				var range = detectionRange;
				//var range = 2000000000000;
				//var range = 100; // feet
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
				} else {
					if ((Titanium.App.Properties.getInt('maildebug'))==1){
						var now = new Date();
						var mmsg = now+": Alloy.Globals.distanceDetectTollPlaza: "+closesttollbydist0+":x:"+tolllastupd;
						mmsg += "|range<"+range+"?:"+closestdist[0].dist;
						mmsg += "|timediff>"+timerange+"?:"+timediff;
						mindebug == 1 && console.log(mmsg);
						Alloy.Globals.appendFile(mmsg,debugfile);
					}

				}
				//*console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
	        }
	    });
	    if (Titanium.Geolocation.hasCompass)
			{
				//
				//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
				//
				Titanium.Geolocation.showCalibration = false;
		
				//
				// SET THE HEADING FILTER (THIS IS IN DEGREES OF ANGLE CHANGE)
				// EVENT WON'T FIRE UNLESS ANGLE CHANGE EXCEEDS THIS VALUE
				//Titanium.Geolocation.headingFilter = 45;
		
				//
				//  GET CURRENT HEADING - THIS FIRES ONCE
				//
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
			}
			else
			{
				Titanium.API.info("No Compass on device");
				currentHeading = 'No compass available';
				var trueHeading = 'No compass available';
				Titanium.App.Properties.setString('currentHeading', trueHeading);
			}
	} else {
	    alert('Please enable location services');
	}
};

Alloy.Globals.eventDetectTollPlaza = function(loc,action){

	console.log((new Date())+" : start tollplaza detection while online");
	// Detect TollPlaza while te app is in theforeground
	var calcDistance = function(tollplaza,lat1, lon1, lat2, lon2, unit){
	  var radlat1 = Math.PI * lat1/180;
	  var radlat2 = Math.PI * lat2/180;
	  var radlon1 = Math.PI * lon1/180;
	  var radlon2 = Math.PI * lon2/180;
	  var theta = lon1-lon2;
	  var radtheta = Math.PI * theta/180;
	  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	  dist = Math.acos(dist);
	  dist = dist * 180/Math.PI;
	  dist = dist * 60 * 1.1515; //miles.
	  if (unit=="K") {
     	dist = dist * 1.609344;	    //kilometers
	    }
	  if (unit=="N") {
     	dist = dist * 0.8684;   
   		}
   	  if (unit=="F") {
     	dist = dist * 5280;   
   		}
   	var calcresult = tollplaza+":"+(new Date())+": dist:"+dist+"lat1:"+lat1+",lat2:"+lat2+",radlat1:"+radlat1+",radlat2:"+radlat2+",lon1:"+lon1+",lon2:"+lon2+",radlon1:"+radlon1+",radlon2:"+radlon2+",radtheta:"+radtheta+"\n";
	maildebug==2 && console.log(calcresult);
   	return Math.round(dist);
	};
	
	var updateFound = function(tollplaza,longitude,latitude,timestamp,cost,type,hwy) {
		var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
		var cost = cost || "0.00";	
		var mmsg = "updateFound: "+new Date()+": About to update found DB: tp : "+tollplaza+", lon:"+longitude +", lat : "+latitude +", cost : "+cost+", type : "+type	+", timestamp : "+timestamp+"\n";
		maildebug==1 && appendFile(mmsg,debugfile);
		mindebug == 1 && console.log(mmsg);
		var db = Ti.Database.open('_alloy_');
		db.execute('BEGIN');
		db.execute('INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2);
		db.execute('COMMIT');
		db.close();
	};
	var pushTollExit = function(tollplaza,altitude,heading,type,longitude,latitude,cost,timestamp){
	if ( tollentry.length > "0") {
		for ( var i=0;i<tollentry.length;i++ ) {
			if ( tollplaza == tollentry[i].tollplaza.trim() ){									
				var mmsg = (new Date())+": add exit with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
				tollexit.push({tollplaza:tollplaza,cancel:altitude,other:heading,type:type,longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
			}	
		}
	} else {
		var mmsg = (new Date())+": NOT add exit with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
	}
	maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
	maildebug==1 || mindebug ==1 && console.log(mmsg);
};

var bgLocFound = function(loc,action){

	var contents = "";
	var contents = file4.read() || file5.read();
	//*console.log("contents text :" +contents.text);
	if(contents && contents.text){
		var preParseData = (contents.text); 
		var json = json || JSON.parse(preParseData);
	}
	var mmsg = "json data : "+JSON.stringify(json.poi[0]);
	maildebug==1 && appendFile(mmsg,debugfile);
		
		var locationCallback = function(e)
		{
			if(e.error){
				Ti.API.info("Error is: "+e.error);
			} else {
			var distmatch = [];
			var count = Titanium.App.Properties.getInt('count');count++; // todebug count
			maildebug == 1 && console.log("count:"+count);
			//*Ti.API.info(JSON.stringify(e.coords));
			var lon1 = +e.coords.longitude;
			var lat1 = +e.coords.latitude;
			var time1 = +e.coords.timestamp;
			var speed1 = +e.coords.speed;
	        mmsg = new Date(e.coords.timestamp)+','+e.coords.timestamp+','+e.coords.latitude+','+e.coords.longitude+','+speed1;
	        //console.log(" maildebug is: "+Titanium.App.Properties.getInt('maildebug')+" , count is : "+count);
	      	if((Titanium.App.Properties.getInt('mindebug'))==1 && count >= 30){	//log loc to debug file every 30 secs
		      	mindebug == 1 && console.log(mmsg+" should be appended to location.txt");	
				appendFile(mmsg,locfile);
				var count = 0;
			}
	        /// Ti.API.info(mmsg); ///THE ONLY LOG LEFT - MINIMAL
	        var thedistanceNearbyFilter = Titanium.App.Properties.getInt('thedistanceNearbyFilter',10000);
	        var closestdistobj = Ti.App.Properties.getString('distmatchobj',"NO");
	        if (closestdistobj != "NO") {
	        	var closestdistarray = JSON.parse(Ti.App.Properties.getString('distmatchobj'));
	        	maildebug == 1 && console.log("checking : "+closestdistarray);
	        };
	        var thearray = (thedistanceNearbyFilter < 5280 )?closestdistarray:json.poi;
	        maildebug == 1 && console.log("The First Toll distance is at  "+thedistanceNearbyFilter);
	        Titanium.App.Properties.setInt('count', count); // todebug count
	        // reduce down to number of JSON objects
			for (i=0;i< thearray.length;i++){
			   		var tolltollplaza = thearray[i].plaza || thearray[i].tolltollplaza;
			   		var lat2 = thearray[i].latitude;
			   		var lon2 = thearray[i].longitude;
			   		var alt2 = thearray[i].altitude;
			   		var head2 = thearray[i].heading;
			   		var hwy = thearray[i].hwy;
			   		var cost = thearray[i].cost;
			   		var type = thearray[i].type;
			   		var note = thearray[i].note;		   		
			   		var dist = calcDistance(tolltollplaza,lat1,lon1,lat2,lon2,"F");
			   		///if (dist < 528000 ) { //* 100 miles radius
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
			   		///}    	
			   }	   		   
			   // JSON FILE ENDS
			maildebug == 1 && console.log("JSON distance unsort :" +JSON.stringify(distmatch));
			
			
				var closestdist = distmatch.sort(function(a, b)
				{
					return a.dist - b.dist;
				});
				maildebug == 1 && console.log("JSON closestdist : "+JSON.stringify(closestdist));
				Ti.App.Properties.setString('distmatchobj', JSON.stringify(distmatch));
				maildebug == 1 && console.log("set distmatchobj"); 
				//console.log("JSON distance SORT :" +JSON.stringify(closestdist));
				//var closesttollbydist = closestdist[0].tolltollplaza;
				var closesttollbydist0 = closestdist[0].tolltollplaza;
				var closestdist0 = closestdist[0].dist;
				var outputclosesttollbydist0 = closestdist[0].tolltollplaza+" distance : "+closestdist[0].dist;
				Titanium.App.Properties.setInt('thedistanceNearbyFilter',closestdist0);
				//maildebug == 1 && console.log("Distance Close Filter is set to: "+thedistanceNearbyFilter);
				Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
				/// Update Found if distance is closer than 5 ft and last update 10 secs ago.
				//* comparison
				var range = detectionRange; /// detection range: user configurable. now set at 150ft.
				var calcrange = 5000;
				//console.log("detectionRange : "+detectionRange);
				var timelastupd = Titanium.App.Properties.getString('timelastupd') || 0;
				var tolllastupd = Titanium.App.Properties.getString('tolllastupd') || "None";
				var distlastupd = Titanium.App.Properties.getString('distlastupd',1000000000000);
				var timelastupd = parseFloat(timelastupd);
				var timediff = time1 - timelastupd;
				var timerange = 100; // timediff from the next found for the same toll. Now. 0.1sec.
				var calctimerange = 60000;
				///Check if the vehicle is moving away from tollplaza or moving into. 
				closestdist0 > distlastupd?approachtoll=0:approachtoll=1;
				///Check if a U-TURN
				var lastapproachtoll = Titanium.App.Properties.getString('lastapproachtoll');
				console.log(closesttollbydist0+" || "+tolllastupd+" || last: " +lastapproachtoll +"/"+approachtoll);
				if ( closesttollbydist0 == tolllastupd && lastapproachtoll == 0 && approachtoll == 1 ) {
					var tolllastupd = Titanium.App.Properties.getString('tolllastupd');
					Titanium.App.Properties.setString('tolllastupd',tolllastupd+"(U-TURN)");
				} 		
				Titanium.App.Properties.setString('distlastupd',closestdist0);
				Titanium.App.Properties.setString('lastapproachtoll',approachtoll);
				//*console.log("time diff is : time 1 - timelastupd : "+time1+" - "+timelastupd+" = "+timediff);
				///Change 20140914. When the vehicle is not near range (150ft), then run logics for toll detection.
				if (closestdist[0].dist < range && timediff > timerange && approachtoll == 1 ) {
					var tollplaza = closestdist[0].tolltollplaza;			
					var longitude = closestdist[0].longitude;
					var latitude = closestdist[0].latitude;
					var altitude = closestdist[0].altitude;
					var heading = closestdist[0].heading;
					var timestamp = time1;
					var cost = closestdist[0].cost;
					var type = closestdist[0].type;
					var hwy = closestdist[0].hwy;
					type == "start"?foundentry=1:foundentry=0;
					type == "end"?foundexit=1:foundexit=0;
					var sametoll = "NO";if ( closesttollbydist0 == tolllastupd && timediff < 30000 ) { var sametoll = "YES";}; // makesure they are not detecting the same toll.
					var mmsg = (new Date())+": F:"+foundentry+"/"+foundexit+" DF:"+Titanium.Geolocation.getDistanceFilter()+" sametoll:"+sametoll+": "+closesttollbydist0+"(t:"+type+")"+" / "+tolllastupd;
					maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);console.log(mmsg);
					if ( (foundentry == "1" || foundexit == "1") && sametoll== "NO" ) {
						Titanium.Geolocation.distanceFilter = 5; // increase the detection more frequent approaching POI
						var mmsg = (new Date())+": entry or exit IS DETECTED for "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
						mmsg += "executing a function, updateFound("+tollplaza+','+longitude+','+latitude+','+timestamp+','+cost+','+type+','+hwy+')';
						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
						maildebug == 1 && console.log(mmsg);
						mindebug == 1 && console.log(mmsg);
						///updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
						///Collect data for foundentry and founde
						if (foundentry == "1") {
							var mmsg =(new Date())+": add ENTRY with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
							tollentry.push({tollplaza:tollplaza,cancel:altitude,other:heading,type:type,longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
							var multipleToll = heading.split('|'); // check for multiple toll with same coord
							mmsg += "ENTRY multipleToll.length : "+multipleToll.length+" multipleToll : "+multipleToll+"\n";
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 			maildebug==1 || mindebug ==1 && console.log(mmsg);
							if (heading != "0") {
								var mmsg = "adding more line in ENTRY/EXIT(not ignored) with: "+heading;
								maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
								maildebug==1 || mindebug ==1 && console.log(mmsg);
								for (var i=0;i < multipleToll.length;i++) {
									var othertoll = multipleToll[i].split('@')[0].trim();
									var othertolltype = multipleToll[i].split('@')[1].trim();
									var mmsg = "othertoll : "+othertoll+" othertolltype: "+othertolltype;
									//mmsg +="multipleToll[i].split('@')[0].trim()+" : "+multipleToll[i].split('@')[1].trim();
									maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
									maildebug==1 || mindebug ==1 && console.log(mmsg);
									///if other entry is the end POI, it should already has start POI. If not, ignore it.
									if ( othertolltype == "end") {
										var hasstartentry = "0";
										if(tollentry.length > 0 ) {
											for (var k=0;k<tollentry.length;k++){
												if(othertoll == tollentry[k].tollplaza) {
													var hasstartentry = 1;														
												}													
											}
										}
										if ( hasstartentry == "1") { 
											tollexit.push({tollplaza:othertoll,"cancel":"0","other":"0","checkpoint":"0","type":"end",longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
											var mmsg = "tollplaza: "+othertoll+" has start entry: "+JSON.stringify(tollexit);
											maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
											maildebug==1 || mindebug ==1 && console.log(mmsg);
										} else {		
											tollcancel.push(othertoll.trim());
											var mmsg = "tollplaza: "+othertoll+" has NO start entry, need a cancellation: "+JSON.stringify(tollcancel);
											maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
											maildebug==1 || mindebug ==1 && console.log(mmsg);
										}
									} else {
									tollentry.push({"tollplaza": multipleToll[i].split('@')[0].trim(),"cancel":"0","other":"0","checkpoint":"0","type":"start",longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
									}
								}
							};
							var multipleToll = " "; // reset value					
							var mmsg = "@FoundEntry tollentry : length "+tollentry.length+" : "+JSON.stringify(tollentry);
							var mmsg = "@FoundEntry tollexit : length "+tollexit.length+" : "+JSON.stringify(tollexit);
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
							maildebug==1 || mindebug ==1 && console.log(mmsg);
							if (altitude != "0") {
								/// On ENTRY, if there is complete entry then exit, cancel is ENABLED.
								var cancancel = 0;
								for (var j=0;j<tollexit.length;j++){
									if (tollplaza == tollexit[j].tollplaza) {
										var cancancel = 1;
									}
								}
								if (cancancel == 1) {
									var mmsg = "cancancel: "+cancancel+" adding CANCELLed toll entry: "+altitude;
									maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
									maildebug==1 || mindebug ==1 && console.log(mmsg);
									var multipleCancel = altitude.split('|');
									for (var i=0;i < multipleCancel.length;i++) {
										tollcancel.push(multipleCancel[i].trim());
									};
								} else {
									var mmsg = "cancancel: "+cancancel+" cancelled entry: "+altitude+" not added";
								}
							};
							var mmsg = "@FoundEntry tollcancel : length "+tollcancel.length+" : "+JSON.stringify(tollcancel);
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
							maildebug==1 || mindebug ==1 && console.log(mmsg);	
							var multipleCancel = " "; /// reset multiple cancel value			
						};
						if (foundexit == "1") {
							if ( tollentry.length > "0") {
								for ( var z=0;z<tollentry.length;z++ ) {
									console.log("@FoundExit check exit with entry:"+tollplaza+"|vs.|"+tollentry[z].tollplaza.trim());
									if ( tollplaza == tollentry[z].tollplaza.trim() ){									
										var mmsg = (new Date())+"@FoundExit: match with entry! add exit with "+tollplaza+"\n";
										tollexit.push({tollplaza:tollplaza,cancel:altitude,other:heading,type:type,longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
									}	
								}
							} else {
								var mmsg = (new Date())+"@FoundExit: NOT add exit with "+tollplaza+": tollentry.length="+tollentry.length+"\n";
							}
							///pushTollExit(tollplaza,altitude,heading,type,longitude,latitude,cost,timestamp); // add to tollexit if entry exists.
							///var mmsg = (new Date())+": add exit with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
							///tollexit.push({tollplaza:tollplaza,cancel:altitude,other:heading,type:type,longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
							var multipleToll = heading.split('|'); // check for multiple toll with same coord
							mmsg += "\n";
							mmsg += "EXIT multipleToll.length : "+multipleToll.length+" multipleToll : "+multipleToll+"\n";
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
							maildebug==1 || mindebug ==1 && console.log(mmsg);
							if (heading != "0") {
								var mmsg = "adding more line in EXIT with: "+heading;
								maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
								maildebug==1 || mindebug ==1 && console.log(mmsg);
								for (var i=0;i < multipleToll.length;i++) {
									if ( multipleToll[i].split('@')[1].trim() == "end") {
										console.log("running pushTollExit at MULTIPLEENTRY with tollentry.length: "+tollentry.length);
										var tollplaza = multipleToll[i].split('@')[0];
										if ( tollentry.length > "0") {
											for ( var z=0;z<tollentry.length;z++ ) {
												if ( tollplaza == tollentry[z].tollplaza.trim() ){									
													var mmsg = (new Date())+": add exit with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
													tollexit.push({tollplaza:tollplaza,cancel:altitude,other:heading,type:type,longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
												}	
											}
										} else {
												var mmsg = (new Date())+": NOT add exit with "+tollplaza+": foundentry="+foundentry+":foundexit="+foundexit;
										}
										///pushTollExit(multipleToll[i].split('@')[0].trim(),0,0,"end",longitude,latitude,cost,timestamp); // add to tollexit if entry exists.
										///tollexit.push({"tollplaza":multipleToll[i].split('@')[0].trim(),"cancel":"0","other":"0","checkpoint":"0","type":"end",longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
										mmsg += "@FoundExit Other entry: tollplaza: "+multipleToll[i].split('@')[0].trim()+" has end entry: "+JSON.stringify(tollexit)+"\n";
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
										maildebug==1 || mindebug ==1 && console.log(mmsg);
									} else {
										tollentry.push({"tollplaza": multipleToll[i].split('@')[0].trim(),"cancel":"0","other":"0","checkpoint":"0","type":"start",longitude:longitude,latitude:latitude,cost:cost,timestamp:timestamp});
										var mmsg = "Other entry: tollplaza: "+multipleToll[i].split('@')[0].trim()+" has start entry from foundexit=1: "+JSON.stringify(tollentry);
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
										maildebug==1 || mindebug ==1 && console.log(mmsg);
									}
								};
							};
							var multipleToll = " "; // reset value	
							var mmsg = "@FoundExit tollexit : length "+tollexit.length+" : "+JSON.stringify(tollexit)+"\n";
							mmsg += "@FoundExit tollentry : length "+tollentry.length+" : "+JSON.stringify(tollentry)+"\n";
							mmsg += "@FoundExit tollcancel : length "+tollcancel.length+" : "+JSON.stringify(tollcancel)+"\n";
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
							maildebug==1 || mindebug ==1 && console.log(mmsg);
							if (altitude != "0") {
								var cancancel = 0;
								// On EXIT, if there is complete entry and exit then cancel is ENABLED.
								for (var j=0;j<tollentry.length;j++){
									if (tollplaza == tollentry[j].tollplaza) {
										var cancancel = 1;
									}
								}
								if (cancancel == 1) {
									var mmsg = "cancancel: "+cancancel+" adding CANCELLed toll entry: "+altitude;
									maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
									maildebug==1 || mindebug ==1 && console.log(mmsg);
									var multipleCancel = altitude.split('|');
									for (var i=0;i < multipleCancel.length;i++) {
										tollcancel.push(multipleCancel[i].trim());
									};
								} else {
									var mmsg = "cancancel: "+cancancel+" cancelled entry: "+altitude+" not added";
								}
								maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
								maildebug==1 || mindebug ==1 && console.log(mmsg);	
							};
							var mmsg="tollcancel : length "+tollcancel.length+" : "+JSON.stringify(tollcancel);
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
							maildebug==1 || mindebug ==1 && console.log(mmsg);	
							var multipleCancel = " "; /// reset multiple cancel value
						};
						//*console.log("timestamp is :" +timestamp);
						Titanium.App.Properties.setString('timelastupd',timestamp);
						Titanium.App.Properties.setString('tolllastupd',tollplaza);
						var foundentry = "0"; // reset entry
						var foundexit = "0"; // reset exit
						var distmatch = []; //reset the array
						var foundNotif = Ti.App.iOS.scheduleLocalNotification({
							alertBody: (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away",
							date:new Date(new Date().getTime() + 30000)
						}); 
						var mmsg = (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away";
				 		maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 		maildebug==1 || mindebug ==1 && console.log(mmsg);
			 		} else {
			 			var mmsg =(new Date())+": NO entry and exit detected for: "+tollplaza+", sametoll: "+sametoll+", set distanceFilter to 75";
						maildebug==1 || mindebug ==1 && console.log(mmsg);
			 			Titanium.Geolocation.distanceFilter = 75;
			 			///Previous toll determination calculation.
			 			if ( tollentry.length > "0" && tollexit.length > "0") {
			 				for ( var i=0;i<tollentry.length;i++ ) {
			 					for ( var j=0;j<tollexit.length;j++ ) {
			 						var mmsg =" tollentry["+i+"].tollplaza vs. tollexit["+j+"].tollplaza "+tollentry[i].tollplaza+" vs. "+tollexit[j].tollplaza;
			 						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
									maildebug==1 || mindebug ==1 && console.log(mmsg);
			 						if ( tollentry[i].tollplaza.trim() == tollexit[j].tollplaza.trim() ){
			 							hastollentryexit.push(tollentry[i].tollplaza.trim());
			 							var mmsg ="hastollentryexit : "+JSON.stringify(hastollentryexit);
			 							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
										maildebug==1 || mindebug ==1 && console.log(mmsg);
			 						}
			 					}
			 				}
			 			}
			 
			 		}
		 			/*//UPDATE HERE
					///updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
					tolltoupdate.length > 1?tolltoupdatedb=tolltoupdatesortuniq:tolltoupdatedb=tolltoupdate; ///Use unique only when toll to update 2 or more.
					for (var i=0;i<tolltoupdatedb.length;i++) {
						for (var j=0;j<tollentrytime.length;j++) {
							if (tolltoupdatedb[i].trim() == tollentrytime[j].tollplaza){
								console.log("updateFound("+tollentrytime[j].tollplaza+","+tollentrytime[j].longitude+","+tollentrytime[j].latitude+","+tollentrytime[j].timestamp+","+tollentrytime[j].cost+","+tollentrytime[j].type+","+tollentrytime[j].hwy+")");
							}
						}					
					}	*/						
				} else {
					//if (maildebug==1){
						var now = new Date();
						var mmsg = now+":"+closesttollbydist0+":x:"+tolllastupd;
						mmsg += "|range<"+range+"?:"+closestdist[0].dist+"/apr:"+approachtoll;
						mmsg += "|timediff>"+timerange+"?:"+timediff;
						maildebug == 1 || mindebug == 1 && console.log(mmsg);
						appendFile(mmsg,debugfile);
					//}
					
					///Logics for toll determination START
					if (tollentry.length > "0" && tollexit.length > "0") {
						closestdist[0].dist > 10000?Titanium.Geolocation.distanceFilter = 600:Titanium.Geolocation.distanceFilter = 300; /// reduce det freq when POI > 1 mile
			 			///reset data
			 			//console.log((new Date())+": tollentry.length: "+tollentry.length+": tollexit.length: "+tollexit.length+" "+closestdist[0].tolltollplaza+" at "+closestdist[0].dist+"ft away");
			 			var mmsg = (new Date())+"DO CALC: entry:"+tollentry.length+":exit:"+tollexit.length+"/"+tollcancel.length+" : "+closestdist[0].tolltollplaza+" : "+closestdist[0].dist+"/"+calcrange+" , "+Titanium.Geolocation.getDistanceFilter();
			 			maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 		maildebug==1 || mindebug ==1 && console.log(mmsg);
						if ( tollentry.length > "0" && tollexit.length > "0") {
			 				for ( var i=0;i<tollentry.length;i++ ) {
			 					for ( var j=0;j<tollexit.length;j++ ) {
			 						var mmsg = " tollentry["+i+"].tollplaza vs. tollexit["+j+"].tollplaza "+tollentry[i].tollplaza+" vs. "+tollexit[j].tollplaza;
			 						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 					maildebug==1 || mindebug ==1 && console.log(mmsg);
			 						if ( tollentry[i].tollplaza.trim() == tollexit[j].tollplaza.trim() ){
			 							hastollentryexit.push(tollentry[i].tollplaza.trim());
			 							var mmsg = "hastollentryexit : "+JSON.stringify(hastollentryexit);
			 							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 						maildebug==1 || mindebug ==1 && console.log(mmsg);
			 						}
			 					}
			 				}
			 			}
			 			if (hastollentryexit.length > 0) {
				 			tollentrytime = tollentrytime.concat(tollentry); /// concatenate data to diff obj for timestamp.
				 			tollexittime = tollexittime.concat(tollexit);
				 			tollcanceltime = tollcanceltime.concat(tollcancel);
				 			var mmsg = (new Date())+": toll ENTRY being xferred to diff obj: "+JSON.stringify(tollentrytime)+"\n";
				 			mmsg +=(new Date())+": toll EXIT being xferred to diff obj: "+JSON.stringify(tollexittime)+"\n";
				 			mmsg +=(new Date())+": toll CANCEL being xferred to diff obj: "+JSON.stringify(tollcanceltime)+"\n";
				 			maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
					 		maildebug==1 || mindebug ==1 && console.log(mmsg);
				 			tollentry = [];
				 			tollexit = [];
			 			}
			 			var mmsg = (new Date())+": check again hastollentryexit : "+JSON.stringify(hastollentryexit);
			 			maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 		maildebug==1 || mindebug ==1 && console.log(mmsg);				 		
			 			if ( hastollentryexit.length > 0 ) {
			 				var hastollentryexitsort = hastollentryexit.sort();
							var hastollentryexitsortuniq = [hastollentryexitsort[0].trim()];
							for (var i = 1; i < hastollentryexitsort.length; i++) {
								if ( hastollentryexitsort[i].trim() !== hastollentryexitsort[i-1].trim()) {
									hastollentryexitsortuniq.push(hastollentryexitsort[i].trim());
								}
							}
							///reset data
							hastollentryexit = [];
							var mmsg = "hastollentryexitsortuniq.length: "+hastollentryexitsortuniq.length+" hastollentryexitsortuniq : "+JSON.stringify(hastollentryexitsortuniq);
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 			maildebug==1 || mindebug ==1 && console.log(mmsg);
				 			if (tollcancel.length > 0) {
					 			var tollcancelsort = tollcanceltime.sort();
								var tollcancelsortuniq = [tollcancelsort[0].trim()];
								for (var i = 1; i < tollcancelsort.length; i++) {
									if ( tollcancelsort[i].trim() !== tollcancelsort[i-1].trim()) {
										tollcancelsortuniq.push(tollcancelsort[i].trim());
									}
								}
								tollcancel = [];	
								var mmsg = "tollcancelsortuniq.length: "+tollcancelsortuniq.length +" tollcancelsortuniq : "+JSON.stringify(tollcancelsortuniq); 				
				 				maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
					 			maildebug==1 || mindebug ==1 && console.log(mmsg);
				 			}														
			 				for ( var i=0; i<hastollentryexitsortuniq.length; i++){
			 					var needtocancel = "0";
			 					if (tollcancelsortuniq) { 
			 						if (tollcancelsortuniq.length > 0) {
					 					for (var j=0;j<tollcancelsortuniq.length;j++){
					 						var mmsg ="hastollentryexitsortuniq[i] !=  tollcancelsortuniq[j] :"+hastollentryexitsortuniq[i]+" vs ."+tollcancelsortuniq[j];
											maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
						 					maildebug==1 || mindebug ==1 && console.log(mmsg);
					 						if (hastollentryexitsortuniq[i] ==  tollcancelsortuniq[j]){
					 							var needtocancel = 1;
					 						}
				 						}		
			 						}
			 					}
			 					if ( needtocancel == "0" ) {
			 						tolltoupdate.push(hastollentryexitsortuniq[i]);
			 						var mmsg = "1st tolltoupdate.push: "+JSON.stringify(tolltoupdate);
			 						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 					maildebug==1 || mindebug ==1 && console.log(mmsg);
			 						if (tolltoupdate.length > 1){
			 							var tolltoupdatesort = tolltoupdate.sort();
			 							var tolltoupdatesortuniq = [tolltoupdatesort[0]];
			 							for (var i = 1; i < tolltoupdate.length; i++) {
											if ( tolltoupdatesort[i] !== tolltoupdatesort[i-1]) {
												tolltoupdatesortuniq.push(tolltoupdatesort[i]);			
											}
										}							
			 						}							
									if ( tolltoupdatesort ) { 
										var mmsg ="tolltoupdatesort.length :"+tolltoupdatesort.length+" tolltoupdatesort : "+JSON.stringify(tolltoupdatesort);
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 						maildebug==1 || mindebug ==1 && console.log(mmsg);
										};					
			 						var mmsg = "tolltoupdate.length: "+tolltoupdate.length+" tolltoupdate : "+JSON.stringify(tolltoupdate);
			 						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 					maildebug==1 || mindebug ==1 && console.log(mmsg);
									if ( tolltoupdate.length > 1 ) {
										var mmsg = "tolltoupdatesortuniq.length :"+tolltoupdatesortuniq.length+" tolltoupdatesortuniq : "+JSON.stringify(tolltoupdatesortuniq);
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 						maildebug==1 || mindebug ==1 && console.log(mmsg);
									} 			
			 					} 					
			 				}
			 				///RESET THE CANCELLED TOLLPLAZA
			 				var tollcancelsortuniq = []; var tollcancelsort = [];
			 			}
			 			///Logics for toll determination END HERE
			 			///UPDATE THE DB then RESET var
				 		//UPDATE HERE
						///updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
						tolltoupdate.length > 1?tolltoupdatedb=tolltoupdatesortuniq:tolltoupdatedb=tolltoupdate; ///Use unique only when toll to update 2 or more.
						var mmsg = "RIGH b4 tolltoupdateDB: tolltoupdatedb.length: "+tolltoupdatedb.length+" tolltoupdatedb : "+JSON.stringify(tolltoupdatedb);
						maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 		maildebug==1 || mindebug ==1 && console.log(mmsg);
				 		if (tolltoupdatedb.length>0){
							for (var i=0;i<tolltoupdatedb.length;i++) {
								for (var j=0;j<tollentrytime.length;j++) {
									if (tolltoupdatedb[i].trim() == tollentrytime[j].tollplaza){
										var mmsg = "UPDATE DB: updateFound("+tollentrytime[j].tollplaza+","+tollentrytime[j].longitude+","+tollentrytime[j].latitude+","+tollentrytime[j].timestamp+","+tollentrytime[j].cost+","+tollentrytime[j].type+","+tollentrytime[j].hwy+")";
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
					 					maildebug==1 || mindebug ==1 && console.log(mmsg);
										updateFound(tollentrytime[j].tollplaza,tollentrytime[j].longitude,tollentrytime[j].latitude,tollentrytime[j].timestamp,tollentrytime[j].cost,tollentrytime[j].type,tollentrytime[j].hwy);
									}
								}
								///reset array											 			
					 			tollentrytime = [];
					 			tollexittime = [];
					 			tollcanceltime = [];											
							}
							///ZERO out tolltoupdate once the value is updated in the DB	
							tolltoupdate = [];
						}
			 			///reset array
			 			/*
			 			tollentrytime = [];
			 			tollexittime = [];
			 			tollcanceltime = [];*/
					} else {
						if (timediff > 60000){
							var mmsg = (new Date())+": entry:"+tollentry.length+":exit:"+tollexit.length+"/"+tollcancel.length+" :"+closestdist[0].tolltollplaza+" : "+closestdist[0].dist+" / "+calcrange+" skip calculation, "+Titanium.Geolocation.getDistanceFilter()+"ft";											
							maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
				 			maildebug==1 || mindebug ==1 && console.log(mmsg);
						};	
						closestdist[0].dist > calcrange?Titanium.Geolocation.distanceFilter = 300:Titanium.Geolocation.distanceFilter = 75;				
					}				
				}
				//*console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));	
				}	
		};
		
		var headingCallback = function(e){
		if (e.error)
		{
			updatedHeading = 'error: ' + e.error;
			//*Ti.API.info("Code translation: "+translateErrorCode(e.code));
			return;
		}
		var magneticHeading = e.heading.magneticHeading;
		var trueHeading = e.heading.trueHeading;
		var timestamp = e.heading.timestamp;	
		maildebug==1 && Titanium.API.info(new Date(timestamp)+','+timestamp+','+trueHeading+','+magneticHeading);
		Titanium.App.Properties.setString('currentHeading', trueHeading);
	};
		
		if (Ti.Geolocation.locationServicesEnabled) {
			var distmatch = closestdist = [];
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;		
			Titanium.Geolocation.purpose = 'Get Current Location';
			
			var thedistanceNearbyFilter = Titanium.App.Properties.getInt('thedistanceNearbyFilter',10000);
			if ( thedistanceNearbyFilter < 5280 ) {
				Titanium.Geolocation.distanceFilter = 26;	
				Titanium.Geolocation.addEventListener('location', locationCallback);
				locationAdded = true;
			} else {
				Titanium.Geolocation.distanceFilter = Titanium.App.Properties.getInt('distanceFilter',75);
				Titanium.Geolocation.addEventListener('location', locationCallback);
				locationAdded = true;
			}

			var mmsg = new Date()+": Titanium.Geolocation.distanceFilter to was set to  :"+Titanium.App.Properties.getInt('distanceFilter')+".";
			mmsg += "Titanium.Geolocation.distanceFilter :"+Titanium.Geolocation.distanceFilter;
			console.log(mmsg);
			appendFile(mmsg,debugfile);
			
			
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
		if (action=="remove") {
			Ti.API.info("removing location callback on " + action);
			Titanium.Geolocation.distanceFilter = 1000000;
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			locationAdded = false;
			Titanium.Geolocation.headingFilter = 359;
			Titanium.Geolocation.removeEventListener('heading', headingCallback);
			headingAdded = false;
		}
	};
};


Alloy.Globals.eventSimpleLocDet = function () {

var locationCallbackSimple = function(e){
		///*Ti.API.info(JSON.stringify(e.coords));
		var lon1 = +e.coords.longitude;
		var lat1 = +e.coords.latitude;
		var time1 = +e.coords.timestamp;
		var mmsg = (new Date(time1))+','+time1+','+lat1+","+lon1;
		console.log(mmsg);
		if((Titanium.App.Properties.getInt('maildebug'))==1 && (time1 - timelastdebug) >= 30000){
			Alloy.Globals.appendFile(mmsg,debugfile);
			var timelastdebug = time1;
		}
		Alloy.Globals.appendFile(mmsg,debugfile);
};

if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = Titanium.App.Properties.getInt('distanceFilter');;
		Titanium.Geolocation.purpose = 'Get Current Location';		
		Titanium.Geolocation.addEventListener('location', locationCallbackSimple);
		locationAdded = true;
} else {
	    alert('Please enable location services');
	}
	
};

Alloy.Globals.createAnnotations = function () {
    var annotationData = [];
    for (var i=0; i < 10; i++) 
    {
            var mountainView = Titanium.Map.createAnnotation(
            {
                latitude:37.390749,
                longitude:-122.081651,
                title:"Appcelerator Headquarters",
                subtitle:'Mountain View, CA',
                pincolor: isAndroid ? "orange" : Titanium.Map.ANNOTATION_RED,
                animate:true,
                myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
            });

      annotationData.push(mountainView);
    };  

    return annotationData ;
};

Alloy.Globals.updatetollsourceTable = function(state,country,city,tollprovider,data1,data2,data3,data4) {
	var tollsourceModel = Alloy.createModel("tollsource",{
		state : state,
		country : country,
		city :  city,
		tollprovider : tollprovider,				
		data1 : data1,
		data2 : data2,
		data3 : data3,
		data4 : data4
	});			
	tollsourceModel.save();
};

Alloy.Globals.updatetollsourceAlternate = function(loc) {
		var mmsg = (new Date())+": error downloading data using a backup site instead";
		Alloy.Globals.appendFile(mmsg,debugfile); console.log(mmsg);
		Alloy.Collections.tollsource.deleteAll();
		var alturlsource = "https://spreadsheets.google.com/feeds/list/1RfpiZtO0iFMVJljVMKvhuGzfn0-BR4OADSddoONF948/od6/public/basic?hl=en_US&alt=json";
		var altxhrsource = Ti.Network.createHTTPClient({
		    onload: function(ee) {
			    try {
	Alloy.Collections.tollsource.deleteCountry(country); // delete intended location only
			    	json = JSON.parse(this.responseText);
			    	console.log("JSON after tollsource load : "+JSON.stringify(json));
			    	var out = '{ "poi" : ['+"\n";
			    	for (var i=0; i < json.feed.entry.length; i++) {
			    		var state = json.feed.entry[i].title.$t.trim();
						var country = json.feed.entry[i].content.$t.split(',')[0].split(':')[1].trim();
						var city = json.feed.entry[i].content.$t.split(',')[1].split(':')[1].trim();
						var tollprovider = json.feed.entry[i].content.$t.split(',')[2].split(':')[1].trim() || "none";
						var data1 = json.feed.entry[i].content.$t.split(',')[3].split(':')[1].trim() || "none";
						var data2 = json.feed.entry[i].content.$t.split(',')[4].split(':')[1].trim() || "none";
						var data3 = json.feed.entry[i].content.$t.split(',')[5].split(':')[1].trim() || "none";
						var data4 = json.feed.entry[i].content.$t.split(',')[6].split(':')[1].trim() || "none";
						Alloy.Globals.updatetollsourceTable(state,country,city,tollprovider,data1,data2,data3,data4);	
						if ( i == (json.feed.entry.length - 1)) {
							out += '{ "state" : "'+state+'" , "country" : "'+country+'" , "city" : "'+city+'" , "tollprovider" : "'+tollprovider+'"  , "data1" : "'+data1+'" , "data2" : "'+data2+'" , "data3" : "'+data3+'" }]}'+"\n";
						} else {
							out += '{ "state" : "'+state+'" , "country" : "'+country+'" , "city" : "'+city+'" , "tollprovider" : "'+tollprovider+'"  , "data1" : "'+data1+'" , "data2" : "'+data2+'" , "data3" : "'+data3+'" },'+"\n";
						}
			    	}
					alturlsourcefile.write(out);
					urlsourcefile.write(out);
					var json = out;
			    } catch(ee){
						Ti.API.info("cathing e: "+ee);
						var mmsg = (new Date())+": load file error cathing ee: "+JSON.stringify(ee);
						(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
				}
			}	
		});			
		altxhrsource.open("GET", alturlsource);
		altxhrsource.send();
};

Alloy.Globals.updatetollsource = function() {
	var url = "http://23.21.53.150:10000/tollsource.json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	Alloy.Collections.tollsource.deleteCountry(country); // delete intended location only
				// parse the retrieved data, turning it into a JavaScript object
		    	json = JSON.parse(this.responseText);
				// update DB
				for (var i=0; i < +json.poi.length; i++) {
					var state = json.poi[i].state;
					var country = json.poi[i].country;
					var city = json.poi[i].city;
					var tollprovider = json.poi[i].tollprovider || "none";
					var data1 = json.poi[i].data1 || "none";
					var data2 = json.poi[i].data2 || "none";
					var data3 = json.poi[i].data3 || "none";
					var data4 = json.poi[i].data4 || "none";
					Alloy.Globals.updatetollsourceTable(state,country,city,tollprovider,data1,data2,data3,data4);	
				}
			} catch(e){
				Ti.API.info("cathing e: "+e);
				var mmsg = (new Date())+": error downloading data from primary site, "+url+" , data is not in the right format";
				Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
				Alloy.Globals.updatetollsourceAlternate();
			}
		}
	});
	xhr.onerror = function(e){
		var mmsg = (new Date())+": error downloading data from primary site, "+url+" , downloading data using a backup site instead";
		Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
		Alloy.Globals.updatetollsourceAlternate();		
		var mmsg = (new Date())+": load file error cathing e: "+JSON.stringify(e);
		(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);console.log(mmsg);
	};
	xhr.open("GET", url);
	xhr.send();
};

Alloy.Globals.updatetollsource();
