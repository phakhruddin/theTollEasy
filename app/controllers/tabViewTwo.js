/*$.open_button_two.addEventListener("click", function(e) {
	console.debug("open this one after clikcing on button two");
	var tabViewTwoChildController = Alloy.createController('tabViewTwoChild');
	tabViewTwoChildController.openMainTwoWindow($.tab_two);
});*/

var thelatitude = 42.432276;
var thelongitude = -87.952004;

$.mapbutton.addEventListener("click", function(e) {
	console.debug("open this one after clikcing on button two");
	var Map = require('ti.map');
	var win = Titanium.UI.createWindow({
		//title: "Map.NORMAL_TYPE & ti.map",
		fullscreen: true,
		tabBarHidden : false,
		navBarHidden: false
	});
	var tollPlaza0 = Map.createAnnotation({
	    latitude: thelatitude,
	    longitude: thelongitude,
	    title:"Waukegan Toll Plaza 21",
	    subtitle:'I-94 Gurnee, IL',
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
	});
	var mapview = Map.createView({
	    mapType: Map.NORMAL_TYPE,
	    region: {latitude: thelatitude, longitude: thelongitude,
	            latitudeDelta:0.01, longitudeDelta:0.01},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[tollPlaza0]
	});
    if(Ti.Platform.osname == 'android'){
    	alert("adding mapview on android");
	    win.add(mapview);   
   	} else {
   		win.add(mapview);
	   	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 0,
			left: 10
		});
	   	var win1 = Titanium.UI.iOS.createNavigationWindow({
			title: "MAP",
			backgroundColor: "transparent",
	   	  	window: win
	    });
	    win1.add(btnBack);
	    btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing map" +_tab);
			win1.close();
		});		
   }; 

	listener = function(evt){Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);};
	mapview.addEventListener('click', listener);
	if(Ti.Platform.osname == 'android'){
		alert("android win.open() mapview");
		win.open();
	} else {
		alert("opening iphone map");
		win1.open();
	};
});

$.mapbutton2.addEventListener("click", function(e){
	var win = Titanium.UI.createWindow({
		title: "Titanium.Map.STANDARD_TYPE"
	});
var tollPlaza0 = Titanium.Map.createAnnotation({
    latitude: thelatitude,
    longitude: thelongitude,
    title:"Waukegan Toll Plaza 21 MAP2",
    subtitle:"I-94 Gurnee, IL",
    pincolor:Titanium.Map.ANNOTATION_RED,
    animate:true,
    leftButton: '../images/appcelerator_small.png',
    myid:1 // Custom property to uniquely identify this annotation.
});

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude: thelatitude, longitude: thelongitude,
             latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[tollPlaza0]
});

win.add(mapview);
win.open();
});

$.mapbutton3.addEventListener("click", function(e){

		var win = Titanium.UI.createWindow({
			title: "Hybrid",
			fullscreen: true,
			tabBarHidden : false,
			navBarHidden: false
		});
	if(Ti.Platform.osname == 'android'){
		var Map = Titanium.Map;

		var tollPlaza0 = Map.createAnnotation({
		    latitude: thelatitude,
		    longitude: thelongitude,
		    title:"Waukegan Toll Plaza 21",
		    subtitle:'I-94 Gurnee, IL',
		    myid:1 // Custom property to uniquely identify this annotation.
		});
		var mapview = Map.createView({
		    mapType: Titanium.Map.STANDARD_TYPE,
		    region: {latitude: thelatitude, longitude: thelongitude,
		            latitudeDelta:0.01, longitudeDelta:0.01},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    annotations:[tollPlaza0]
		});
		alert("android win.open() mapview");
		win.add(mapview);
		win.open();
	} else {
		var Map = require('ti.map');
		var tollPlaza0 = Map.createAnnotation({
		    latitude: thelatitude,
		    longitude: thelongitude,
		    title:"Waukegan Toll Plaza 21",
		    subtitle:"I-94 Gurnee, IL",
		    myid:1 // Custom property to uniquely identify this annotation.
		});
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude: thelatitude, longitude: thelongitude,
		            latitudeDelta:0.01, longitudeDelta:0.01},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    annotations:[tollPlaza0]
		});
		win.add(mapview);
		var win1 = Titanium.UI.iOS.createNavigationWindow({
			title: "MAP",
			backgroundColor: "transparent",
	   	  	window: win
	    });
	    var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 0,
			left: 10
			});
		win1.add(btnBack);
	    btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing map" +_tab);
			win1.close();
		});		
		win1.open();
	}
});