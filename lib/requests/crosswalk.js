var Crosswalk = function (requester, entity, cb) {
  if (!entity.id) return cb('Invalid arguments for crosswalk', null);

  var query = {};
  if (!entity.namespace || entity.namespace == 'factual') {
    query.factual_id = entity.id;
  } else {
    query.namespace_id = entity.id;
    query.namespace = entity.namespace;
  }
  if (entity.only) query.only = entity.only;
  if (entity.limit) query.limit = entity.limit;

  var path = "/places/crosswalk";
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
      cb(null, res.response.data);
    }
  };

  requester.get(path, query, callback);
};

module.exports = Crosswalk;
