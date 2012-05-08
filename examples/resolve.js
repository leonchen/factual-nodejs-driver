var helper = require('./test_helper');
var factual = helper.factual;

var input = {
  name: "huckleberry",
  latitude: 34.023827,
  longitude: -118.49251
};
factual.resolve(input, function (error, res) {
  helper.output(error, res);
});
