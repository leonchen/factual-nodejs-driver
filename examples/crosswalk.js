// crosswalk api doc:
// http://developer.factual.com/display/docs/Places+API+-+Crosswalk

var helper = require('./test_helper');
var factual = helper.factual;

var entity = {
  id: "57ddbca5-a669-4fcf-968f-a1c8210a479a",
  only: "yelp,foursquare"
};
factual.crosswalk(entity, helper.output);


entity = {
  namespace: "foursquare",
  id: "4ae4df6df964a520019f21e3",
  limit: 3
}
factual.crosswalk(entity, helper.output);
