//*console.log("Run geocode in the BG");

!Titanium.App.Properties.getInt('maildebug') ? maildebug = 0 : maildebug = Titanium.App.Properties.getInt('maildebug');
var mindebug = Titanium.App.Properties.getInt('mindebug',1);
!Titanium.App.Properties.getString('loc') ? loc = "newberlin" : loc = Titanium.App.Properties.getString('loc');
Titanium.App.Properties.setInt('closercount',500); // reset closer count to 500 then go down
!Titanium.App.Properties.getInt('radius')? radius = 3000: radius = Titanium.App.Properties.getInt('radius');
Ti.App.Properties.removeProperty('distmatchobj');
Ti.App.Properties.removeProperty('thedistanceNearbyFilter');
var newdistanceFilter = Titanium.App.Properties.getInt('distanceFilter',75);
var detectionRange = Titanium.App.Properties.getInt('detectionRange',200);
var distmatch = [];
var tollentry = [];
var tollexit = [];
var tollcancel = [];
var tolltoupdate = [];
var hastollentryexit = [];
var foundentry = foundexit = "0";
var needtocancel = 1;
var tollentrytime = [];
var tollexittime = [];
var tollcanceltime = [];
var locarray = [];
var approachtoll = 1;
var lastapproachtoll = "none";


 var initialNotif = Ti.App.iOS.scheduleLocalNotification({
    //alertBody:'is detecting the tollplaza in the background every '+newdistanceFilter+'m starting ,'+new Date()+'.',
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

if (mindebug == "1") {
	writeFile((new Date())+": MIN DEBUG start", debugfile);
	if (maildebug == "1") {
		writeFile((new Date())+": debugging start", debugfile);
	};
};



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
	var mmsg = (new Date())+" download tollplaza in the BG, function:downloadTollplaza";
	mindebug == 1 && console.log(mmsg);
	maildebug==1 && appendFile(mmsg,debugfile);
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
		maildebug==1 && appendFile(mmsg,debugfile);
		xhr1.open("GET", url1);
		xhr1.send();		
	};
	xhr.open("GET", url);
	xhr.send();
};

downloadTollplaza(loc);

var checkAddr = function(latX,lonX) {
	//note: 5 miles Lat diff = 0.08 & Lon diff = 0.09
	var latX = typeof latX !== typeof undefined?latX:Titanium.App.Properties.getString('lat1');
	var lonX = typeof lonX !== typeof undefined?lonX:Titanium.App.Properties.getString('lon1');
	var latY = typeof latX !== typeof undefined?latX:43.009724;
	var lonY = typeof lonX !== typeof undefined?lonX:-88.238146;
	var mmsg = (new Date())+" latY:lonY: latX:lonX "+latY+" : "+lonY+" : "+latX+" : "+lonX;
	mindebug == 1 && console.log(mmsg);
	maildebug==1 && appendFile(mmsg,debugfile);
	Titanium.Geolocation.reverseGeocoder(latY,lonY,function(evt)
	{
		if (evt.success) {
			console.log("checking current address");
			var places = evt.places;
			if (places && places.length) {
				currentaddr = places[0].address;
				var arr = currentaddr.split(',');
				var state = arr[arr.length - 3];
			} else {
				currentaddr = "No address found";
			}
			Titanium.App.Properties.setString('currentaddr', currentaddr);
			Titanium.App.Properties.setString('state',state);
			var mmsg = (new Date())+" currentaddr :" +currentaddr;
			mmsg += " state :" +state;			
			mmsg += " reverse geolocation result = "+JSON.stringify(evt);
			mindebug == 1 && console.log(mmsg);
			maildebug==1 && appendFile(mmsg,debugfile);
			console.log(":ADDR@:"+latY+"/"+lonY+": currentaddr :" +currentaddr+ " state :" +state);
		}
		else {
			var mmsg = (new Date())+" Code translation: "+JSON.stringify(evt.code);
			mindebug == 1 && console.log(mmsg);
			maildebug==1 && appendFile(mmsg,debugfile);
		}
		var thestate = 	Titanium.App.Properties.getString('state');
		return thestate;
	});	
	var thestate = 	Titanium.App.Properties.getString('state');
	return thestate;
};

var checknextLoc = function() {
	var locarray = [];
	// checking next state for Loc
	var latX = typeof latX !== typeof undefined?latX:Titanium.App.Properties.getString('lat1');
	var lonX = typeof lonX !== typeof undefined?lonX:Titanium.App.Properties.getString('lon1');
	
	var thisstate = checkAddr(latX,lonX);locarray.push(thisstate);
	console.log("checking next location with : latX . lonX "+latX+" : "+lonX+" : "+thisstate);
	var thisstate = checkAddr(latX-0.08,lonX);locarray.push(thisstate);
	console.log("checking next location with : latX-0.08 . lonX "+(latX-0.08) +" : "+lonX+" : "+thisstate);
	var thisstate = checkAddr(latX+0.08,lonX); locarray.push(thisstate);
	console.log("checking next location with : latX+0.08 . lonX "+(latX+0.08) +" : "+lonX+" : "+thisstate);
	var thisstate = checkAddr(latX,lonX-0.09); locarray.push(thisstate);
	console.log("checking next location with : latX-0.08 . lonX "+latX+" : "+(lonX-.09)+" : "+thisstate);
	var thisstate = checkAddr(latX,lonX+0.09); locarray.push(thisstate);
	console.log("checking next location with : latX-0.08 . lonX "+latX+" : "+(lonX+.09)+" : "+thisstate);
	console.log("locarray content is : "+JSON.stringify(locarray));
	var locarraysort = locarray.sort();
	var locarraysortuniq = [locarraysort[0].trim()];
	for (var i = 1; i < locarraysort.length; i++) {
		if ( locarraysort[i].trim() !== locarraysort[i-1].trim()) {
			locarraysortuniq.push(locarraysort[i].trim());
		}
	}
	if (locarraysortuniq.length > 1){
		console.log("NEED TO DOWNLOAD TOLLPLAZA FROM: "+JSON.stringify(locarraysortuniq));
	}
	var locarray = [];
};

