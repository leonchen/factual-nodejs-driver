var Table = function (requester, key) {
  this.key = key;
  this.requester = requester;
};

Table.prototype = {

  schema: function (cb) {
    this.request('schema', null, function (err, res) {
      err ? cb(err, null) : cb(null, res.view);
    });
  },

  read: function (query, cb) {
    this.request('read', query.readQuery(), function (err, res) {
      if (err) return cb(err, null);
      var payload = res.data;
      payload.count = res.included_rows;
      payload.total = res.total_row_count;
      return cb(null, payload);
    });
  },

  facets: function (query, cb) {
    this.request('facets', query.facetsQuery(), function (err, res) {
      if (err) return cb(err, null);
      var payload = res.data;
      payload.total = res.total_row_count;
      return cb(null, payload);
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
