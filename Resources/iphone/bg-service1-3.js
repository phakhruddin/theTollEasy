maildebug = Titanium.App.Properties.getInt("maildebug") ? Titanium.App.Properties.getInt("maildebug") : 0;

var mindebug = Titanium.App.Properties.getInt("mindebug", 1);

loc = Titanium.App.Properties.getString("loc") ? Titanium.App.Properties.getString("loc") : "newberlin";

Titanium.App.Properties.setInt("closercount", 500);

radius = Titanium.App.Properties.getInt("radius") ? Titanium.App.Properties.getInt("radius") : 3e3;

Ti.App.Properties.removeProperty("distmatchobj");

Ti.App.Properties.removeProperty("thedistanceNearbyFilter");

var newdistanceFilter = Titanium.App.Properties.getInt("distanceFilter", 75);

var detectionRange = Titanium.App.Properties.getInt("detectionRange", 200);

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

var approachtoll = 1;

var lastapproachtoll = "none";

var initialNotif = Ti.App.iOS.scheduleLocalNotification({
    alertBody: "is detecting the tollplaza in the background starting ," + new Date() + ".",
    date: new Date(new Date().getTime() + 1e3)
});

var writeFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    file.write(content + "\n");
};

var appendFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    file.append(content + "\n");
};

var debugfile = "maildebug.txt";

var locfile = "location.txt";

if ("1" == mindebug) {
    writeFile(new Date() + ": MIN DEBUG start", debugfile);
    "1" == maildebug && writeFile(new Date() + ": debugging start", debugfile);
}

var thefile = loc + ".txt";

var file4 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile);

var thefile5 = loc + "1.txt";

var file5 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile5);

var downloadTollplaza = function(loc) {
    var url = "http://23.21.53.150:10000/" + loc + ".json";
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                json = JSON.parse(this.responseText);
                file4.write(this.responseText);
            } catch (e) {
                Ti.API.info("cathing e: " + e);
            }
        }
    });
    xhr.onerror = function(e) {
        Ti.App.iOS.scheduleLocalNotification({
            alertBody: "error downloading data from primary site, " + url + " , downloading data using a backup site instead",
            date: new Date(new Date().getTime() + 1e4)
        });
        var url1 = "https://spreadsheets.google.com/feeds/list/1Omzwq1RKWeptvtV4H0ryLi3IP2fFdPFNqBPq2_nuuCc/od6/public/basic?hl=en_US&alt=json";
        var xhr1 = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    json = JSON.parse(this.responseText);
                    var out = '{ "poi" : [\n';
                    for (var i = 0; i < json.feed.entry.length; i++) {
                        var tollplaza = json.feed.entry[i].title.$t.trim();
                        var latitude = json.feed.entry[i].content.$t.split(",")[0].split(":")[1].trim();
                        var longitude = json.feed.entry[i].content.$t.split(",")[1].split(":")[1].trim();
                        var altitude = json.feed.entry[i].content.$t.split(",")[2].split(":")[1].trim() || "none";
                        var heading = json.feed.entry[i].content.$t.split(",")[3].split(":")[1].trim() || "none";
                        var speed = json.feed.entry[i].content.$t.split(",")[4].split(":")[1].trim() || "none";
                        var hwy = json.feed.entry[i].content.$t.split(",")[5].split(":")[1].trim() || "interstate";
                        var cost = json.feed.entry[i].content.$t.split(",")[6].split(":")[1].trim() || "0";
                        var type = json.feed.entry[i].content.$t.split(",")[7].split(":")[1].trim() || "none";
                        {
                            json.feed.entry[i].content.$t.split(",")[8].split(":")[1].trim() || "unknown";
                        }
                        {
                            json.feed.entry[i].content.$t.split(",")[9].split(":")[1].trim() || "unknown";
                        }
                        out += i == json.feed.entry.length - 1 ? '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" , "type" : "' + type + '" }]}\n' : '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" , "type" : "' + type + '" },\n';
                    }
                    file5.write(out);
                    file4.write(out);
                    var json = out;
                } catch (e) {
                    Ti.API.info("cathing e: " + e);
                }
            }
        });
        var mmsg = new Date() + ": load file error cathing e: " + JSON.stringify(e);
        1 == maildebug && appendFile(mmsg, debugfile);
        xhr1.open("GET", url1);
        xhr1.send();
    };
    xhr.open("GET", url);
    xhr.send();
};

