# About

This is a nodejs client package for [Factual's public API](http://developer.factual.com/display/docs/Factual+Developer+APIs+Version+3).

This API supports queries to Factual's Read, Schema, Facets, Crosswalk, and Resolve APIs. Full documentation is available on the Factual website:

*   [Read](http://developer.factual.com/display/docs/Core+API+-+Read): Search the data
*   [Schema](http://developer.factual.com/display/docs/Core+API+-+Schema): Get table metadata
*   [Facets](http://developer.factual.com/display/docs/Core+API+-+Facets): Count group of data
*   [Crosswalk](http://developer.factual.com/display/docs/Places+API+-+Crosswalk): Get third-party IDs
*   [Resolve](http://developer.factual.com/display/docs/Places+API+-+Resolve): Enrich your data and match it against Factual's

# Install

`````bash
$ npm install factual-api
`````

# Get Start

It is required to have your own api key/secret, you can get them from [factual](https://www.factual.com/api-keys/request)

Then include this driver in your projects:
`````javascript
var Factual = require('factual-api');
var factual = new Factual('YOUR_KEY', 'YOUR_SECRET');
`````

## Read
Set the target table and the query object for read:
`````javascript
// search starbucks in LA from the factual's places table
var places = factual.table('places');
var query = factual.query({search: "starbucks", filters: {locality: "los angeles"}});
places.read(query, function (error, rows) {
  console.log("show "+ rows.count +"/"+ rows.total +"rows:", rows);
});
`````

Filters usage:
`````javascript
var query = factual.query().search("starbucks").select('name,address,postcode,region').descSort('status').ascSort('postcode').offset(20).limit(20);
// only get entities in california or in newyork city
var filters = new query.OrFilter(new query.RowFilter('region', '$eq', 'CA'), new query.RowFilter('locality', 'newyork'));
// the same as the above filter
// var filters = query.parseFilters({"$or":[ {"region":{"$eq":"CA"}}, {"locality":"newyork"} ]});
places.read(query.setFilters(filters), function (error, rows) {
  console.log("show "+ rows.count +"/"+ rows.total +"rows:", rows);
});
`````

You can find more examples in examples/read.js

## Schema
For schema, you only need to specify the table:
`````javascript
factual.table('places').schema(function (error, schema) {
  console.log(schema);
});
`````

## Facets
`````javascript
// show count(at least 20) of starbucks of each city in california
var query = factual.query({filters: {region: "CA"}}).select('locality').search("starbucks").minFacetCount(20);
factual.table('places').facets(query, function (error, facets) {
  console.log('total:', facets.total, ' details:', facets);
});
`````

## Crosswalk
Query with factual id, and only show entites from yelp and foursquare:
`````javascript
var entity = {
  id: "57ddbca5-a669-4fcf-968f-a1c8210a479a",
  only: "yelp,foursquare"
};
factual.crosswalk(entity, function (error, entities) {
  console.log(entities);
});
`````

Or query with an entity from foursquare, and only show 3 results:
`````javascript
var entity = {
  namespace: "foursquare",
  id: "4ae4df6df964a520019f21e3",
  limit: 3
}
factual.crosswalk(entity, function (error, entities) {
  console.log(entities);
});
`````

## Resolve
Resolve the entity from name and address:
`````javascript
var input = {
  name: "huckleberry",
  address: "1014 Wilshire Blvd"
};
factual.resolve(input, function (error, res) {
  console.log('resolved entity:', res.resolved);
});
`````
Resolve from name and location
`````javascript
var input = {
  name: "huckleberry",
  latitude: 34.023827,
  longitude: -118.49251
};
factual.resolve(input, function (error, res) {
  console.log('resolved entity:', res.resolved);
});
`````

## Raw
Query with the factual api request url directly, you will have to encode the queries and the response will be factual api's raw response object
`````javascript
var qs      = require('querystring');
var filters = qs.stringify({filters:'{"locality":{"$in":["los angeles","newyork"]}}'});
factual.raw('/t/places?q=starbucks&sort=locality:asc&limit=10&offset=10&'+filters, function (error, res) {
  console.log(res);
});
`````
