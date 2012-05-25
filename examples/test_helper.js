var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

module.exports = {
  factual: factual,
  output: function (err, res) {
    console.log(err, res);
    process.stdout.write(err ? 'F' : '.');
  },

  shouldBe: function (got, exp) {
    process.stdout.write(got == exp ? '.' : 'F');
  }
}
