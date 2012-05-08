var Query = function (q) {
  if (q) this.load(q);
};

Query.prototype = {
  load: function (q) {
    if (q.search) this._search = q.search;
    if (q.filters) this.setFilters(q.filters);
    if (q.geo) this._geo = q.geo;
    if (q.select) this._select = q.select;
    if (q.sorts) this._sorts = q.sorts; 
    if (q.limit) this._limit = q.limit;
    this._offset = q.offset || 0;
  },

  readQuery: function () {
    var query = {include_count: true};
    if (this._search) query.q = this._search;
    if (this._filters) query.filters = JSON.stringify(this._filters.length == 1 ? this._filters[0] : {"$and": this._filters});
    if (this._geo) query.geo = JSON.stringify(this._geo);
    if (this._select) query.select = this._select;
    if (this._limit) query.limit = this._limit;
    if (this._offset) query.offset = this._offset;
    if (this._sorts) query.sort = this.getSortQuery(); 

    return query;
  },

  facetsQuery: function () {
    var query = {include_count: true};
    query.select = this._select;
    if (this._filters) query.filters = JSON.stringify(this._filters.length == 1 ? this._filters[0] : {"$and": this._filters});
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
    if (!this._filters) this._filters = []; 
    this._filters.push(filter);
    return this;
  },

  setFilters: function (filters) {
    this._filters = [filters];
    return this;
  },

  clearFilters: function () {
    this._filters = null;
    return this;
  },

  ascSort: function (field) {
    if (!this._sorts) this._sorts = {};
    this._sorts[field] = 'asc';
    return this;
  },

  descSort: function (field) {
    if (!this._sorts) this._sorts = {};
    this._sorts[field] = 'desc';
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

  clearSorts: function () {
    this._sorts = null;
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
  }
};

module.exports = Query;
