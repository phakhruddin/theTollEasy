exports.openMainWindow = function(_tabone) {
  _tabone.open($.win_tollplaza);
  console.debug("This is child window tollPlazaView.js" +_tabone);
 
  $.tollplazatable.addEventListener ("click", function(e){
	console.debug('row index = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.index));
	Ti.API.info('row rowData = ' + JSON.stringify(e.rowData));
	console.debug("in open_button click event handler");

  // load the tabViewOneChild controller and call the index method
 var tabTollPlazaViewController = Alloy.createController("TollPlazaViewPayment");

  // pass in the tab to give navigation and back button
 tabTollPlazaViewController.openMainTollWindow($.tab_tollplaza);
 });
};

function testAlert(){
		alert("This is alert from TollPLaza View Function");
}

var getPlaza = function() {
	var plaza = Alloy.createModel('plazano', [ {no:'0', location:'Gurnee IL'}, {no:'1', location:'Waukegan IL'}, {no:'2', location:'Lake Bluff IL'} ] ); 
	// Since set or save(attribute) is not being called, we can call isValid to validate the model object
	if (plaza.isValid() && plaza.customProperty == "plazano") {
	    // Save data to persistent storage
	    plaza.save();
	}
	else {
	    plaza.destroy();
	}
	Ti.API.info('plazano data ' + JSON.stringify(plaza));
	var nchicago = '{"poi":[{"plaza":"0","latitude":"A1","longitude":"A1","altitude":"99.99","heading":"north","speed":"","hwy":"amazon.com"},{"name":"john","count":2},{"name":"joe","count":3}]}';
	var nextplaza = JSON.parse(nchicago);
	var nnplaza = nextplaza[0];
	console.debug("next plaza" +nextplaza);
	//var plazalength = plaza.length;
	var plazacount = plaza.length;
	console.debug("plaza length : " +plazacount);
	x=1;
	var plazalength = 10;
	for (var i = 1; i < plazalength; i++) {
		var plazanumber = "plazano";
		Ti.API.info("plaza : "+ plazanumber);
	};
};


