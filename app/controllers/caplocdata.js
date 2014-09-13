var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
	_tab.open($.win_caplocdata);
	console.log("fetching plazano");
	Alloy.Collections.plazano.fetch();
	$.win_caplocdata.addEventListener("click", function(e){
		console.log("JSON stringify e : "+JSON.stringify(e));
		var title = e.row.title;
		console.log("title:lat:lon "+e.row.title.split(',')[0]+":"+e.row.title.split(',')[1]+":"+e.row.title.split(',')[2]);
		var tabViewTwoChildController = Alloy.createController('tabViewTwoChild',{
			title: e.row.title.split(',')[0],
			latitude: e.row.title.split(',')[1],
			longitude:  e.row.title.split(',')[2],
			timestamp:  e.row.title.split(',')[3],
			hwy: "none"
		});
	  	tabViewTwoChildController.openMainTwoWindow($.tab_caplocdata);	
	});				
};

function transformFunction(model) {
	var transform = model.toJSON();
	transform.title = transform.tollplaza+','+transform.latitude+','+transform.longitude+','+transform.timestamp;
	transform.timestamp = new Date(transform.timestamp);
	transform.tollplaza = transform.tollplaza;
	transform.custom = " Detected on "+transform.timestamp;
	return transform;
}

function filterFunction(collection) {
	return collection.where({type:"none"});
}

$.table_caplocdata.addEventListener("delete",function(e){
	// delete entry with the specific timestamp
	console.log("JSON stringify e from table_caplocdata : "+JSON.stringify(e));
	var title = e.row.title;
	var titlesplit = title.split(',');
	var timestampdelete = titlesplit[6];
	console.log("timestamp to be deleted is : "+timestampdelete);
	Alloy.Collections.plazano.deleteTimestamp(timestampdelete);
});