downloadTollplaza(loc);

var checkAlive = setInterval(function() {
    var mmsg = new Date() + " keep Alive check";
    1 == mindebug && console.log(mmsg);
    1 == maildebug && appendFile(mmsg, debugfile);
}, 3e5);

var calcDistance = function(tollplaza, lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = 180 * dist / Math.PI;
    dist = 60 * dist * 1.1515;
    "K" == unit && (dist = 1.609344 * dist);
    "N" == unit && (dist = .8684 * dist);
    "F" == unit && (dist = 5280 * dist);
    var calcresult = tollplaza + ":" + new Date() + ": dist:" + dist + "lat1:" + lat1 + ",lat2:" + lat2 + ",radlat1:" + radlat1 + ",radlat2:" + radlat2 + ",lon1:" + lon1 + ",lon2:" + lon2 + ",radlon1:" + radlon1 + ",radlon2:" + radlon2 + ",radtheta:" + radtheta + "\n";
    2 == maildebug && console.log(calcresult);
    return Math.round(dist);
};

var updateFound = function(tollplaza, longitude, latitude, timestamp, cost, type, hwy) {
    var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
    var cost = cost || "0.00";
    var mmsg = "updateFound: " + new Date() + ": About to update found DB: tp : " + tollplaza + ", lon:" + longitude + ", lat : " + latitude + ", cost : " + cost + ", type : " + type + ", timestamp : " + timestamp + "\n";
    1 == maildebug && appendFile(mmsg, debugfile);
    1 == mindebug && console.log(mmsg);
    var db = Ti.Database.open("_alloy_");
    db.execute("BEGIN");
    db.execute("INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", tollplaza, longitude, latitude, altitude, heading, accuracy, speed, timestamp, altitudeAccuracy, cost, type, hwy, data1, data2);
    db.execute("COMMIT");
    db.close();
};

var pushTollExit = function(tollplaza, altitude, heading, type, longitude, latitude, cost, timestamp) {
    if (tollentry.length > "0") {
        for (var i = 0; i < tollentry.length; i++) if (tollplaza == tollentry[i].tollplaza.trim()) {
            var mmsg = new Date() + ": add exit with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
            tollexit.push({
                tollplaza: tollplaza,
                cancel: altitude,
                other: heading,
                type: type,
                longitude: longitude,
                latitude: latitude,
                cost: cost,
                timestamp: timestamp
            });
        }
    } else var mmsg = new Date() + ": NOT add exit with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
    1 == maildebug || 1 == mindebug && console.log(mmsg);
};

