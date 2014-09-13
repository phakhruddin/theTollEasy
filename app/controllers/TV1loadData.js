var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
	_tab.open($.loaddatawindow);
  	console.debug("This is child widow tabViewOneChild.js" +_tab);
	$.loaddatatable.addEventListener("click", function(e){
    	var loc = e.row.id;
    	console.log("JSON e : " +JSON.stringify(e));
    	//Alloy.Globals.getGeneralLocation(loc);
		Alloy.Globals.updateTollPlaza("newberlin");
		// Navigate to output
		var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
	  	tabViewLoadDataOutputController.openMainWindow($.tab_loaddata);	
	});
};