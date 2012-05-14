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
// reuse the search query above, search starbucks in california and newyork city, and show the 21st to 40th sorted by status desc and postcode asc
var filters = new query.OrFilter(new query.RowFilter('region', '$eq', 'CA'), new query.RowFilter('locality', 'newyork')); // shortcut for $eq
query.select('name,address,postcode,region').setFilters(filters).descSort('status').ascSort('postcode').offset(20).limit(20);
places.read(query, helper.output);

var filter = new query.RowFilter('address', '$search', 'santa monica');
// add more filters
query.addFilter(filter).offset(0).clearSorts();
places.read(query, helper.output);

// directly set filters in query
var query = factual.query({search: "factual", filters: {region: "CA", postcode: "90067"}});
places.read(query, helper.output);

// Geo filter doc:
// http://developer.factual.com/display/docs/Core+API+-+Geo+Filters
var query = factual.query({search: "starbucks"}).geoWithin(34.041195, -118.331518, 1000).select('name,address,latitude,longitude').limit(1);
places.read(query, helper.output);
