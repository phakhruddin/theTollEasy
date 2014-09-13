var args = arguments[0] || {};

exports.openMainWindow = function(_tab) {
	_tab.open($.win_geobg);
	console.log("geobg open");
	Ti.Media.vibrate([0, 2000]);
};


$.row_plaza.addEventListener ("click", function(e){
	console.debug('row index = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.rowData));
	console.debug("in open_button click event handler");
  // load the tabViewOneChild controller and call the index method
  var tabViewOneChildController = Alloy.createController("tollPlazaView");
  // pass in the tab to give navigation and back button
  tabViewOneChildController.openMainWindow($.tab_geobg);
});


