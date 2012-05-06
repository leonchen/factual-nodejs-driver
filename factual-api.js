var Requester = require('./lib/requester');
var Requests = require('./lib/requests');

var Factual = function (key, secret) {
  this.initialize(key, secret);
};

Factual.prototype = {

  initialize: function (key, secret) {
    this.requester = new Requester(key, secret);
  },

  table: function (tableKey) {
    return (new Requests.table(this.requester, tableKey));
  },

  crosswalk: function (factualId) {
    return (new Requests.crosswalk(this.requester, factualId));
  },

  resolve: function (input) {
    return (new Requests.resolve(this.requester, input));
  }

};

module.exports = Factual;
