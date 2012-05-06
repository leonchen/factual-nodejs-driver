var http = require('http');
var qs   = require('querystring');

var Read = function (table) {
  this.table = table;
};

Read.prototype = {
  onResponse: function (cb) {
    var action = 'read';
    var query = this.getQuery();
    this.table.request(action, query, cb);
  },

  getQuery: function () {
    var query = {include_count: true};
    if (this.search) query.q = this.search;
    if (this.filters) query.filters = filters.length == 1 ? filters[0] : {"$and": filters};
    if (this.geo) query.geo = geo;
    if (this.select) query.select = this.select;
    if (this.limit) query.limit = this.limit;
    if (this.page) query.offset = (this.limit || 0) * (this.page - 1);
    if (this.offset) query.offset = this.offset;
    if (this.sorts) query.sort = this.getSortQuery(); 

    return query;
  },

  search: function (str) {
    this.search = str;
    return this;
  },

  addFilter: function (filter) {
    if (!this.filters) this.filters = []; 
    this.filters.push(filter);
    return this;
  },

  setFilters: function (filters) {
    this.filters = filters;
    return this;
  },

  clearFilters: function () {
    this.filters = null;
    return this;
  },

  ascSort: function (field) {
    if (!this.sorts) this.sorts = {};
    this.sorts[field] = 'asc';
    return this;
  },

  descSort: function (field) {
    if (!this.sorts) this.sorts = {};
    this.sorts[field] = 'desc';
    return this;
  },

  getSortQuery: function () {
    var sort = null;
    for (var field in this.sorts) {
      if (!sort) {
        sort = field +":"+ this.sorts[field];
      } else {
        sort += ","+ field +":"+ this.sorts[field];
      }
    }
    return sort;
  },

  clearSorts: function () {
    this.sorts = null;
    return this;
  },

  limit: function (integer) {
    this.limit = integer;
    return this;
  },

  page: function (integer) {
    this.page = integer;
    return this;
  },

  offset: function (integer) {
    this.offset = integer;
    return this;
  },

  geoContains: function (lat, lng, radius) {
    this.geo = {
      "$contains": {
        "$circle": {
          "$center": [lat, lng],
          "$meters": radius
        }
      }
    };
    return this;
  }

};

module.exports = Read;
