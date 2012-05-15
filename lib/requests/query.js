var Filters = require('./filters');

var Query = function (q) {
  this._sorts = {};
  this._filters = [];
  if (q) this.load(q);
};

Query.prototype = {
  RowFilter: Filters.RowFilter,
  AndFilter: Filters.AndFilter,
  OrFilter: Filters.OrFilter,

  load: function (q) {
    if (q.search) this._search = q.search;
    if (q.filters) this.setFilters(this.parseFilters(q.filters));
    if (q.geo) this._geo = q.geo;
    if (q.select) this._select = q.select;
    if (q.sorts) this._sorts = q.sorts; 
    if (q.limit) this._limit = q.limit;
    this._offset = q.offset || 0;
  },

  readQuery: function () {
    var query = {include_count: true};
    if (this._search) query.q = this._search;
    if (this._filters.length > 0) {
      var filters = this.getFiltersQuery();
      if (filters) query.filters = filters; 
    } 
    if (this._geo) query.geo = JSON.stringify(this._geo);
    if (this._select) query.select = this._select;
    if (this._limit) query.limit = this._limit;
    if (this._offset) query.offset = this._offset;
    if (this._sorts.length > 0) {
      var sort = this.getSortQuery(); 
      if (sort) query.sort = sort;
    }

    return query;
  },

  facetsQuery: function () {
    var query = {include_count: true};
    query.select = this._select;
    if (this._filters.length > 0) {
      var filters = this.getFiltersQuery();
      if (filters) query.filters = filters; 
    } 
    if (this._geo) query.geo = JSON.stringify(this._geo);
    if (this._limit) query.limit = this._limit;
    if (this._minFacetCount) query.min_count = this._minFacetCount;
    if (this._search) query.q = this._search;
    return query;
  },

  select: function (fields) {
    this._select = fields;
    return this;
  },

  search: function (str) {
    this._search = str;
    return this;
  },

  addFilter: function (filter) {
    this._filters.push(filter);
    return this;
  },

  setFilters: function (filters) {
    this._filters = [filters];
    return this;
  },

  clearFilters: function () {
    this._filters = [];
    return this;
  },

  ascSort: function (field) {
    this._sorts[field] = 'asc';
    return this;
  },

  descSort: function (field) {
    this._sorts[field] = 'desc';
    return this;
  },

  clearSorts: function () {
    this._sorts = {};
    return this;
  },

  limit: function (integer) {
    this._limit = integer;
    return this;
  },

  offset: function (integer) {
    this._offset = integer;
    return this;
  },

  minFacetCount: function (integer) {
    this._minFacetCount = integer;
    return this;
  },

  geoWithin: function (lat, lng, radius) {
    this._geo = {
      "$within": {
        "$circle": {
          "$center": [lat, lng],
          "$meters": radius
        }
      }
    };
    return this;
  },

  getSortQuery: function () {
    var sort = null;
    for (var field in this._sorts) {
      if (!sort) {
        sort = field +":"+ this._sorts[field];
      } else {
        sort += ","+ field +":"+ this._sorts[field];
      }
    }
    return sort;
  },

  parseFilters: function (filters) {
    return Filters.parse(filters);
  },

  getFiltersQuery: function () {
    var filter = new Filters.AndFilter();
    this._filters.forEach(function (f) {
      filter.add(f);
    });
    var q = filter.toQuery();
    return q ? JSON.stringify(q) : null;
  }
};

module.exports = Query;
