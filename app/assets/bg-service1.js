//*console.log("Run geocode in the BG");
/*Ti.API.info('bg-service1: service has been invoked once, and will now be stopped to release it from memory. ');
Ti.App.currentService.stop();

var listener = Ti.App.currentService.addEventListener('stop',function(){
  Ti.API.info('bg-service1: Although the service has been stopped, it is still registered and will be executed again on next pause');
  Ti.API.info('bg-service1: As all background services are automatically stopped on resume, it is not always necessary to explicitly stop a service');
});*/

!Titanium.App.Properties.getInt('maildebug') ? maildebug = 0 : maildebug = Titanium.App.Properties.getInt('maildebug');
!Titanium.App.Properties.getString('loc') ? loc = "newberlin" : loc = Titanium.App.Properties.getString('loc');


 var initialNotif = Ti.App.iOS.scheduleLocalNotification({
    alertBody:'is detecting the tollplaza in the background starting ,'+new Date()+'.',
    date:new Date(new Date().getTime() + 1000) // 1 second after pause
 });   

var writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};

var appendFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.append(content+"\n");
};

//* Mail debugging on
var debugfile = "maildebug.txt";
var locfile = "location.txt";

if (maildebug == "1") {
	writeFile((new Date())+": debugging start", debugfile);
}


// JSON file for downloaded tolldata
var thefile = loc+".txt";
var file4 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
var thefile5 = loc+"1.txt";
var file5 = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile5
			);
			
