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

  get: function () {
    var args = this.parseRequestArgs(arguments);
    args.method = 'get';
    return this.request(args);
  },

  post: function () {
    var args = this.parseRequestArgs(arguments);
    args.method = 'post';
    return this.request(args);
  },

  put: function () {
    var args = this.parseRequestArgs(arguments);
    args.method = 'put';
    return this.request(args);
  },

  delete: function () {
    var args = this.parseRequestArgs(arguments);
    args.method = 'delete';
    return this.request(args);
  },

  request: function (args) {
    var url = args.path.match(/^\//) ? FACTUAL_API_BASE_URI + args.path : args.path;
    var self = this;
    var callback = function (error, res) {
      if (self.debug) {
        console.log('|DEBUG| request method:', args.method);
        console.log('|DEBUG| request uri:', url);
        if (!self.urlRequest(args.method)) console.log('|DEBUG| data:', args.query);
        console.log('|DEBUG| raw response:', res);
      }
      args.callback(error, res);
    };

    if (this.urlRequest(args.method)) {
      if (args.query) {
        var connector = url.match(/\?/) ? '&' : '?';
        url += connector + args.query;
      }
      this.oauth[args.method].call(this.oauth, url, null, null, callback);
    } else {
      this.oauth[args.method].call(this.oauth, url, null, null, args.query, callback);
    }
  },

  parseRequestArgs: function (args) {
    var req = {};
    req.path = args[0];
    // arguments: url, callback
    if (args.length == 2) {
      req.query = null;
      req.callback = args[1];
      return req;
    }
    // arguments: path + query + callback
    if (args.length == 3) {
      var query = args[1];
      if (query instanceof Object) {
        // stringify object parameters
        var stringifiedQuery = {};
        for (var p in query) stringifiedQuery[p] = (query[p] instanceof Object) ? JSON.stringify(query[p]) : query[p];
        req.query = qs.stringify(stringifiedQuery);
      } else {
        req.query = query;
      }
      req.callback = args[2];
      return req;
    }
    throw("Invalid arguments, should either be (url, callback) or (path, query, callback).");
  },

  urlRequest: function (method) {
    return (method == 'get' || method == 'delete'); 
  },
};


module.exports = Requester;
