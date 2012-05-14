var helper = require('./test_helper');
var factual = helper.factual;
var qs    = require('querystring');

var filters = qs.stringify({filters:'{"locality":{"$in":["los angeles","newyork"]}}'});
// request data with the raw api url
// the response object will be
// the default factual api response(s)
factual.raw('/t/places?q=starbucks&sort=locality:asc&limit=10&offset=10&'+filters, helper.output);
