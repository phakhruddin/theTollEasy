//*console.log("Run geocode in the BG");

!Titanium.App.Properties.getInt('maildebug') ? maildebug = 0 : maildebug = Titanium.App.Properties.getInt('maildebug');
var mindebug = Titanium.App.Properties.getInt('mindebug',0);
!Titanium.App.Properties.getString('loc') ? loc = "newberlin" : loc = Titanium.App.Properties.getString('loc');
Titanium.App.Properties.setInt('closercount',500); // reset closer count to 500 then go down
!Titanium.App.Properties.getInt('radius')? radius = 3000: radius = Titanium.App.Properties.getInt('radius');
Ti.App.Properties.removeProperty('distmatchobj');
Ti.App.Properties.removeProperty('thedistanceNearbyFilter');
var distmatch = [];


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
	mindebug == 1 && console.log(mmsg);
	maildebug==1 && appendFile(mmsg,debugfile);
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
	mindebug == 1 && console.log(mmsg);
	var db = Ti.Database.open('_alloy_');
	db.execute('BEGIN');
	db.execute('INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2);
	db.execute('COMMIT');
	db.close();
	Ti.Media.vibrate([0, 2000]);
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
			var distmatch = [];
			var count = Titanium.App.Properties.getInt('count');count++; // todebug count
			mindebug == 1 && console.log("count:"+count);
			//*Ti.API.info(JSON.stringify(e.coords));
			var lon1 = +e.coords.longitude;
			var lat1 = +e.coords.latitude;
			var time1 = +e.coords.timestamp;
	        mmsg = new Date(e.coords.timestamp)+','+e.coords.timestamp+','+e.coords.latitude+','+e.coords.longitude;
	        //console.log(" maildebug is: "+Titanium.App.Properties.getInt('maildebug')+" , count is : "+count);
	      	if((Titanium.App.Properties.getInt('maildebug'))==1 && count >= 30){	//log loc to debug file every 30 secs
		      	mindebug == 1 && console.log(mmsg+" should be appended to location.txt");	
				appendFile(mmsg,locfile);
				var count = 0;
			}
	        /// Ti.API.info(mmsg); ///THE ONLY LOG LEFT - MINIMAL
	        var thedistanceNearbyFilter = Titanium.App.Properties.getInt('thedistanceNearbyFilter',10000);
	        var closestdistobj = Ti.App.Properties.getString('distmatchobj',"NO");
	        if (closestdistobj != "NO") {
	        	var closestdistarray = JSON.parse(Ti.App.Properties.getString('distmatchobj'));
	        	mindebug == 1 && console.log("checking : "+closestdistarray);
	        };
	        var thearray = (thedistanceNearbyFilter < 5280 )?closestdistarray:json.poi;
	        mindebug == 1 && console.log("The First Toll distance is at  "+thedistanceNearbyFilter);
	        Titanium.App.Properties.setInt('count', count); // todebug count
	        // reduce down to number of JSON objects
			   for (i=0;i< thearray.length;i++){
			   		var tolltollplaza = thearray[i].plaza || thearray[i].tolltollplaza;
			   		var lat2 = thearray[i].latitude;
			   		var lon2 = thearray[i].longitude;
			   		var dist = calcDistance(tolltollplaza,lat1,lon1,lat2,lon2,"F");
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
			   // JSON FILE ENDS
			mindebug == 1 && console.log("JSON distance unsort :" +JSON.stringify(distmatch));
			
				var closestdist = distmatch.sort(function(a, b)
				{
					return a.dist - b.dist;
				});
				mindebug == 1 && console.log("JSON closestdist : "+JSON.stringify(closestdist));
				Ti.App.Properties.setString('distmatchobj', JSON.stringify(distmatch));
				mindebug == 1 && console.log("set distmatchobj"); 
				//*console.log("JSON distance SORT :" +JSON.stringify(closestdist));
				var closesttollbydist = closestdist[0].tolltollplaza;
				var closesttollbydist0 = closestdist[0].tolltollplaza;
				var closestdist0 = closestdist[0].dist;
				var outputclosesttollbydist0 = closestdist[0].tolltollplaza+" distance : "+closestdist[0].dist;
				Titanium.App.Properties.setInt('thedistanceNearbyFilter',closestdist0);
				mindebug == 1 && console.log("Distance Close Filter is set to: "+thedistanceNearbyFilter);
				Titanium.App.Properties.setString('outputclosesttollbydist0', outputclosesttollbydist0);
				//Update Found if distance is closer than 5 ft and last update 30 secs ago.
				//* comparison
				var range = 500;
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
					mindebug == 1 && console.log("executing a function, updateFound("+tollplaza+','+longitude+','+latitude+','+timestamp+','+cost+','+type+','+'hwy');
					updateFound(tollplaza,longitude,latitude,timestamp,cost,type,hwy);
					//*console.log("timestamp is :" +timestamp);
					Titanium.App.Properties.setString('timelastupd',timestamp);
					Titanium.App.Properties.setString('tolllastupd',tollplaza);
					var distmatch = []; //reset the array
					var foundNotif = Ti.App.iOS.scheduleLocalNotification({
						alertBody: (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away",
						date:new Date(new Date().getTime() + 10000)
					}); 
					var mmsg = (new Date())+" : tollplaza "+tollplaza+" was detected less than "+closestdist[0].dist+" ft away";
			 		maildebug==1 && appendFile(mmsg,debugfile);
			 		mindebug == 1 && console.log(mmsg);
				} else {
					//if (maildebug==1){
						var now = new Date();
						var mmsg = now+":"+closesttollbydist0+":x:"+tolllastupd;
						mmsg += "|range<"+range+"?:"+closestdist[0].dist;
						mmsg += "|timediff>"+timerange+"?:"+timediff;
						mindebug == 1 && console.log(mmsg);
						appendFile(mmsg,debugfile);
					//}
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
			Titanium.Geolocation.purpose = 'Get Current Location';
			
			var thedistanceNearbyFilter = Titanium.App.Properties.getInt('thedistanceNearbyFilter',10000);
			if ( thedistanceNearbyFilter < 5280 ) {
				Titanium.Geolocation.distanceFilter = 26;	
				Titanium.Geolocation.addEventListener('location', locationCallback);
				locationAdded = true;
				var mmsg = new Date()+": Titanium.Geolocation.distanceFilter to was set to  26";
			} else {
				Titanium.Geolocation.distanceFilter = 52;
				Titanium.Geolocation.addEventListener('location', locationCallback);
				locationAdded = true;
				var mmsg = new Date()+": Titanium.Geolocation.distanceFilter to was set to  52";
			}			
			console.log(": Titanium.Geolocation.distanceFilter to was set to  :"+Titanium.Geolocation.distanceFilter);
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
	    var locationNotif = Ti.App.iOS.scheduleLocalNotification({
		    alertBody:'Please enable location services :'+new Date()+'.',
		    date:new Date(new Date().getTime() + 3000) // 1 second after pause
		 }); 
	}
};

//MAIN


bgLocFound(loc);
checkAlive=1;
