var RowFilter = function () {
  this.field = arguments[0];
  if (arguments.length == 2) {
    this.operator = '$eq';
    this.value = arguments[1];
  } else {
    this.operator = arguments[1];
    this.value = arguments[2];
  }
};
RowFilter.prototype = {
  toQuery: function () {
    var q = {};
    q[this.field] = {};
    q[this.field][this.operator] = this.value;
    return q; 
  }
};


var AndFilter = function () {
  this.operator = '$and';
  this.parseArguments(arguments);
};
AndFilter.prototype = {
  parseArguments: function (arg) {
    this.filters = [];
    if (arg.length == 1 && (arg[0] instanceof Array)) {
      this.filters = arg[0];
    } else {
      for (var idx in arg) {
        this.filters.push(arg[idx]);
      }
    }
  },

  add: function (filter) {
    this.filters.push(filter);
  },

  toQuery: function () {
    var filters = this.filters.map(function (f) { return f ? f.toQuery() : null;}).filter(function (f) { return f; });
    if (filters.length < 1) return null;
    if (filters.length == 1) return filters[0];
    var q = {};
    q[this.operator] = filters;
    return q; 
  }
};

var OrFilter = function () {
  this.operator = '$or';
  this.parseArguments(arguments);
};
OrFilter.prototype = AndFilter.prototype;


var parse = function (obj) {
  var filter = new AndFilter(); 
  for (var k in obj) {
    switch (k) {
      case '$and':
        filter.add(new AndFilter(obj[k].map(function (f) { return parse(f); })));
        break;
      case '$or':
        filter.add(new OrFilter(obj[k].map(function (f) { return parse(f); })));
        break;
      default:
        if (obj[k] instanceof Object) {
          for (var op in obj[k]) filter.add(new RowFilter(k, op, obj[k][op]));
        } else {
          filter.add(new RowFilter(k, obj[k]));
        }
    }
  }
  return filter;
};


module.exports = {
  RowFilter: RowFilter,
  AndFilter: AndFilter,
  OrFilter: OrFilter,
  parse: parse
};
