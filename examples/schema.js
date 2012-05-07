var helper = require('./test_helper');
var auth = require('./auth');
var Factual = require('../factual-api');

var factual = new Factual(auth.key, auth.secret);

factual.table('places').schema(function (error, res) {
  helper.output(error, res);
});
