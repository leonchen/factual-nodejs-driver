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

  request: function (path, query, cb) {
    var url = FACTUAL_API_BASE_URI + path;
    url += query ? "?" + qs.stringify(query) : "";
    if (this.debug) console.log(url);
    this.oauth.get(url, null, null, cb);
  }
};


module.exports = Requester;