var downloadTollplaza = function(loc) {	
	var url = "http://23.21.53.150:10000/"+loc+".json";	
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
			file4.write(this.responseText);
			} catch(e){
				Ti.API.info("cathing e: "+e);
			}
		}
	});
	xhr.onerror = function(e){
		var errorNotif = Ti.App.iOS.scheduleLocalNotification({
		    alertBody: "error downloading data from primary site, "+url+" , downloading data using a backup site instead",
		    date:new Date(new Date().getTime() + 10000) // 1 second after pause
	 	}); 
		//alert("error downloading data from primary site, "+url+" , downloading data using a backup site instead");
		//*console.log(e);
		// backup sites
		var url1 = "https://spreadsheets.google.com/feeds/list/1Omzwq1RKWeptvtV4H0ryLi3IP2fFdPFNqBPq2_nuuCc/od6/public/basic?hl=en_US&alt=json";
		var xhr1 = Ti.Network.createHTTPClient({
		    onload: function(e) {
			    try {
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
		maildebug==1 && appendFile(mmsg,debugfile);
		xhr1.open("GET", url1);
		xhr1.send();		
	};
	xhr.open("GET", url);
	xhr.send();
};

downloadTollplaza(loc);


var checkAlive = setInterval(function () {
	var mmsg = (new Date())+" keep Alive check";
	console.log(mmsg);
	maildebug==1 && appendFile(mmsg,debugfile);
	var curNotif = Ti.App.iOS.scheduleLocalNotification({
		alertBody: (new Date())+" checkAlive.",
		date:new Date(new Date().getTime() + 3000)
	});
}, 300000);

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
	maildebug==1 && console.log(calcresult);
   	return Math.round(dist);
};

var updateFound = function(tollplaza,longitude,latitude,timestamp,cost,type,hwy) {
	var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
	var cost = cost || "0.00";	
	var mmsg = "updateFound: "+new Date()+": About to update found DB: tp : "+tollplaza+", lon:"+longitude +", lat : "+latitude +", cost : "+cost+", type : "+type	+", timestamp : "+timestamp+"\n";
	maildebug==1 && appendFile(mmsg,debugfile);
	maildebug==1 && console.log(mmsg);
	Titanium.Media.vibrate([0, 2000]);
	var db = Ti.Database.open('_alloy_');
	db.execute('BEGIN');
	db.execute('INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2);
	db.execute('COMMIT');
	db.close();
};

var bgLocFound = function(loc){

var contents = "";
var contents = file4.read() || file5.read();
//*console.log("contents text :" +contents.text);
if(contents.text){
	var preParseData = (contents.text); 
	var json = json || JSON.parse(preParseData);
}
var mmsg = "json data : "+JSON.stringify(json);
maildebug==1 && appendFile(mmsg,debugfile);
	
	var locationCallback = function(e)
	{
		var count = Titanium.App.Properties.getInt('count');count++;
		//*Ti.API.info(JSON.stringify(e.coords));
		var lon1 = +e.coords.longitude;
		var lat1 = +e.coords.latitude;
		var time1 = +e.coords.timestamp;
        mmsg = new Date(e.coords.timestamp)+','+e.coords.timestamp+','+e.coords.latitude+','+e.coords.longitude;
        //console.log(" maildebug is: "+Titanium.App.Properties.getInt('maildebug')+" , count is : "+count);
      	if((Titanium.App.Properties.getInt('maildebug'))==1 && count >= 30){	//log loc to debug file every 30 secs
	      	console.log(mmsg+" should be appended to location.txt");	
			appendFile(mmsg,locfile);
			var count = 0;
		}
        Ti.API.info(mmsg);
        Titanium.App.Properties.setInt('count', count);
		   //JSON FILE
		   for (i=0;i< json.poi.length;i++){
		   		var tolltollplaza = json.poi[i].plaza;
		   		var lat2 = json.poi[i].latitude;
		   		var lon2 = json.poi[i].longitude;
		   		var dist = calcDistance(tolltollplaza,lat1,lon1,lat2,lon2,"F");
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
		});
		//*console.log("JSON distance SORT :" +JSON.stringify(closestdist));
		var closesttollbydist = closestdist[0].tolltollplaza;
		var closesttollbydist0 = closestdist[0].tolltollplaza;
		var closestdist0 = closestdist[0].dist;
		var outputclosesttollbydist0 = closestdist[0].tolltollplaza+"(BG)"+" distance : "+closestdist[0].dist;
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
			updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
			//*console.log("timestamp is :" +timestamp);
			Titanium.App.Properties.setString('timelastupd',timestamp);
			Titanium.App.Properties.setString('tolllastupd',tollplaza);
			var foundNotif = Ti.App.iOS.scheduleLocalNotification({
				alertBody: (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away",
				date:new Date(new Date().getTime() + 10000)
			}); 
			var mmsg = (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away";
	 		maildebug==1 && appendFile(mmsg,debugfile);
		} else {
			if (maildebug==1){
				var now = new Date();
				var mmsg = now+":"+closesttollbydist0+":x:"+tolllastupd;
				mmsg += "|range<"+range+"?:"+closestdist[0].dist;
				mmsg += "|timediff>"+timerange+"?:"+timediff;
				console.log(mmsg);
				appendFile(mmsg,debugfile);
			}
		}
		//*console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
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
		Titanium.Geolocation.distanceFilter = 5;
		Titanium.Geolocation.purpose = 'Get Current Location';
	
	/*	Titanium.Geolocation.getCurrentPosition(function(e) {
		        if (e.error) {
		            Ti.API.error('Error: ' + e.error);
		        } else {
		            //*Ti.API.info(JSON.stringify(e.coords));
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
							//*Ti.API.info("Code translation: "+JSON.stringify(e.code));
						}
					});	

			       //JSON FILE
				   for (i=0;i< json.poi.length;i++){
				   		var tolltollplaza = json.poi[i].plaza;
				   		var lat2 = json.poi[i].latitude;
				   		var lon2 = json.poi[i].longitude;
				   		var dist = calcDistance(tolltollplaza,lat1,lon1,lat2,lon2,"F");
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
			        var outputclosesttollbydist1 = closestdist[1].tolltollplaza +" distance : "+closestdist[1].dist;
			        var outputclosesttollbydist2 = closestdist[2].tolltollplaza +" distance : "+closestdist[2].dist;
					Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
					Titanium.App.Properties.setString('outputclosesttollbydist1', outputclosesttollbydist1);
					Titanium.App.Properties.setString('outputclosesttollbydist2', outputclosesttollbydist2);
					//Update Found if distance is closer than 5 ft and last update 30 secs ago.
					var range = 100; // 100 m
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
						updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
						//*console.log("timestamp is :" +timestamp);
						Titanium.App.Properties.setString('timelastupd',timestamp);
						Titanium.App.Properties.setString('tolllastupd',tollplaza);
						var curNotif = Ti.App.iOS.scheduleLocalNotification({
						    alertBody: (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away",
						    date:new Date(new Date().getTime() + 5000)
						  }); 
						var mmsg = (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away";
	 					maildebug==1 && appendFile(mmsg,debugfile); 
					} else {
						if (maildebug==1){
							var now = new Date();
							var mmsg = now+": is this existing toll? "+closesttollbydist0+" vs. tolllastupd: "+tolllastupd;
							mmsg += " is range less than "+range+" ? : range is : "+closestdist[0].dist;
							mmsg += " is timediff less than "+timerange+" ? : timediff is : "+timediff;
							console.log(mmsg);
							appendFile(mmsg,debugfile);
						}
					}
					//*console.log(" timestamp after set prop "+Titanium.App.Properties.getString('timelastupd'));
		        }
		    });*/
	
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;
		
	   if (Titanium.Geolocation.hasCompass)
		{
			Titanium.Geolocation.showCalibration = false;
			Titanium.Geolocation.headingFilter = 45;
/*			Ti.Geolocation.getCurrentHeading(function(e)
					{
						if (e.error)
						{
							currentHeading = 'error: ' + e.error;
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
		});*/
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
	    var locationNotif = Ti.App.iOS.scheduleLocalNotification({
		    alertBody:'Please enable location services :'+new Date()+'.',
		    date:new Date(new Date().getTime() + 3000) // 1 second after pause
		 }); 
	}
};

//MAIN


bgLocFound(loc);
checkAlive=1;
