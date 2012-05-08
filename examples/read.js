// read api doc:
// http://developer.factual.com/display/docs/Core+API+-+Read

var helper = require('./test_helper');
var factual = helper.factual;

var places = factual.table('places');

// Fulltext search doc:
// http://developer.factual.com/display/docs/Core+API+-+Search+Filters
var query = factual.query({search: "starbucks"});
places.read(query, helper.output);

// Filter syntax:
// http://developer.factual.com/display/docs/Core+API+-+Row+Filters
query.select('name,address,postcode,region').addFilter({region: "CA"}).descSort('status').ascSort('postcode').offset(20).limit(20);
places.read(query, helper.output);

query.addFilter({postcode: "90025"}).offset(0).clearSorts();
places.read(query, helper.output);

query.setFilters({region: "CA", postcode: "90025"});
places.read(query, helper.output);

// Geo filter doc:
// http://developer.factual.com/display/docs/Core+API+-+Geo+Filters
query.select('name,address,latitude,longitude').clearFilters().limit(1).offset(0).geoWithin(34.041195, -118.331518, 1000);
places.read(query, helper.output);
