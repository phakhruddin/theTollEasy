var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
	_tab.open($.win_tpfound);
	//console.log("fetching found");
	//Alloy.Collections.found.fetch();
	$.table_tpfound.search = $.search_tpfound;
	$.win_tpfound.addEventListener("click", function(e){
		console.log("JSON stringify e : "+JSON.stringify(e));
		var title = e.row.title;
		var tabViewTV1TPFTDetailController = Alloy.createController('TV1TPFTDetail',{
			title: title
		});
	  	tabViewTV1TPFTDetailController.openMainWindow($.tab_tpfound);	
	});				
};

function transformFunction(model) {
	var transform = model.toJSON();
	transform.orgtimestamp = transform.timestamp;
	transform.timestamp = new Date(transform.timestamp);
	transform.title = transform.tollplaza+','+transform.latitude+','+transform.longitude+','+transform.cost+','+transform.hwy+','+transform.note+','+transform.timestamp+','+transform.orgtimestamp;
	transform.tollplaza = transform.tollplaza;
	transform.cost =" Your cost is $"+transform.cost+", click for details.";
	transform.custom = " Detected on "+transform.timestamp;
	return transform;
}

function filterFunction(collection) {
	return collection.where({type:"none"});
}

$.table_tpfound.addEventListener("delete",function(e){
	// delete entry with the specific timestamp
	console.log("JSON stringify e from table_tpfound : "+JSON.stringify(e));
	var title = e.row.title;
	var titlesplit = title.split(',');
	var timestampdelete = titlesplit[7];
	var tollplazadelete = titlesplit[0];
	console.log("timestamp to be deleted is : "+timestampdelete);
	//console.log("tollplaza to be deleted is : "+tollplazadelete);
	Alloy.Collections.found.deleteTimestamp(timestampdelete);
	//Alloy.Collections.found.deleteTollPlaza(tollplazadelete);
});
console.log("fetching found");
Alloy.Collections.found.fetch();