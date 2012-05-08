// schema api doc:
// http://developer.factual.com/display/docs/Core+API+-+Schema

var helper = require('./test_helper');
var factual = helper.factual;

factual.table('places').schema(helper.output);