var checkAlive = setInterval(function () {
	checkAddr();
	checknextLoc();
	var mmsg = (new Date())+" keep Alive check & CheckAddr";
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

var bgLocFound = function(loc){

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
			var lon1 = +e.coords.longitude;Titanium.App.Properties.setString('lon1',lon1);
			var lat1 = +e.coords.latitude;Titanium.App.Properties.setString('lat1',lat1);
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
			 				var locarraysort = hastollentryexit.sort();
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
								console.log("UPDATE DB: check tollentrytime " +JSON.stringify(tollentrytime));
								var tollentrytimesortbytime=tollentrytime.sort(function(a, b)
									{
										return  b.timestamp - a.timestamp;
									});
								console.log("tollentrytimesortbytime length: "+tollentrytimesortbytime.length+" array: "+JSON.stringify(tollentrytimesortbytime));	
								if (tollentrytimesortbytime.length > 1) {
									var newtollentrytimesortbytime = [];
									for (var t=0;t<tollentrytimesortbytime.length;t++){
										var y = t + 1; console.log("y on array :" +y);
										if (y<tollentrytimesortbytime.length){
											var nexttollentrytimesortbytime = tollentrytimesortbytime[y]; 
											console.log ("tollentrytimesortbytime[t+1].tollplaza : "+nexttollentrytimesortbytime.tollplaza);
											console.log("is nexttollentrytimesortbytime.tollplaza == tollentrytimesortbytime[t].tollplaza? "+nexttollentrytimesortbytime.tollplaza+" =OR= "+tollentrytimesortbytime[t].tollplaza);
											if(nexttollentrytimesortbytime.tollplaza == tollentrytimesortbytime[t].tollplaza){
												if(nexttollentrytimesortbytime.timestamp > tollentrytimesortbytime[t].timestamp){
													newtollentrytimesortbytime.push(tollentrytimesortbytime[y]);
												} else {newtollentrytimesortbytime.push(tollentrytimesortbytime[t]);}										
											} else {
												newtollentrytimesortbytime.push(tollentrytimesortbytime[y]);
											}
											///console.log("newtollentrytimesortbytime array NOW : " +JSON.stringify(newtollentrytimesortbytime));
										}
									}
									///console.log("newtollentrytimesortbytime : " +JSON.stringify(newtollentrytimesortbytime));								
								} else { var newtollentrytimesortbytime = tollentrytimesortbytime; };
								var newtollentrytimesortbytimeuniq = [newtollentrytimesortbytime[0]];
								for (var z=1;z<newtollentrytimesortbytime.length;z++){
									if(newtollentrytimesortbytime[z].tollplaza !== newtollentrytimesortbytime[z-1].tollplaza) {
										newtollentrytimesortbytimeuniq.push(newtollentrytimesortbytime[z]);
									}
								}
								console.log("newtollentrytimesortbytimeuniq : " +JSON.stringify(newtollentrytimesortbytimeuniq));
								for (var j=0;j<newtollentrytimesortbytimeuniq.length;j++) {
									if (tolltoupdatedb[i].trim() == newtollentrytimesortbytimeuniq[j].tollplaza){
										var mmsg = "UPDATE DB: updateFound("+newtollentrytimesortbytimeuniq[j].tollplaza+","+newtollentrytimesortbytimeuniq[j].longitude+","+newtollentrytimesortbytimeuniq[j].latitude+","+newtollentrytimesortbytimeuniq[j].timestamp+","+newtollentrytimesortbytimeuniq[j].cost+","+newtollentrytimesortbytimeuniq[j].type+","+newtollentrytimesortbytimeuniq[j].hwy+")";
										maildebug==1 || mindebug ==1 && appendFile(mmsg,debugfile);
					 					maildebug==1 || mindebug ==1 && console.log(mmsg);
										updateFound(newtollentrytimesortbytimeuniq[j].tollplaza,newtollentrytimesortbytimeuniq[j].longitude,newtollentrytimesortbytimeuniq[j].latitude,newtollentrytimesortbytimeuniq[j].timestamp,newtollentrytimesortbytimeuniq[j].cost,newtollentrytimesortbytimeuniq[j].type,newtollentrytimesortbytimeuniq[j].hwy);
									}
								}
												
							}
								///reset array											 			
					 			tollentrytime = [];
					 			tollexittime = [];
					 			tollcanceltime = [];
					 			tolltoupdatedb = [];
					 			newtollentrytimesortbytime = [];
					 			newtollentrytimesortbytimeuniq = [];
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
	    var locationNotif = Ti.App.iOS.scheduleLocalNotification({
		    alertBody:'Please enable location services :'+new Date()+'.',
		    date:new Date(new Date().getTime() + 3000) // 1 second after pause
		 }); 
	}
};

//MAIN


bgLocFound(loc);
checkAlive=1;
checkAddr();
checknextLoc();
