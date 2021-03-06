var Requester = require('./lib/requester');
var Requests = require('./lib/requests');

var Factual = function (key, secret) {
  this.requester = new Requester(key, secret);
};

Factual.prototype = {

  startDebug: function () {
    this.requester.startDebug();
  },

  stopDebug: function () {
    this.requester.stopDebug();
  },

  query: function (query) {
    return new Requests.query(query);
  },

  table: function (tableKey) {
    return new Requests.table(this.requester, tableKey);
  },

  crosswalk: function (entity, cb) {
    return Requests.crosswalk(this.requester, entity, cb);
  },

  resolve: function (input, cb) {
    return Requests.resolve(this.requester, input, cb);
  },

  get: function () {
    return this.requester.get.apply(this.requester, arguments);
  },

  post: function () {
    return this.requester.post.apply(this.requester, arguments);
  }

};

module.exports = Factual;
