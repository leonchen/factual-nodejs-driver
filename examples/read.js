var helper = require('./test_helper');
var auth = require('./auth');
var Factual = require('../factual-api');

var factual = new Factual(auth.key, auth.secret);
//factual.startDebug();

var places = factual.table('places');

var query = factual.query({search: "starbucks"});
places.read(query, function (error, res) {
  helper.output(error, res);
});

query.select('name,address,postcode,region').addFilter({region: "CA"}).descSort('status').ascSort('postcode').offset(20).limit(20);
places.read(query, function (error, res) {
  helper.output(error, res);
});

query.addFilter({postcode: "90025"}).offset(0).clearSorts();
places.read(query, function (error, res) {
  helper.output(error, res);
});

query.setFilters({region: "CA", postcode: "90025"});
places.read(query, function (error, res) {
  helper.output(error, res);
});

query.select('name,address,latitude,longitude').clearFilters().limit(1).offset(0).geoWithin(34.041195, -118.331518, 1000);
places.read(query, function (error, res) {
  helper.output(error, res);
});
