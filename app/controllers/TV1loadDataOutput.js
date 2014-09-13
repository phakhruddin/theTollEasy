var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
	_tab.open($.win_loaddataoutput);
	console.log("fetching tollplaza");
	$.table_loaddataoutput.search = $.search_loaddataoutput;
	Alloy.Collections.tollplaza.fetch();	
	$.win_loaddataoutput.addEventListener("click", function(e){
		console.log("JSON stringify e : "+JSON.stringify(e));
		var title = e.row.title;
		var tolldata = title.split(',');
		var title = tolldata[0];
		var latitude = tolldata[1];
		var longitude = tolldata[2];
		var hwy = tolldata[4];
		console.log("title:lat:lon "+title+":"+latitude+":"+longitude);
		var tabViewTwoChildController = Alloy.createController('tabViewTwoChild',{
			title: title,
			latitude: latitude,
			longitude: longitude,
			hwy:hwy			
		});
	  	tabViewTwoChildController.openMainTwoWindow($.tab_tv1loaddataoutput);
	});		
};

function transformFunction(model) {
	var transform = model.toJSON();
	//console.log("transform data : "+JSON.stringify(transform));
	transform.title = transform.tollplaza+','+transform.latitude+','+transform.longitude+','+transform.cost+','+transform.hwy+','+transform.note+','+transform.timestamp;
	transform.timestamp = new Date(transform.timestamp);
	transform.latitude = "LAT : " +transform.latitude;
	transform.longitude = "LON: "+transform.longitude;
	return transform;
}

function filterFunction(collection) {
	var loc = Titanium.App.Properties.getString('loc',"ALL");
	if ( loc == "ALL") {
		return collection.where({speed:"0"});
	} else {
		return collection.where({location:loc});
	}
}

$.table_loaddataoutput.addEventListener("delete",function(e){
	// delete entry with the specific timestamp
	console.log("JSON stringify e from table_tpfound : "+JSON.stringify(e));
	var title = e.row.title;
	var titlesplit = title.split(',');
	var tollplazadelete = titlesplit[0];
	var latdelete = titlesplit[1];
	console.log("tollplaza to be deleted is : "+tollplazadelete+" with lat: "+latdelete);
	Alloy.Collections.tollplaza.deleteTollPlaza(tollplazadelete);
	//Alloy.Collections.tollplaza.deleteLAT(latdelete);
});