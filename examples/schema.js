var helper = require('./test_helper');
var factual = helper.factual;

factual.table('places').schema(function (error, res) {
  helper.output(error, res);
});
