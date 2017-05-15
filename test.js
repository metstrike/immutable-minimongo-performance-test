
var im = require('immutable-minimongo');
var mm = require('metstrike-minimongo');
var _ = require('mudash');
var Immutable = require('immutable');

var mc;
var ic;
var ac;

var cities;
var imCities;
var imCitiesIds;

var step = function(s, f) {
	process.stdout.write(s+" ... ");
	var ts1 = Date.now();

	f();

	var	ts2 = Date.now();
	var tm = Math.floor((ts2-ts1)/1)/1000;

	console.log("%ds", tm);
};

step("Loading data", () => cities = require('cities.json'));

step("Preparing data", () => {
	for(i in cities) {
		var city = cities[i];
		if(!_.isNaN(Number(city.lng)) && !_.isNaN(Number(city.lat))) {
			city.loc = {"type": "Point", "coordinates": [Number(city.lng), Number(city.lat)]};
		}
	}
});

step("Turning data immutable", () => {
	imCities = [];
	for(i in cities) {
		var city = cities[i];
		city = Immutable.fromJS(city);
		imCities.push(city);
	}
});

step("Inserting to ac array", () => {
	ac = [];
	for(i in cities) {
		var city = cities[i];
		ac.push(city);
	}
});

step("Inserting to mc", () => {
	mc = new mm.LocalCollection();
	for(i in cities) {
		var city = cities[i];
		mc.insert(city);
	}
});

step("Inserting to ic", () => {
	ic = new im.LocalCollection();

	for(i in imCities) {
		var city = imCities[i];
		ic.insert(city);
	}
});

step("Inserting batch to ic", () => {
	ic = new im.LocalCollection();

	imCitiesIds = ic.insertBatch(imCities);
});

step("Inserting to {}", () => {
	var c = {};

	for(i in cities) {
		var id = imCitiesIds[i];
		var city = cities[i];
		c[id] = city;
	}

	process.stdout.write(""+_.size(c)+" ")
});


step("Inserting to Map", () => {
	var c = Immutable.Map();

	for(i in cities) {
		var id = imCitiesIds[i];
		var city = cities[i];
		c = c.set(id, city);
	}

	process.stdout.write(""+_.size(c)+" ")
});

step("Inserting to OrderedMap", () => {
	var c = Immutable.OrderedMap();

	for(i in cities) {
		var id = imCitiesIds[i];
		var city = cities[i];
		c = c.set(id, city);
	}

	process.stdout.write(""+_.size(c)+" ")
});

step("Inserting to List", () => {
	var c = Immutable.List();

	for(i in cities) {
		var city = cities[i];
		c = c.push(city);
	}

	process.stdout.write(""+_.size(c)+" ")
});


step("Inserting to IdMap", () => {
	var c =	new im.LocalCollection._IdMap();

	for(i in cities) {
		var id = imCitiesIds[i];
		var city = cities[i];
		c.set(id, city);
	}

	process.stdout.write(""+c.count()+" ")
});

step("Counting array", () => ac.length);
step("Counting mc", () => process.stdout.write(""+mc.find().count()+" "));
step("Counting ic", () => process.stdout.write(""+ic.find().count()+" "));
step("Fetching mc", () => process.stdout.write(""+mc.find().fetch().length+" "));
step("Fetching ic", () => process.stdout.write(""+ic.find().fetch().count()+" "));
step("Fetching mc prj", () => process.stdout.write(""+mc.find({}, {fields: {country: 1, name: 1}}).fetch().length+" "));
step("Fetching ic prj", () => process.stdout.write(""+ic.find({}, {fields: {country: 1, name: 1}}).fetch().count()+" "));

step("Counting prg mc", () => process.stdout.write(""+mc.find({"name": "Prague"}).count()+" "));
step("Counting prg ic", () => process.stdout.write(""+ic.find({"name": "Prague"}).count()+" "));
step("Fetching prg mc", () => process.stdout.write(""+mc.find({"name": "Prague"}).fetch().length+" "));
step("Fetching prg ic", () => process.stdout.write(""+ic.find({"name": "Prague"}).fetch().count()+" "));

var prg = [];
// var prg = c.find({country: "CZ", "name": "Prague"}).fetch();

prg.forEach((city) => {
	console.log(city);
	var loc = _.get(city, "loc");
	console.log(loc);
	var query = {loc: {$near: {$geometry: loc, $minDistance: 1, $maxDistance: 150000}}};
	console.log(JSON.stringify(query));
	var nr = c.find(query, {fields: {"country": 1, "name": 1, "loc.coordinates": 1}}).fetch();

	nr.forEach((nearbyCity) => {
		console.log(_.get(nearbyCity, "country"), _.get(nearbyCity, "name"));
	});
});

console.log("Done");
