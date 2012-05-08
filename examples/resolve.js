// resolve api doc:
// http://developer.factual.com/display/docs/Places+API+-+Resolve

var helper = require('./test_helper');
var factual = helper.factual;

var input = {
  name: "huckleberry",
  latitude: 34.023827,
  longitude: -118.49251
};
factual.resolve(input, helper.output);
