var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.getLocation = function() {
    var chicago = '{"poi":[{"plaza":"0","latitude":"A1","longitude":"A1","altitude":"99.99","heading":"north","speed":"","hwy":"amazon.com"},{"name":"john","count":2},{"name":"joe","count":3}]}';
    var poiObject = JSON.parse(chicago);
    var theplaza = poiObject.poi[0].plaza;
    var url = "http://54.197.150.195:10000/data";
    Ti.UI.createTableView();
    var json;
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                json = JSON.parse(this.responseText);
                var file1 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "chicago.txt");
                var file2 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "json.txt");
                file1.write(chicago);
                file2.write(this.responseText);
                Ti.Api.info("check chicago: " + chicago);
                var plaza1 = json.poi[0].plaza;
                Ti.Api.info("data1: " + plaza1);
                return plaza1;
            } catch (e) {
                Ti.API.info("cathing e: " + e);
            }
        }
    });
    xhr.onerror = function(e) {
        alert(e);
    };
    xhr.open("GET", url);
    xhr.send();
    return theplaza;
};

Alloy.Globals.checkLoc = function() {
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info(e.coords);
                alert("latitude :" + e.coords.latitude + " longitude : " + e.coords.longitude);
            }
        });
    } else alert("Please enable location services");
};

Alloy.Globals.getGeneralLocation = function(loc) {
    var url = "http://54.197.150.195:10000/" + loc + ".json";
    var thefile = loc + ".txt";
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                json = JSON.parse(this.responseText);
                var file4 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile);
                file4.write(this.responseText);
            } catch (e) {
                Ti.API.info("cathing e: " + e);
            }
        }
    });
    xhr.onerror = function(e) {
        alert(e);
    };
    xhr.open("GET", url);
    xhr.send();
    alert(loc + " POIs were successfuly downloaded from " + url + ". Please proceed.");
};

Alloy.Globals.updateTollPlaza = function(loc) {
    var url = "http://54.197.150.195:10000/" + loc + ".json";
    Alloy.Collections.tollplaza.deleteLOC(loc);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                json = JSON.parse(this.responseText);
                for (var i = 0; +json.poi.length > i; i++) {
                    var tollplazaModel = Alloy.createModel("tollplaza", {
                        tollplaza: json.poi[i].plaza,
                        latitude: json.poi[i].latitude,
                        longitude: json.poi[i].longitude,
                        altitude: json.poi[i].altitude || "none",
                        heading: json.poi[i].heading || "none",
                        speed: json.poi[i].speed || "none",
                        hwy: "interstate",
                        accuracy: "0",
                        timestamp: "0",
                        altitudeAccuracy: "0",
                        cost: json.poi[i].cost || "0",
                        type: json.poi[i].type || "none",
                        source: "http",
                        location: loc,
                        note: i
                    });
                    tollplazaModel.save();
                }
            } catch (e) {
                Ti.API.info("cathing e: " + e);
            }
        }
    });
    xhr.onerror = function(e) {
        alert(e);
    };
    xhr.open("GET", url);
    xhr.send();
    alert(loc + " POIs from " + url + ", updated in DB.");
};

Alloy.Globals.calcDistance = function(lat1, lon1, lat2, lon2, unit) {
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
    var calcresult = "dist:" + dist + "lat1:" + lat1 + ",lat2:" + lat2 + ",radlat1:" + radlat1 + ",radlat2:" + radlat2 + ",lon1:" + lon1 + ",lon2:" + lon2 + ",radlon1:" + radlon1 + ",radlon2:" + radlon2 + ",radtheta:" + radtheta + "\n";
    var calcfile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "calcfile.txt");
    calcfile.write(calcresult);
    return Math.round(1e14 * dist);
};

Alloy.Globals.updateFound = function(tollplaza, longitude, latitude, timestamp, cost, type, hwy) {
    var altitude = heading = accuracy = altitudeAccuracy = data1 = data2 = speed = "0";
    var cost = cost || "0.00";
    var emaildata = "Alloy.Globals.updateFound: " + new Date() + ": About to update found DB: tp : " + tollplaza + ", lon:" + longitude + ", lat : " + latitude + ", cost : " + cost + ", type : " + type + ", timestamp : " + timestamp + "\n";
    console.log(emaildata);
    Alloy.Globals.writeFile(emaildata, "thetolleasydebug.txt");
    var foundModel = Alloy.createModel("found", {
        tollplaza: tollplaza,
        longitude: longitude,
        latitude: latitude,
        altitude: altitude,
        heading: heading,
        accuracy: accuracy,
        speed: speed,
        timestamp: timestamp,
        altitudeAccuracy: altitudeAccuracy,
        cost: cost,
        type: type,
        hwy: hwy,
        data1: data1,
        data2: data2
    });
    foundModel.save();
    Alloy.Collections.found.fetch();
};

