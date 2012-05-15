// facets api doc:
// http://developer.factual.com/display/docs/Core+API+-+Facets

var helper = require('./test_helper');
var factual = helper.factual;

var places = factual.table('places');
// show count(at least 20) of starbucks for each city in ca
var query = factual.query({filters: {region: "CA"}}).select('locality').search("starbucks").minFacetCount(20);
places.facets(query, helper.output);

