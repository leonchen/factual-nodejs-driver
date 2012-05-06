var Schema = function (table) {
  this.table = table;
};

Schema.prototype = {
  onResponse: function (cb) {
    var action = 'schema';
    this.table.request(action, null, cb);
  },
};

module.exports = Schema;
