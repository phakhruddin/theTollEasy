migration.up = function(db) {
	db.createTable({
        "columns" : {		    
			"tollplaza": "TEXT",
		    "longitude": "real",
		    "latitude": "real",
		    "altitude": "real",
			"heading": "real",
			"speed": "real",
			"hwy": "TEXT",
			"accuracy": "real",
			"timestamp": "real",
			"altitudeAccuracy": "real",
			"source": "TEXT",
			"location": "TEXT",
			"cost": "real",
			"type": "text",
			"hwy": "text",
			"note": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "tollplaza"
		}
});

};

migration.down = function(db) {

};