Alloy.Globals.writeFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    if (file.exists() && file.writeable) {
        var success = file.deleteFile();
        Ti.API.info(true == success ? "success" : "fail");
    }
    file.write(content);
};

Alloy.Globals.distanceDetectTollPlaza = function(loc) {
    var distmatch = closestdist = [];
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info(JSON.stringify(e.coords));
                var lon1 = +e.coords.longitude;
                var lat1 = +e.coords.latitude;
                var time1 = +e.coords.timestamp;
                Titanium.Geolocation.reverseGeocoder(lat1, lon1, function(evt) {
                    if (evt.success) {
                        var places = evt.places;
                        currentaddr = places && places.length ? places[0].address : "No address found";
                        Titanium.App.Properties.setString("currentaddr", currentaddr);
                        console.log("currentaddr :" + currentaddr);
                        Ti.API.debug("reverse geolocation result = " + JSON.stringify(evt));
                    } else Ti.API.info("Code translation: " + JSON.stringify(e.code));
                });
                var db = Ti.Database.open("_alloy_");
                var tolldata = db.execute('SELECT tollplaza,latitude,longitude,hwy,cost,type,note,location FROM tollplaza where location ="' + loc + '"');
                try {
                    while (tolldata.isValidRow()) {
                        var tolltollplaza = tolldata.fieldByName("tollplaza");
                        var lat2 = tolldata.fieldByName("latitude");
                        var lon2 = tolldata.fieldByName("longitude");
                        var dist = Alloy.Globals.calcDistance(lat1, lon1, lat2, lon2, "N");
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
                        tolldata.next();
                    }
                } catch (err) {
                    alert(err);
                }
                db.close();
                console.log("JSON distance unsort :" + JSON.stringify(distmatch));
                var closestdist = distmatch.sort(function(a, b) {
                    return a.dist - b.dist;
                });
                console.log("JSON distance SORT :" + JSON.stringify(closestdist));
                closestdist[0].tolltollplaza;
                var closesttollbydist0 = closestdist[0].tolltollplaza;
                closestdist[0].dist;
                closestdist[1].tolltollplaza;
                closestdist[1].dist;
                closestdist[2].tolltollplaza;
                closestdist[2].dist;
                var outputclosesttollbydist0 = closestdist[0].tolltollplaza + " distance : " + closestdist[0].dist;
                var outputclosesttollbydist1 = closestdist[1].tolltollplaza + " distance : " + closestdist[1].dist;
                var outputclosesttollbydist2 = closestdist[2].tolltollplaza + " distance : " + closestdist[2].dist;
                Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
                Titanium.App.Properties.setString("outputclosesttollbydist1", outputclosesttollbydist1);
                Titanium.App.Properties.setString("outputclosesttollbydist2", outputclosesttollbydist2);
                var range = 158672e12;
                var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
                var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
                var timelastupd = parseFloat(timelastupd);
                var timediff = time1 - timelastupd;
                var timerange = 1e4;
                console.log("time diff is : time 1 - timelastupd : " + time1 + " - " + timelastupd + " = " + timediff);
                if (range > closestdist[0].dist && timediff > timerange && closesttollbydist0 != tolllastupd) {
                    var tollplaza = closestdist[0].tolltollplaza;
                    var longitude = closestdist[0].longitude;
                    var latitude = closestdist[0].latitude;
                    var timestamp = time1;
                    var cost = closestdist[0].cost;
                    var type = closestdist[0].type;
                    var hwy = closestdist[0].hwy;
                    var note = closestdist[0].note;
                    Alloy.Globals.updateFound(tollplaza, longitude, latitude, timestamp, cost, type, hwy);
                    console.log("timestamp is :" + timestamp);
                    Titanium.App.Properties.setString("timelastupd", timestamp);
                    Titanium.App.Properties.setString("tolllastupd", tollplaza);
                } else {
                    console.log(" is this existing toll? " + closesttollbydist0 + " vs. tolllastupd: " + tolllastupd);
                    console.log(" is range less than " + range + " ? : range is : " + closestdist[0].dist);
                    console.log(" is timediff less than " + timerange + " ? : timediff is : " + timediff);
                }
                console.log(" timestamp after set prop " + Titanium.App.Properties.getString("timelastupd"));
            }
        });
        if (Titanium.Geolocation.hasCompass) {
            Titanium.Geolocation.showCalibration = false;
            Ti.Geolocation.getCurrentHeading(function(e) {
                if (e.error) {
                    currentHeading = "error: " + e.error;
                    Ti.API.info("Code translation: " + translateErrorCode(e.code));
                    return;
                }
                var x = e.heading.x;
                var y = e.heading.y;
                var z = e.heading.z;
                e.heading.magneticHeading;
                e.heading.accuracy;
                e.heading.trueHeading;
                var timestamp = e.heading.timestamp;
                currentHeading = "x:" + x + " y: " + y + " z:" + z;
                Titanium.API.info("geo - current heading: " + new Date(timestamp) + " x " + x + " y " + y + " z " + z);
            });
        } else {
            Titanium.API.info("No Compass on device");
            currentHeading = "No compass available";
            trueHeading = "No compass available";
        }
        Titanium.App.Properties.setString("currentHeading", trueHeading);
        console.log("currentHeading :" + currentHeading);
    } else alert("Please enable location services");
};

