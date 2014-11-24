maildebug = Titanium.App.Properties.getInt("maildebug") ? Titanium.App.Properties.getInt("maildebug") : 0;

loc = Titanium.App.Properties.getString("loc") ? Titanium.App.Properties.getString("loc") : "newberlin";

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

"1" == maildebug && writeFile(new Date() + ": debugging start", debugfile);

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
                        {
                            json.feed.entry[i].content.$t.split(",")[7].split(":")[1].trim() || "none";
                        }
                        {
                            json.feed.entry[i].content.$t.split(",")[8].split(":")[1].trim() || "unknown";
                        }
                        {
                            json.feed.entry[i].content.$t.split(",")[9].split(":")[1].trim() || "unknown";
                        }
                        out += i == json.feed.entry.length - 1 ? '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" }]}\n' : '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" },\n';
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
    console.log(mmsg);
    1 == maildebug && appendFile(mmsg, debugfile);
    Ti.App.iOS.scheduleLocalNotification({
        alertBody: new Date() + " checkAlive.",
        date: new Date(new Date().getTime() + 3e3)
    });
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
    1 == maildebug && console.log(calcresult);
    return Math.round(dist);
};

var updateFound = function(tollplaza, longitude, latitude, timestamp, cost, type, hwy) {
    var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
    var cost = cost || "0.00";
    var mmsg = "updateFound: " + new Date() + ": About to update found DB: tp : " + tollplaza + ", lon:" + longitude + ", lat : " + latitude + ", cost : " + cost + ", type : " + type + ", timestamp : " + timestamp + "\n";
    1 == maildebug && appendFile(mmsg, debugfile);
    1 == maildebug && console.log(mmsg);
    Titanium.Media.vibrate([ 0, 2e3 ]);
    var db = Ti.Database.open("_alloy_");
    db.execute("BEGIN");
    db.execute("INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", tollplaza, longitude, latitude, altitude, heading, accuracy, speed, timestamp, altitudeAccuracy, cost, type, hwy, data1, data2);
    db.execute("COMMIT");
    db.close();
};

var bgLocFound = function() {
    var contents = "";
    var contents = file4.read() || file5.read();
    if (contents.text) {
        var preParseData = contents.text;
        var json = json || JSON.parse(preParseData);
    }
    var mmsg = "json data : " + JSON.stringify(json);
    1 == maildebug && appendFile(mmsg, debugfile);
    var locationCallback = function(e) {
        var count = Titanium.App.Properties.getInt("count");
        count++;
        var lon1 = +e.coords.longitude;
        var lat1 = +e.coords.latitude;
        var time1 = +e.coords.timestamp;
        mmsg = new Date(e.coords.timestamp) + "," + e.coords.timestamp + "," + e.coords.latitude + "," + e.coords.longitude;
        if (1 == Titanium.App.Properties.getInt("maildebug") && count >= 30) {
            console.log(mmsg + " should be appended to location.txt");
            appendFile(mmsg, locfile);
            var count = 0;
        }
        Ti.API.info(mmsg);
        Titanium.App.Properties.setInt("count", count);
        for (i = 0; i < json.poi.length; i++) {
            var tolltollplaza = json.poi[i].plaza;
            var lat2 = json.poi[i].latitude;
            var lon2 = json.poi[i].longitude;
            var dist = calcDistance(tolltollplaza, lat1, lon1, lat2, lon2, "F");
            distmatch.push({
                tolltollplaza: tolltollplaza,
                dist: dist,
                latitude: lat2,
                longitude: lon2,
                hwy: hwy,
                cost: cost,
                type: type,
                note: note
            });
        }
        var closestdist = distmatch.sort(function(a, b) {
            return a.dist - b.dist;
        });
        closestdist[0].tolltollplaza;
        var closesttollbydist0 = closestdist[0].tolltollplaza;
        closestdist[0].dist;
        var outputclosesttollbydist0 = closestdist[0].tolltollplaza + "(BG) distance : " + closestdist[0].dist;
        Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
        var range = 100;
        var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
        var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
        var timelastupd = parseFloat(timelastupd);
        var timediff = time1 - timelastupd;
        var timerange = 1e4;
        if (closestdist[0].dist < range && timediff > timerange && closesttollbydist0 != tolllastupd) {
            var tollplaza = closestdist[0].tolltollplaza;
            var longitude = closestdist[0].longitude;
            var latitude = closestdist[0].latitude;
            var timestamp = time1;
            var cost = closestdist[0].cost;
            var type = closestdist[0].type;
            var hwy = closestdist[0].hwy;
            var note = closestdist[0].note;
            updateFound(tollplaza, longitude, latitude, timestamp, cost, type, hwy);
            Titanium.App.Properties.setString("timelastupd", timestamp);
            Titanium.App.Properties.setString("tolllastupd", tollplaza);
            {
                Ti.App.iOS.scheduleLocalNotification({
                    alertBody: new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away",
                    date: new Date(new Date().getTime() + 1e4)
                });
            }
            var mmsg = new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away";
            1 == maildebug && appendFile(mmsg, debugfile);
        } else if (1 == maildebug) {
            var now = new Date();
            var mmsg = now + ":" + closesttollbydist0 + ":x:" + tolllastupd;
            mmsg += "|range<" + range + "?:" + closestdist[0].dist;
            mmsg += "|timediff>" + timerange + "?:" + timediff;
            console.log(mmsg);
            appendFile(mmsg, debugfile);
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
        var distmatch = closestdist = [];
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.distanceFilter = 5;
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.addEventListener("location", locationCallback);
        locationAdded = true;
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