var bgLocFound = function() {
    var contents = "";
    var contents = file4.read() || file5.read();
    if (contents && contents.text) {
        var preParseData = contents.text;
        var json = json || JSON.parse(preParseData);
    }
    var mmsg = "json data : " + JSON.stringify(json.poi[0]);
    1 == maildebug && appendFile(mmsg, debugfile);
    var locationCallback = function(e) {
        if (e.error) Ti.API.info("Error is: " + e.error); else {
            var distmatch = [];
            var count = Titanium.App.Properties.getInt("count");
            count++;
            1 == maildebug && console.log("count:" + count);
            var lon1 = +e.coords.longitude;
            var lat1 = +e.coords.latitude;
            var time1 = +e.coords.timestamp;
            var speed1 = +e.coords.speed;
            mmsg = new Date(e.coords.timestamp) + "," + e.coords.timestamp + "," + e.coords.latitude + "," + e.coords.longitude + "," + speed1;
            if (1 == Titanium.App.Properties.getInt("mindebug") && count >= 30) {
                1 == mindebug && console.log(mmsg + " should be appended to location.txt");
                appendFile(mmsg, locfile);
                var count = 0;
            }
            var thedistanceNearbyFilter = Titanium.App.Properties.getInt("thedistanceNearbyFilter", 1e4);
            var closestdistobj = Ti.App.Properties.getString("distmatchobj", "NO");
            if ("NO" != closestdistobj) {
                var closestdistarray = JSON.parse(Ti.App.Properties.getString("distmatchobj"));
                1 == maildebug && console.log("checking : " + closestdistarray);
            }
            var thearray = 5280 > thedistanceNearbyFilter ? closestdistarray : json.poi;
            1 == maildebug && console.log("The First Toll distance is at  " + thedistanceNearbyFilter);
            Titanium.App.Properties.setInt("count", count);
            for (i = 0; i < thearray.length; i++) {
                var tolltollplaza = thearray[i].plaza || thearray[i].tolltollplaza;
                var lat2 = thearray[i].latitude;
                var lon2 = thearray[i].longitude;
                var alt2 = thearray[i].altitude;
                var head2 = thearray[i].heading;
                var hwy = thearray[i].hwy;
                var cost = thearray[i].cost;
                var type = thearray[i].type;
                var note = thearray[i].note;
                var dist = calcDistance(tolltollplaza, lat1, lon1, lat2, lon2, "F");
                distmatch.push({
                    tolltollplaza: tolltollplaza,
                    dist: dist,
                    latitude: lat2,
                    longitude: lon2,
                    altitude: alt2,
                    heading: head2,
                    hwy: hwy,
                    cost: cost,
                    type: type,
                    note: note
                });
            }
            1 == maildebug && console.log("JSON distance unsort :" + JSON.stringify(distmatch));
            var closestdist = distmatch.sort(function(a, b) {
                return a.dist - b.dist;
            });
            1 == maildebug && console.log("JSON closestdist : " + JSON.stringify(closestdist));
            Ti.App.Properties.setString("distmatchobj", JSON.stringify(distmatch));
            1 == maildebug && console.log("set distmatchobj");
            var closesttollbydist0 = closestdist[0].tolltollplaza;
            var closestdist0 = closestdist[0].dist;
            var outputclosesttollbydist0 = closestdist[0].tolltollplaza + " distance : " + closestdist[0].dist;
            Titanium.App.Properties.setInt("thedistanceNearbyFilter", closestdist0);
            Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
            var range = detectionRange;
            var calcrange = 5e3;
            var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
            var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
            var distlastupd = Titanium.App.Properties.getString("distlastupd", 1e12);
            var timelastupd = parseFloat(timelastupd);
            var timediff = time1 - timelastupd;
            var timerange = 100;
            approachtoll = closestdist0 > distlastupd ? 0 : 1;
            var lastapproachtoll = Titanium.App.Properties.getString("lastapproachtoll");
            console.log(closesttollbydist0 + " || " + tolllastupd + " || last: " + lastapproachtoll + "/" + approachtoll);
            if (closesttollbydist0 == tolllastupd && 0 == lastapproachtoll && 1 == approachtoll) {
                var tolllastupd = Titanium.App.Properties.getString("tolllastupd");
                Titanium.App.Properties.setString("tolllastupd", tolllastupd + "(U-TURN)");
            }
            Titanium.App.Properties.setString("distlastupd", closestdist0);
            Titanium.App.Properties.setString("lastapproachtoll", approachtoll);
            if (closestdist[0].dist < range && timediff > timerange && 1 == approachtoll) {
                var tollplaza = closestdist[0].tolltollplaza;
                var longitude = closestdist[0].longitude;
                var latitude = closestdist[0].latitude;
                var altitude = closestdist[0].altitude;
                var heading = closestdist[0].heading;
                var timestamp = time1;
                var cost = closestdist[0].cost;
                var type = closestdist[0].type;
                var hwy = closestdist[0].hwy;
                foundentry = "start" == type ? 1 : 0;
                foundexit = "end" == type ? 1 : 0;
                var sametoll = "NO";
                if (closesttollbydist0 == tolllastupd && 3e4 > timediff) var sametoll = "YES";
                var mmsg = new Date() + ": F:" + foundentry + "/" + foundexit + " DF:" + Titanium.Geolocation.getDistanceFilter() + " sametoll:" + sametoll + ": " + closesttollbydist0 + "(t:" + type + ") / " + tolllastupd;
                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                console.log(mmsg);
                if ("1" != foundentry && "1" != foundexit || "NO" != sametoll) {
                    var mmsg = new Date() + ": NO entry and exit detected for: " + tollplaza + ", sametoll: " + sametoll + ", set distanceFilter to 75";
                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                    Titanium.Geolocation.distanceFilter = 75;
                    if (tollentry.length > "0" && tollexit.length > "0") for (var i = 0; i < tollentry.length; i++) for (var j = 0; j < tollexit.length; j++) {
                        var mmsg = " tollentry[" + i + "].tollplaza vs. tollexit[" + j + "].tollplaza " + tollentry[i].tollplaza + " vs. " + tollexit[j].tollplaza;
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if (tollentry[i].tollplaza.trim() == tollexit[j].tollplaza.trim()) {
                            hastollentryexit.push(tollentry[i].tollplaza.trim());
                            var mmsg = "hastollentryexit : " + JSON.stringify(hastollentryexit);
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                        }
                    }
                } else {
                    Titanium.Geolocation.distanceFilter = 5;
                    var mmsg = new Date() + ": entry or exit IS DETECTED for " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
                    mmsg += "executing a function, updateFound(" + tollplaza + "," + longitude + "," + latitude + "," + timestamp + "," + cost + "," + type + "," + hwy + ")";
                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                    1 == maildebug && console.log(mmsg);
                    1 == mindebug && console.log(mmsg);
                    if ("1" == foundentry) {
                        var mmsg = new Date() + ": add ENTRY with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
                        tollentry.push({
                            tollplaza: tollplaza,
                            cancel: altitude,
                            other: heading,
                            type: type,
                            longitude: longitude,
                            latitude: latitude,
                            cost: cost,
                            timestamp: timestamp
                        });
                        var multipleToll = heading.split("|");
                        mmsg += "ENTRY multipleToll.length : " + multipleToll.length + " multipleToll : " + multipleToll + "\n";
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if ("0" != heading) {
                            var mmsg = "adding more line in ENTRY/EXIT(not ignored) with: " + heading;
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                            for (var i = 0; i < multipleToll.length; i++) {
                                var othertoll = multipleToll[i].split("@")[0].trim();
                                var othertolltype = multipleToll[i].split("@")[1].trim();
                                var mmsg = "othertoll : " + othertoll + " othertolltype: " + othertolltype;
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                if ("end" == othertolltype) {
                                    var hasstartentry = "0";
                                    if (tollentry.length > 0) for (var k = 0; k < tollentry.length; k++) if (othertoll == tollentry[k].tollplaza) var hasstartentry = 1;
                                    if ("1" == hasstartentry) {
                                        tollexit.push({
                                            tollplaza: othertoll,
                                            cancel: "0",
                                            other: "0",
                                            checkpoint: "0",
                                            type: "end",
                                            longitude: longitude,
                                            latitude: latitude,
                                            cost: cost,
                                            timestamp: timestamp
                                        });
                                        var mmsg = "tollplaza: " + othertoll + " has start entry: " + JSON.stringify(tollexit);
                                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                                    } else {
                                        tollcancel.push(othertoll.trim());
                                        var mmsg = "tollplaza: " + othertoll + " has NO start entry, need a cancellation: " + JSON.stringify(tollcancel);
                                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                                    }
                                } else tollentry.push({
                                    tollplaza: multipleToll[i].split("@")[0].trim(),
                                    cancel: "0",
                                    other: "0",
                                    checkpoint: "0",
                                    type: "start",
                                    longitude: longitude,
                                    latitude: latitude,
                                    cost: cost,
                                    timestamp: timestamp
                                });
                            }
                        }
                        var multipleToll = " ";
                        var mmsg = "@FoundEntry tollentry : length " + tollentry.length + " : " + JSON.stringify(tollentry);
                        var mmsg = "@FoundEntry tollexit : length " + tollexit.length + " : " + JSON.stringify(tollexit);
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if ("0" != altitude) {
                            var cancancel = 0;
                            for (var j = 0; j < tollexit.length; j++) if (tollplaza == tollexit[j].tollplaza) var cancancel = 1;
                            if (1 == cancancel) {
                                var mmsg = "cancancel: " + cancancel + " adding CANCELLed toll entry: " + altitude;
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                var multipleCancel = altitude.split("|");
                                for (var i = 0; i < multipleCancel.length; i++) tollcancel.push(multipleCancel[i].trim());
                            } else var mmsg = "cancancel: " + cancancel + " cancelled entry: " + altitude + " not added";
                        }
                        var mmsg = "@FoundEntry tollcancel : length " + tollcancel.length + " : " + JSON.stringify(tollcancel);
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        var multipleCancel = " ";
                    }
                    if ("1" == foundexit) {
                        if (tollentry.length > "0") for (var z = 0; z < tollentry.length; z++) {
                            console.log("@FoundExit check exit with entry:" + tollplaza + "|vs.|" + tollentry[z].tollplaza.trim());
                            if (tollplaza == tollentry[z].tollplaza.trim()) {
                                var mmsg = new Date() + "@FoundExit: match with entry! add exit with " + tollplaza + "\n";
                                tollexit.push({
                                    tollplaza: tollplaza,
                                    cancel: altitude,
                                    other: heading,
                                    type: type,
                                    longitude: longitude,
                                    latitude: latitude,
                                    cost: cost,
                                    timestamp: timestamp
                                });
                            }
                        } else var mmsg = new Date() + "@FoundExit: NOT add exit with " + tollplaza + ": tollentry.length=" + tollentry.length + "\n";
                        var multipleToll = heading.split("|");
                        mmsg += "\n";
                        mmsg += "EXIT multipleToll.length : " + multipleToll.length + " multipleToll : " + multipleToll + "\n";
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if ("0" != heading) {
                            var mmsg = "adding more line in EXIT with: " + heading;
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                            for (var i = 0; i < multipleToll.length; i++) if ("end" == multipleToll[i].split("@")[1].trim()) {
                                console.log("running pushTollExit at MULTIPLEENTRY with tollentry.length: " + tollentry.length);
                                var tollplaza = multipleToll[i].split("@")[0];
                                if (tollentry.length > "0") {
                                    for (var z = 0; z < tollentry.length; z++) if (tollplaza == tollentry[z].tollplaza.trim()) {
                                        var mmsg = new Date() + ": add exit with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
                                        tollexit.push({
                                            tollplaza: tollplaza,
                                            cancel: altitude,
                                            other: heading,
                                            type: type,
                                            longitude: longitude,
                                            latitude: latitude,
                                            cost: cost,
                                            timestamp: timestamp
                                        });
                                    }
                                } else var mmsg = new Date() + ": NOT add exit with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit;
                                mmsg += "@FoundExit Other entry: tollplaza: " + multipleToll[i].split("@")[0].trim() + " has end entry: " + JSON.stringify(tollexit) + "\n";
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                            } else {
                                tollentry.push({
                                    tollplaza: multipleToll[i].split("@")[0].trim(),
                                    cancel: "0",
                                    other: "0",
                                    checkpoint: "0",
                                    type: "start",
                                    longitude: longitude,
                                    latitude: latitude,
                                    cost: cost,
                                    timestamp: timestamp
                                });
                                var mmsg = "Other entry: tollplaza: " + multipleToll[i].split("@")[0].trim() + " has start entry from foundexit=1: " + JSON.stringify(tollentry);
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                            }
                        }
                        var multipleToll = " ";
                        var mmsg = "@FoundExit tollexit : length " + tollexit.length + " : " + JSON.stringify(tollexit) + "\n";
                        mmsg += "@FoundExit tollentry : length " + tollentry.length + " : " + JSON.stringify(tollentry) + "\n";
                        mmsg += "@FoundExit tollcancel : length " + tollcancel.length + " : " + JSON.stringify(tollcancel) + "\n";
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if ("0" != altitude) {
                            var cancancel = 0;
                            for (var j = 0; j < tollentry.length; j++) if (tollplaza == tollentry[j].tollplaza) var cancancel = 1;
                            if (1 == cancancel) {
                                var mmsg = "cancancel: " + cancancel + " adding CANCELLed toll entry: " + altitude;
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                var multipleCancel = altitude.split("|");
                                for (var i = 0; i < multipleCancel.length; i++) tollcancel.push(multipleCancel[i].trim());
                            } else var mmsg = "cancancel: " + cancancel + " cancelled entry: " + altitude + " not added";
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                        }
                        var mmsg = "tollcancel : length " + tollcancel.length + " : " + JSON.stringify(tollcancel);
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        var multipleCancel = " ";
                    }
                    Titanium.App.Properties.setString("timelastupd", timestamp);
                    Titanium.App.Properties.setString("tolllastupd", tollplaza);
                    var foundentry = "0";
                    var foundexit = "0";
                    var distmatch = [];
                    {
                        Ti.App.iOS.scheduleLocalNotification({
                            alertBody: new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away",
                            date: new Date(new Date().getTime() + 3e4)
                        });
                    }
                    var mmsg = new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away";
                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                }
            } else {
                var now = new Date();
                var mmsg = now + ":" + closesttollbydist0 + ":x:" + tolllastupd;
                mmsg += "|range<" + range + "?:" + closestdist[0].dist + "/apr:" + approachtoll;
                mmsg += "|timediff>" + timerange + "?:" + timediff;
                1 == maildebug || 1 == mindebug && console.log(mmsg);
                appendFile(mmsg, debugfile);
                if (tollentry.length > "0" && tollexit.length > "0") {
                    Titanium.Geolocation.distanceFilter = closestdist[0].dist > 1e4 ? 600 : 300;
                    var mmsg = new Date() + "DO CALC: entry:" + tollentry.length + ":exit:" + tollexit.length + "/" + tollcancel.length + " : " + closestdist[0].tolltollplaza + " : " + closestdist[0].dist + "/" + calcrange + " , " + Titanium.Geolocation.getDistanceFilter();
                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                    if (tollentry.length > "0" && tollexit.length > "0") for (var i = 0; i < tollentry.length; i++) for (var j = 0; j < tollexit.length; j++) {
                        var mmsg = " tollentry[" + i + "].tollplaza vs. tollexit[" + j + "].tollplaza " + tollentry[i].tollplaza + " vs. " + tollexit[j].tollplaza;
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if (tollentry[i].tollplaza.trim() == tollexit[j].tollplaza.trim()) {
                            hastollentryexit.push(tollentry[i].tollplaza.trim());
                            var mmsg = "hastollentryexit : " + JSON.stringify(hastollentryexit);
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                        }
                    }
                    if (hastollentryexit.length > 0) {
                        tollentrytime = tollentrytime.concat(tollentry);
                        tollexittime = tollexittime.concat(tollexit);
                        tollcanceltime = tollcanceltime.concat(tollcancel);
                        var mmsg = new Date() + ": toll ENTRY being xferred to diff obj: " + JSON.stringify(tollentrytime) + "\n";
                        mmsg += new Date() + ": toll EXIT being xferred to diff obj: " + JSON.stringify(tollexittime) + "\n";
                        mmsg += new Date() + ": toll CANCEL being xferred to diff obj: " + JSON.stringify(tollcanceltime) + "\n";
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        tollentry = [];
                        tollexit = [];
                    }
                    var mmsg = new Date() + ": check again hastollentryexit : " + JSON.stringify(hastollentryexit);
                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                    if (hastollentryexit.length > 0) {
                        var hastollentryexitsort = hastollentryexit.sort();
                        var hastollentryexitsortuniq = [ hastollentryexitsort[0].trim() ];
                        for (var i = 1; i < hastollentryexitsort.length; i++) hastollentryexitsort[i].trim() !== hastollentryexitsort[i - 1].trim() && hastollentryexitsortuniq.push(hastollentryexitsort[i].trim());
                        hastollentryexit = [];
                        var mmsg = "hastollentryexitsortuniq.length: " + hastollentryexitsortuniq.length + " hastollentryexitsortuniq : " + JSON.stringify(hastollentryexitsortuniq);
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                        if (tollcancel.length > 0) {
                            var tollcancelsort = tollcanceltime.sort();
                            var tollcancelsortuniq = [ tollcancelsort[0].trim() ];
                            for (var i = 1; i < tollcancelsort.length; i++) tollcancelsort[i].trim() !== tollcancelsort[i - 1].trim() && tollcancelsortuniq.push(tollcancelsort[i].trim());
                            tollcancel = [];
                            var mmsg = "tollcancelsortuniq.length: " + tollcancelsortuniq.length + " tollcancelsortuniq : " + JSON.stringify(tollcancelsortuniq);
                            1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                            1 == maildebug || 1 == mindebug && console.log(mmsg);
                        }
                        for (var i = 0; i < hastollentryexitsortuniq.length; i++) {
                            var needtocancel = "0";
                            if (tollcancelsortuniq && tollcancelsortuniq.length > 0) for (var j = 0; j < tollcancelsortuniq.length; j++) {
                                var mmsg = "hastollentryexitsortuniq[i] !=  tollcancelsortuniq[j] :" + hastollentryexitsortuniq[i] + " vs ." + tollcancelsortuniq[j];
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                if (hastollentryexitsortuniq[i] == tollcancelsortuniq[j]) var needtocancel = 1;
                            }
                            if ("0" == needtocancel) {
                                tolltoupdate.push(hastollentryexitsortuniq[i]);
                                var mmsg = "1st tolltoupdate.push: " + JSON.stringify(tolltoupdate);
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                if (tolltoupdate.length > 1) {
                                    var tolltoupdatesort = tolltoupdate.sort();
                                    var tolltoupdatesortuniq = [ tolltoupdatesort[0] ];
                                    for (var i = 1; i < tolltoupdate.length; i++) tolltoupdatesort[i] !== tolltoupdatesort[i - 1] && tolltoupdatesortuniq.push(tolltoupdatesort[i]);
                                }
                                if (tolltoupdatesort) {
                                    var mmsg = "tolltoupdatesort.length :" + tolltoupdatesort.length + " tolltoupdatesort : " + JSON.stringify(tolltoupdatesort);
                                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                                }
                                var mmsg = "tolltoupdate.length: " + tolltoupdate.length + " tolltoupdate : " + JSON.stringify(tolltoupdate);
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                if (tolltoupdate.length > 1) {
                                    var mmsg = "tolltoupdatesortuniq.length :" + tolltoupdatesortuniq.length + " tolltoupdatesortuniq : " + JSON.stringify(tolltoupdatesortuniq);
                                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                                }
                            }
                        }
                        var tollcancelsortuniq = [];
                        var tollcancelsort = [];
                    }
                    tolltoupdatedb = tolltoupdate.length > 1 ? tolltoupdatesortuniq : tolltoupdate;
                    var mmsg = "RIGH b4 tolltoupdateDB: tolltoupdatedb.length: " + tolltoupdatedb.length + " tolltoupdatedb : " + JSON.stringify(tolltoupdatedb);
                    1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                    1 == maildebug || 1 == mindebug && console.log(mmsg);
                    if (tolltoupdatedb.length > 0) {
                        for (var i = 0; i < tolltoupdatedb.length; i++) {
                            for (var j = 0; j < tollentrytime.length; j++) if (tolltoupdatedb[i].trim() == tollentrytime[j].tollplaza) {
                                var mmsg = "UPDATE DB: updateFound(" + tollentrytime[j].tollplaza + "," + tollentrytime[j].longitude + "," + tollentrytime[j].latitude + "," + tollentrytime[j].timestamp + "," + tollentrytime[j].cost + "," + tollentrytime[j].type + "," + tollentrytime[j].hwy + ")";
                                1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                                1 == maildebug || 1 == mindebug && console.log(mmsg);
                                updateFound(tollentrytime[j].tollplaza, tollentrytime[j].longitude, tollentrytime[j].latitude, tollentrytime[j].timestamp, tollentrytime[j].cost, tollentrytime[j].type, tollentrytime[j].hwy);
                            }
                            tollentrytime = [];
                            tollexittime = [];
                            tollcanceltime = [];
                        }
                        tolltoupdate = [];
                    }
                } else {
                    if (timediff > 6e4) {
                        var mmsg = new Date() + ": entry:" + tollentry.length + ":exit:" + tollexit.length + "/" + tollcancel.length + " :" + closestdist[0].tolltollplaza + " : " + closestdist[0].dist + " / " + calcrange + " skip calculation, " + Titanium.Geolocation.getDistanceFilter() + "ft";
                        1 == maildebug || 1 == mindebug && appendFile(mmsg, debugfile);
                        1 == maildebug || 1 == mindebug && console.log(mmsg);
                    }
                    Titanium.Geolocation.distanceFilter = closestdist[0].dist > calcrange ? 300 : 75;
                }
            }
        }
    };
    var headingCallback = function(e) {
        if (e.error) {
            updatedHeading = "error: " + e.error;
            return;
        }
        var magneticHeading = e.heading.magneticHeading;
        var trueHeading = e.heading.trueHeading;
        var timestamp = e.heading.timestamp;
        1 == maildebug && Titanium.API.info(new Date(timestamp) + "," + timestamp + "," + trueHeading + "," + magneticHeading);
        Titanium.App.Properties.setString("currentHeading", trueHeading);
    };
    if (Ti.Geolocation.locationServicesEnabled) {
        {
            closestdist = [];
        }
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.purpose = "Get Current Location";
        var thedistanceNearbyFilter = Titanium.App.Properties.getInt("thedistanceNearbyFilter", 1e4);
        if (5280 > thedistanceNearbyFilter) {
            Titanium.Geolocation.distanceFilter = 26;
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        } else {
            Titanium.Geolocation.distanceFilter = Titanium.App.Properties.getInt("distanceFilter");
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        }
        var mmsg = new Date() + ": Titanium.Geolocation.distanceFilter to was set to  :" + Titanium.App.Properties.getInt("distanceFilter") + ".";
        mmsg += "Titanium.Geolocation.distanceFilter :" + Titanium.Geolocation.distanceFilter;
        console.log(mmsg);
        appendFile(mmsg, debugfile);
        if (Titanium.Geolocation.hasCompass) {
            Titanium.Geolocation.showCalibration = false;
            Titanium.Geolocation.headingFilter = 45;
            Titanium.Geolocation.addEventListener("heading", headingCallback);
            headingAdded = true;
        } else {
            Titanium.API.info("No Compass on device");
            currentHeading = "No compass available";
            var trueHeading = "No compass available";
            Titanium.App.Properties.setString("currentHeading", trueHeading);
        }
    } else {
        Ti.App.iOS.scheduleLocalNotification({
            alertBody: "Please enable location services :" + new Date() + ".",
            date: new Date(new Date().getTime() + 3e3)
        });
    }
};

bgLocFound(loc);

checkAlive = 1;