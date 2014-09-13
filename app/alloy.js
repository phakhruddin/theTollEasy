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
		alert("downloading data using a backup site instead");
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
						(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
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
				alert("error downloading data from primary site, "+url+" , data is not in the right format");
				Alloy.Globals.updateTollPlazaAlternate(loc);
			}
		}
	});
	xhr.onerror = function(e){
		alert("error downloading data from primary site, "+url+" , downloading data using a backup site instead");
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
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" }]}'+"\n";
						} else {
							out += '{ "plaza" : "'+tollplaza+'" , "latitude" : "'+latitude+'" , "longitude" : "'+longitude+'"  , "altitude" : "'+altitude+'" , "heading" : "'+heading+'" , "speed" : "'+speed+'" , "hwy" : "'+hwy+'" , "cost" : "'+cost+'" },'+"\n";
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
		(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
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

var contents = file4.read() || file5.read();
//console.log("contents text :" +contents.text);
if(contents && contents.text){
		var preParseData = (contents.text); 
		var json = json || JSON.parse(preParseData);
}

var mmsg = "json data : "+JSON.stringify(json);
(Titanium.App.Properties.getInt('maildebug'))==1 && Alloy.Globals.appendFile(mmsg,debugfile);
var lon1 = lat1 = time1 = timelastdebug = 0;

	var locationCallback = function(e)
	{
	if (e.length) {
		var count = Titanium.App.Properties.getInt('count');count++; // todebug count
		mindebug == 1 && console.log("count:"+count);
		///*Ti.API.info(JSON.stringify(e.coords));
		var lon1 = +e.coords.longitude;
		var lat1 = +e.coords.latitude;
		var time1 = +e.coords.timestamp;
		//*console.log("lon : lat : time :"+lon1+":"+lat1+":"+(new Date(time1)));
		if((Titanium.App.Properties.getInt('maildebug'))==1 && (time1 - timelastdebug) >= 60000){
			var mmsg = "lon : lat : time :"+lon1+":"+lat1+":"+(new Date(time1));
			Alloy.Globals.appendFile(mmsg,debugfile);
			var timelastdebug = time1;
		}
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
		   /** INITIAL JSON CALC
		   for (i=0;i< json.poi.length;i++){
		   		var tolltollplaza = json.poi[i].plaza;
		   		var lat2 = json.poi[i].latitude;
		   		var lon2 = json.poi[i].longitude;
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
		   }	   		   
		   // JSON FILE ENDS
		//*console.log("JSON distance unsort :" +JSON.stringify(distmatch));
		var closestdist = distmatch.sort(function(a, b)
		{
			return a.dist - b.dist;
		});**/
		var thedistanceNearbyFilter = Titanium.App.Properties.getInt('thedistanceNearbyFilter',10000);
        var closestdistobj = Ti.App.Properties.getString('distmatchobj',"NO");
        if (closestdistobj != "NO") {
        	var closestdistarray = JSON.parse(Ti.App.Properties.getString('distmatchobj'));
        	maildebug == 1 && console.log("checking : "+closestdistarray);
        };
        var thearray = (thedistanceNearbyFilter < 5280 )?closestdistarray:json.poi;
        mindebug == 1 && console.log("The First Toll distance is at  "+thedistanceNearbyFilter);
        Titanium.App.Properties.setInt('count', count); // todebug count
        // reduce down to number of JSON objects
        if(thearray.length) {
		   for (i=0;i< thearray.length;i++){
		   		var tolltollplaza = thearray[i].plaza || thearray[i].tolltollplaza;
		   		var lat2 = thearray[i].latitude;
		   		var lon2 = thearray[i].longitude;
		   		var mmsg = new Date()+','+tolltollplaza+','+lat2+','+lon2;
		   		mindebug == 1 && console.log(mmsg);
		   		var dist = Alloy.Globals.calcDistance(tolltollplaza,lat1,lon1,lat2,lon2,"F");
		   		if (dist < 528000 ) { //* 100 miles radius
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
		   		}    	
		   }
		   } else {
		   	console.log("empty JSON thearray, length is 0");
		   }	   		   
		   // JSON FILE ENDS
		maildebug == 1 && console.log("JSON distance unsort :" +JSON.stringify(distmatch));
		
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
		var range = detectionRange;
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
						var mmsg = now+": Alloy.Globals.eventDetectTollPlaza: "+closesttollbydist0+":x:"+tolllastupd;
						mmsg += "|range<"+range+"?:"+closestdist[0].dist;
						mmsg += "|timediff>"+timerange+"?:"+timediff;
						mindebug == 1 && console.log(mmsg);
						Alloy.Globals.appendFile(mmsg,debugfile);
			}
		}
		//*console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
	};
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
		Titanium.Geolocation.distanceFilter = Titanium.App.Properties.getInt('distanceFilter');
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
