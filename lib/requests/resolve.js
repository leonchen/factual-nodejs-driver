var Resolve = function (requester, input, cb) {
  var path = "/places/resolve";
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
      var entities = res.response.data;
      cb(null, {
        resolved: (entities.length > 0 && entities[0].resolved ? entities[0] : null),
        entities: entities
      });
    }
  };

  requester.get(path, {values: JSON.stringify(input)}, callback);
};

module.exports = Resolve;
