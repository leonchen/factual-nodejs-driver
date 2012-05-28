var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

module.exports = {
  factual: factual,
  output: function (err, res) {
    console.log('|DEBUG| error:', err);
    console.log('|DEBUG| response:', res);
    process.stdout.write((err ? 'F' : '.')+"\n\n");
  },

  shouldBe: function (got, exp) {
    process.stdout.write(got == exp ? '.' : 'F');
  }
}
