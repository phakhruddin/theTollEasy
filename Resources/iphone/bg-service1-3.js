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
                    for (var i = 0; json.feed.entry.length > i; i++) {
                        var tollplaza = json.feed.entry[i].title.$t.trim();
                        var latitude = json.feed.entry[i].content.$t.split(",")[0].split(":")[1].trim();
                        var longitude = json.feed.entry[i].content.$t.split(",")[1].split(":")[1].trim();
                        var altitude = json.feed.entry[i].content.$t.split(",")[2].split(":")[1].trim() || "none";
                        var heading = json.feed.entry[i].content.$t.split(",")[3].split(":")[1].trim() || "none";
                        var speed = json.feed.entry[i].content.$t.split(",")[4].split(":")[1].trim() || "none";
                        var hwy = json.feed.entry[i].content.$t.split(",")[5].split(":")[1].trim() || "interstate";
                        var cost = json.feed.entry[i].content.$t.split(",")[6].split(":")[1].trim() || "0";
                        var type = json.feed.entry[i].content.$t.split(",")[7].split(":")[1].trim() || "none";
                        json.feed.entry[i].content.$t.split(",")[8].split(":")[1].trim() || "unknown";
                        json.feed.entry[i].content.$t.split(",")[9].split(":")[1].trim() || "unknown";
                        out += i == json.feed.entry.length - 1 ? '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" , "type" : "' + type + '" }]}' + "\n" : '{ "plaza" : "' + tollplaza + '" , "latitude" : "' + latitude + '" , "longitude" : "' + longitude + '"  , "altitude" : "' + altitude + '" , "heading" : "' + heading + '" , "speed" : "' + speed + '" , "hwy" : "' + hwy + '" , "cost" : "' + cost + '" , "type" : "' + type + '" },' + "\n";
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
    dist = 1.1515 * 60 * dist;
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
    1 == mindebug && console.log(mmsg);
    var db = Ti.Database.open("_alloy_");
    db.execute("BEGIN");
    db.execute("INSERT INTO found (tollplaza,longitude,latitude,altitude,heading,accuracy,speed,timestamp,altitudeAccuracy,cost,type,hwy,data1,data2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", tollplaza, longitude, latitude, altitude, heading, accuracy, speed, timestamp, altitudeAccuracy, cost, type, hwy, data1, data2);
    db.execute("COMMIT");
    db.close();
};

