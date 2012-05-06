var qs    = require('querystring');
var OAuth = require('oauth').OAuth;

var FACTUAL_API_BASE_URI = 'http://api.v3.factual.com';


var Requester = function (key, secret) {
  this.initialize(key, secret);
};

Requester.prototype = {
  initialize: function (key, secret) {
    this.oauth = new OAuth(null, null, key, secret, '1.0', null, 'HMAC-SHA1');
  },

  request: function (path, query, cb) {
    var url = FACTUAL_API_BASE_URI + path;
    url += query ? "?" + qs.stringify(query) : "";
    this.oauth.get(url, null, null, cb);
  }
};


module.exports = Requester;
