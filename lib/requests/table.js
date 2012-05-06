var Read = require('./read');
var Schema = require('./schema');

var Table = function (requester, key) {
  this.key = key;
  this.requester = requester;
};

Table.prototype = {
  read: function () {
    return (new Read(this));
  },

  schema: function () {
    return (new Schema(this));
  },

  request: function (action, query, cb) {
    var path = "/t/"+this.key+"/"+action;
    var callback = function (error, data) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        cb(JSON.parse(data));
      }
    };
    this.requester.request(path, query, callback);
  }

}

module.exports = Table;
