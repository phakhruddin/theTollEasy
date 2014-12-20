var args = arguments[0] || {};
Alloy.Globals.updatetollsource(); /// refresh from the cloud for tollsource
$.loaddatatable.search = $.search_loaddatatable;
Alloy.Collections.tollsource.fetch(); /// refresh the database for tollsource
exports.openMainWindow = function(_tab) {
	_tab.open($.loaddatawindow);
  	console.debug("This is child widow tabViewOneChild.js" +_tab);
	$.loaddatatable.addEventListener("click", function(e){
    	var loc = e.row.title.replace(/ Toll.*/,'');
    	console.log("JSON e : " +JSON.stringify(e));
    	//console.log("loc identified as: "+loc);
    	//Alloy.Globals.getGeneralLocation(loc);
		//Alloy.Globals.updateTollPlaza("newberlin");
		Alloy.Globals.updateTollPlaza(loc);
		// Navigate to output
		var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
	  	tabViewLoadDataOutputController.openMainWindow($.tab_loaddata);	
	});
};

function transformFunction(model) {
	var transform = model.toJSON();
	//console.log("transform data : "+JSON.stringify(transform));
	transform.title = transform.state+' Toll Plazas ('+transform.country+')';
	return transform;
}

function filterFunction(collection) {
	var country = Titanium.App.Properties.getString('country',"ALL");
	if ( country == "ALL") {
		return collection;
	} else {
		return collection.where({country:country});
	}
}