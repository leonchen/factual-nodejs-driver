var helper = require('./test_helper');
var factual = helper.factual;
var qs    = require('querystring');

//  url + callback
var filters = qs.stringify({filters:'{"locality":{"$in":["los angeles","newyork"]}}'});
factual.raw('/t/places?q=starbucks&sort=locality:asc&limit=10&offset=10&'+filters, helper.output);

// path + query object + callback
factual.raw('/t/places', {
  q: "starbucks",
  limit: 10,
  offset: 10,
  sort: "locality:asc",
  filters: {
    locality: {"$in":["los angeles","newyork"]}
  }
}, helper.output);
