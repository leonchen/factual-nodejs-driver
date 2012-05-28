var Table = function (requester, key) {
  this.key = key;
  this.requester = requester;
};

Table.prototype = {

  schema: function (cb) {
    var callback = this.getCallback(function (err, res) {
      err ? cb(err, null) : cb(null, res.view);
    });
    this.requester.get('/t/'+this.key+'/schema', null, callback);
  },

  read: function (query, cb) {
    var callback = this.getCallback(function (err, res) {
      if (err) return cb(err, null);
      var payload = res.data;
      payload.count = res.included_rows;
      payload.total = res.total_row_count;
      return cb(null, payload);
    });
    this.requester.get('/t/'+this.key+'/read', query.readQuery(), callback);
  },

  facets: function (query, cb) {
    var callback = this.getCallback(function (err, res) {
      if (err) return cb(err, null);
      var payload = res.data;
      payload.total = res.total_row_count;
      return cb(null, payload);
    });
    this.requester.get('/t/'+this.key+'/facets', query.facetsQuery(), callback);
  },

  getCallback: function (cb) {
    return function (error, data) {
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
  }

}

module.exports = Table;
