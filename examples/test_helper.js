var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

module.exports = {
  factual: factual,
  output: function (err, res) {
    process.stdout.write(err ? 'F' : '.');
  }
}
