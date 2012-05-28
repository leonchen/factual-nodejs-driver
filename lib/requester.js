var qs    = require('querystring');
var OAuth = require('oauth').OAuth;

var FACTUAL_API_BASE_URI = 'http://api.v3.factual.com';

var Requester = function (key, secret) {
  this.oauth = new OAuth(null, null, key, secret, '1.0', null, 'HMAC-SHA1');
  this.debug = false;
};

Requester.prototype = {

  startDebug: function () {
    this.debug = true;
  },

  stopDebug: function () {
    this.debug = false;
  },

  raw: function () {
    // arguments: url, callback
    if (arguments.length == 2) return this.request(arguments[0], null, arguments[1]);
    // arguments: path + query + callback
    // need to stringify object parameters in query
    var query = arguments[1];
    var stringifiedQuery = {};
    for (var p in query) stringifiedQuery[p] = (query[p] instanceof Object) ? JSON.stringify(query[p]) : query[p];
    return this.request(arguments[0], stringifiedQuery, arguments[2]);
  },

  request: function (path, query, cb) {
    var req = path + (query ? "?" + qs.stringify(query) : "");
    var url = FACTUAL_API_BASE_URI + req;
    var self = this;
    var callback = function (error, res) {
      if (self.debug) {
        console.log('|DEBUG| request:', url);
        console.log('|DEBUG| response:', res);
      }
      cb(error, res);
    };
    this.oauth.get(url, null, null, callback);
  }
};


module.exports = Requester;
