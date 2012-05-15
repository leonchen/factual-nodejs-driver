// resolve api doc:
// http://developer.factual.com/display/docs/Places+API+-+Resolve

var helper = require('./test_helper');
var factual = helper.factual;

// resovle from name and address
var input = {
  name: "huckleberry",
  address: "1014 Wilshire Blvd"
};
factual.resolve(input, helper.output);


// resolve from name and location
input = {
  name: "huckleberry",
  latitude: 34.023827,
  longitude: -118.49251
};
factual.resolve(input, helper.output);