Alloy.Globals.eventFireDetectTollPlaza = function(loc) {
    var distmatch = closestdist = [];
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info(JSON.stringify(e.coords));
                var lon1 = +e.coords.longitude;
                var lat1 = +e.coords.latitude;
                var time1 = +e.coords.timestamp;
                Titanium.Geolocation.reverseGeocoder(lat1, lon1, function(evt) {
                    if (evt.success) {
                        var places = evt.places;
                        currentaddr = places && places.length ? places[0].address : "No address found";
                        Titanium.App.Properties.setString("currentaddr", currentaddr);
                        console.log("currentaddr :" + currentaddr);
                        Ti.API.debug("reverse geolocation result = " + JSON.stringify(evt));
                    } else Ti.API.info("Code translation: " + JSON.stringify(e.code));
                });
                var db = Ti.Database.open("_alloy_");
                var tolldata = db.execute('SELECT tollplaza,latitude,longitude,hwy,cost,type,note,location FROM tollplaza where location ="' + loc + '"');
                try {
                    while (tolldata.isValidRow()) {
                        var tolltollplaza = tolldata.fieldByName("tollplaza");
                        var lat2 = tolldata.fieldByName("latitude");
                        var lon2 = tolldata.fieldByName("longitude");
                        var dist = Alloy.Globals.calcDistance(lat1, lon1, lat2, lon2, "N");
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
                        tolldata.next();
                    }
                } catch (err) {
                    alert(err);
                }
                db.close();
                console.log("JSON distance unsort :" + JSON.stringify(distmatch));
                var closestdist = distmatch.sort(function(a, b) {
                    return a.dist - b.dist;
                });
                console.log("JSON distance SORT :" + JSON.stringify(closestdist));
                closestdist[0].tolltollplaza;
                var closesttollbydist0 = closestdist[0].tolltollplaza;
                closestdist[0].dist;
                closestdist[1].tolltollplaza;
                closestdist[1].dist;
                closestdist[2].tolltollplaza;
                closestdist[2].dist;
                var outputclosesttollbydist0 = closestdist[0].tolltollplaza + " distance : " + closestdist[0].dist;
                var outputclosesttollbydist1 = closestdist[1].tolltollplaza + " distance : " + closestdist[1].dist;
                var outputclosesttollbydist2 = closestdist[2].tolltollplaza + " distance : " + closestdist[2].dist;
                Titanium.App.Properties.setString("outputclosesttollbydist0", outputclosesttollbydist0);
                Titanium.App.Properties.setString("outputclosesttollbydist1", outputclosesttollbydist1);
                Titanium.App.Properties.setString("outputclosesttollbydist2", outputclosesttollbydist2);
                var range = 158672e12;
                var timelastupd = Titanium.App.Properties.getString("timelastupd") || 0;
                var tolllastupd = Titanium.App.Properties.getString("tolllastupd") || "None";
                var timelastupd = parseFloat(timelastupd);
                var timediff = time1 - timelastupd;
                var timerange = 1e4;
                console.log("time diff is : time 1 - timelastupd : " + time1 + " - " + timelastupd + " = " + timediff);
                if (range > closestdist[0].dist && timediff > timerange && closesttollbydist0 != tolllastupd) {
                    var tollplaza = closestdist[0].tolltollplaza;
                    var longitude = closestdist[0].longitude;
                    var latitude = closestdist[0].latitude;
                    var timestamp = time1;
                    var cost = closestdist[0].cost;
                    var type = closestdist[0].type;
                    var hwy = closestdist[0].hwy;
                    var note = closestdist[0].note;
                    Alloy.Globals.updateFound(tollplaza, longitude, latitude, timestamp, cost, type, hwy);
                    console.log("timestamp is :" + timestamp);
                    Titanium.App.Properties.setString("timelastupd", timestamp);
                    Titanium.App.Properties.setString("tolllastupd", tollplaza);
                } else {
                    console.log(" is this existing toll? " + closesttollbydist0 + " vs. tolllastupd: " + tolllastupd);
                    console.log(" is range less than " + range + " ? : range is : " + closestdist[0].dist);
                    console.log(" is timediff less than " + timerange + " ? : timediff is : " + timediff);
                }
                console.log(" timestamp after set prop " + Titanium.App.Properties.getString("timelastupd"));
            }
        });
    } else alert("Please enable location services");
};

Alloy.createController("index");