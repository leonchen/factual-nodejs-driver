var auth = require('./auth');
var Factual = require('../factual-api');

var factual = new Factual(auth.key, auth.secret);

factual.table('places').schema().onResponse(function (res) {
  console.log(res);
});
