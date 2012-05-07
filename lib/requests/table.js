var Table = function (requester, key) {
  this.key = key;
  this.requester = requester;
};

Table.prototype = {
  read: function (query, cb) {
    this.request('read', query.readQuery(), function (err, res) {
      err ? cb(err, null) : cb(null, res.data);
    });
  },

  schema: function (cb) {
    this.request('schema', null, function (err, res) {
      err ? cb(err, null) : cb(null, res.view);
    });
  },

  request: function (action, query, cb) {
    var path = "/t/"+ this.key +"/"+ action;
    var callback = function (error, data) {
      if (error) return cb(error, null);

      try {
        var res = JSON.parse(data);
      } catch (e) { 
        return cb(e, null);
      }

      if (res.status != "ok") {
        cb(res.error_type +":"+ res.message, null);
      } else {
        cb(null, res.response);
      }
    };
    this.requester.request(path, query, callback);
  }

}

module.exports = Table;