var bgLocFound = function() {
    var contents = "";
    var contents = file4.read() || file5.read();
    if (contents && contents.text) {
        var preParseData = contents.text;
        var json = json || JSON.parse(preParseData);
    }
    var mmsg = "json data : " + JSON.stringify(json);
    1 == maildebug && appendFile(mmsg, debugfile);
    var locationCallback = function(e) {
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
        for (i = 0; thearray.length > i; i++) {
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
            528e3 > dist && distmatch.push({
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
        closestdist[0].tolltollplaza;
        var closesttollbydist0 = closestdist[0].tolltollplaza;
        var closestdist0 = closestdist[0].dist;
        var outputclosesttollbydist0 = closestdist[0].tolltollplaza + " distance : " + closestdist[0].dist;
        Titanium.App.Properties.setInt("thedistanceNearbyFilter", closestdist0);
        1 == maildebug && console.log("Distance Close Filter is set to: " + thedistanceNearbyFilter);
        Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
        var range = detectionRange;
        var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
        var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
        var timelastupd = parseFloat(timelastupd);
        var timediff = time1 - timelastupd;
        var timerange = 1e4;
        if (range > closestdist[0].dist && timediff > timerange && closesttollbydist0 != tolllastupd) {
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
            console.log(new Date() + ": foundentry = " + foundentry + " foundexit = " + foundexit + " DistanceFilter: " + Titanium.Geolocation.getDistanceFilter());
            if ("1" == foundentry || "1" == foundexit) {
                Titanium.Geolocation.distanceFilter = 5;
                console.log(new Date() + ": entry or exit IS DETECTED for " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit);
                1 == mindebug && console.log("executing a function, updateFound(" + tollplaza + "," + longitude + "," + latitude + "," + timestamp + "," + cost + "," + type + "," + hwy + ")");
                if ("1" == foundentry) {
                    console.log(new Date() + ": add ENTRY with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit);
                    tollentry.push({
                        tollplaza: tollplaza,
                        cancel: altitude,
                        other: heading,
                        type: type
                    });
                    var multipleToll = heading.split("|");
                    console.log("ENTRY multipleToll.length : " + multipleToll.length + " multipleToll : " + multipleToll);
                    if ("0" != heading) {
                        console.log("adding more line in EXIT with: " + heading);
                        for (var i = 0; multipleToll.length > i; i++) {
                            var othertoll = multipleToll[i].split("@")[0].trim();
                            var othertolltype = multipleToll[i].split("@")[1].trim();
                            console.log("othertoll : " + othertoll + " othertolltype: " + othertolltype);
                            console.log("multipleToll[i].split('@')[1].trim() multipleToll[i].split('@')[1].trim() " + multipleToll[i].split("@")[0].trim() + " " + multipleToll[i].split("@")[1].trim());
                            if ("end" == othertolltype) {
                                var hasstartentry = "0";
                                if (tollentry.length > 0) for (var k = 0; tollentry.length > k; k++) if (othertoll == tollentry[k].tollplaza) var hasstartentry = 1;
                                if ("1" == hasstartentry) {
                                    console.log("tollplaza: " + othertoll + " has start entry");
                                    tollexit.push({
                                        tollplaza: othertoll,
                                        cancel: "0",
                                        other: "0",
                                        checkpoint: "0",
                                        type: "end"
                                    });
                                } else {
                                    console.log("tollplaza: " + othertoll + " has NO start entry, need a cancellation");
                                    tollcancel.push({
                                        tollplaza: othertoll
                                    });
                                }
                            } else tollentry.push({
                                tollplaza: multipleToll[i].split("@")[0].trim(),
                                cancel: "0",
                                other: "0",
                                checkpoint: "0",
                                type: "start"
                            });
                        }
                    }
                    var multipleToll = " ";
                    console.log("tollentry : length " + tollentry.length + " : " + JSON.stringify(tollentry));
                    if ("0" != altitude) {
                        console.log("adding CANCELled toll entry: " + altitude);
                        var multipleCancel = altitude.split("|");
                        for (var i = 0; multipleCancel.length > i; i++) tollcancel.push({
                            tollplaza: multipleCancel[i]
                        });
                    }
                    console.log("tollcancel : length " + tollcancel.length + " : " + JSON.stringify(tollcancel));
                    var multipleCancel = " ";
                }
                if ("1" == foundexit) {
                    console.log(new Date() + ": add exit with " + tollplaza + ": foundentry=" + foundentry + ":foundexit=" + foundexit);
                    tollexit.push({
                        tollplaza: tollplaza,
                        cancel: altitude,
                        other: heading,
                        type: type
                    });
                    var multipleToll = heading.split("|");
                    console.log("EXIT multipleToll.length : " + multipleToll.length + " multipleToll : " + multipleToll);
                    if ("0" != heading) {
                        console.log("adding more line in EXIT with: " + heading);
                        for (var i = 0; multipleToll.length > i; i++) "end" == multipleToll[i].split("@")[1].trim() ? tollexit.push({
                            tollplaza: multipleToll[i].split("@")[0].trim(),
                            cancel: "0",
                            other: "0",
                            checkpoint: "0",
                            type: "end"
                        }) : tollentry.push({
                            tollplaza: multipleToll[i].split("@")[0].trim(),
                            cancel: "0",
                            other: "0",
                            checkpoint: "0",
                            type: "start"
                        });
                    }
                    var multipleToll = " ";
                    console.log("tollexit : length " + tollexit.length + " : " + JSON.stringify(tollexit));
                    if ("0" != altitude) {
                        console.log("adding CANCELled toll entry: " + altitude);
                        var multipleCancel = altitude.split("|");
                        for (var i = 0; multipleCancel.length > i; i++) tollcancel.push({
                            tollplaza: multipleCancel[i]
                        });
                    }
                    console.log("tollcancel : length " + tollcancel.length + " : " + JSON.stringify(tollcancel));
                    var multipleCancel = " ";
                }
                var foundentry = "0";
                var foundexit = "0";
                Titanium.App.Properties.setString("timelastupd", timestamp);
                Titanium.App.Properties.setString("tolllastupd", tollplaza);
                var distmatch = [];
                Ti.App.iOS.scheduleLocalNotification({
                    alertBody: new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away",
                    date: new Date(new Date().getTime() + 3e4)
                });
                var mmsg = new Date() + " : tollplaza " + tollplaza + " was detected less than " + closestdist[0].dist + " ft away";
                1 == maildebug && appendFile(mmsg, debugfile);
                1 == maildebug && console.log(mmsg);
            } else {
                console.log(new Date() + ": entry and exit not detected for " + tollplaza + " Time to Calculate/UpdateFound & set distanceFilter to 75");
                Titanium.Geolocation.distanceFilter = 75;
                if (tollentry.length > "0" && tollexit.length > "0") for (var i = 0; tollentry.length > i; i++) for (var j = 0; tollexit.length > j; j++) {
                    console.log(" tollentry[i].tollplaza vs. tollexit[j].tollplaza " + tollentry[i].tollplaza + " vs. " + tollexit[j].tollplaza);
                    if (tollentry[i].tollplaza == tollexit[j].tollplaza) {
                        hastollentryexit.push({
                            tollplaza: tollentry[i].tollplaza
                        });
                        console.log("hastollentryexit : " + JSON.stringify(hastollentryexit));
                    }
                }
                console.log("check again hastollentryexit : " + JSON.stringify(hastollentryexit));
                if (hastollentryexit.length > 0 && tollcancel.length > 0) {
                    var hastollentryexitsort = hastollentryexit.sort(function(a, b) {
                        return a.tollplaza - b.tollplaza;
                    });
                    var hastollentryexitsortuniq = [ {
                        tollplaza: hastollentryexitsort[0].tollplaza
                    } ];
                    for (var i = 1; hastollentryexitsort.length > i; i++) hastollentryexitsort[i].tollplaza !== hastollentryexitsort[i - 1].tollplaza && hastollentryexitsortuniq.push({
                        tollplaza: hastollentryexitsort[i].tollplaza
                    });
                    console.log("hastollentryexitsortuniq.length: " + hastollentryexitsortuniq.length + " hastollentryexitsortuniq : " + JSON.stringify(hastollentryexitsortuniq));
                    var tollcancelsort = tollcancel.sort(function(a, b) {
                        return a.tollplaza - b.tollplaza;
                    });
                    var tollcancelsortuniq = [ {
                        tollplaza: tollcancelsort[0].tollplaza
                    } ];
                    for (var i = 1; tollcancelsort.length > i; i++) tollcancelsort[i].tollplaza !== tollcancelsort[i - 1].tollplaza && tollcancelsortuniq.push({
                        tollplaza: tollcancelsort[i].tollplaza
                    });
                    console.log("tollcancelsortuniq.length: " + tollcancelsortuniq.length + " tollcancelsortuniq : " + JSON.stringify(tollcancelsortuniq));
                    for (var i = 0; hastollentryexitsortuniq.length > i; i++) {
                        var needtocancel = "0";
                        for (var j = 0; tollcancelsortuniq.length > j; j++) {
                            console.log("hastollentryexitsortuniq[i].tollplaza !=  tollcancelsortuniq[j].tollplaza :" + hastollentryexitsortuniq[i].tollplaza + " vs ." + tollcancelsortuniq[j].tollplaza);
                            if (hastollentryexitsortuniq[i].tollplaza == tollcancelsortuniq[j].tollplaza) var needtocancel = 1;
                        }
                        if ("0" == needtocancel) {
                            tolltoupdate.push({
                                tollplaza: hastollentryexitsortuniq[i].tollplaza
                            });
                            if (tolltoupdate.length > 2) {
                                var tolltoupdatesort = tolltoupdate.sort(function(a, b) {
                                    return a.tollplaza - b.tollplaza;
                                });
                                var tolltoupdatesortuniq = [ {
                                    tollplaza: tolltoupdatesort[0].tollplaza
                                } ];
                                for (var i = 1; tolltoupdatesort.length > i; i++) tolltoupdatesort[i].tollplaza !== tolltoupdatesort[i - 1].tollplaza && tolltoupdatesortuniq.push({
                                    tollplaza: tolltoupdatesort[i].tollplaza
                                });
                            }
                            tolltoupdatesortuniq && console.log("tolltoupdatesortuniq.length :" + tolltoupdatesortuniq.length + " tolltoupdatesortuniq : " + JSON.stringify(tolltoupdatesortuniq));
                            console.log("tolltoupdate.length: " + tolltoupdate.length + " tolltoupdate : " + JSON.stringify(tolltoupdate));
                        }
                    }
                }
            }
        } else {
            var now = new Date();
            var mmsg = now + ":" + closesttollbydist0 + ":x:" + tolllastupd;
            mmsg += "|range<" + range + "?:" + closestdist[0].dist;
            mmsg += "|timediff>" + timerange + "?:" + timediff;
            1 == maildebug && console.log(mmsg);
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
        closestdist = [];
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
        console.log("Titanium.Geolocation.distanceFilter :" + Titanium.Geolocation.distanceFilter);
        var mmsg = new Date() + ": Titanium.Geolocation.distanceFilter to was set to  :" + Titanium.App.Properties.getInt("distanceFilter") + ".";
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
    } else Ti.App.iOS.scheduleLocalNotification({
        alertBody: "Please enable location services :" + new Date() + ".",
        date: new Date(new Date().getTime() + 3e3)
    });
};

bgLocFound(loc);

checkAlive = 1;