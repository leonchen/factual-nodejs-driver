var helper = require('../examples/test_helper');
var factual = helper.factual;
var util = require('util');

var query = factual.query();

var cases = [
  {"name":"starbucks"},
  {"name":{"$search":"starbucks"}, "locality":{"$in":['los angeles', 'newyork']}},
  {"$and": [ {"locality":{"$in":['los angeles', 'newyork']}}, {"name":{"$search":"starbucks"}} ]},
  {"$or": [ {"$and": [{"locality":{"$in":['los angeles', 'newyork']}}, {"name":{"$search":"starbucks"}}]}, {"$and": [{"locality":"上海市"}, {"name":{"$search":"星巴克"}}]} ]}
];

cases.forEach(function (c) {
  console.log(util.inspect(c, false, null) + "\n ======> \n" + util.inspect(query.parseFilters(c).toQuery(), false, null) + "\n--------------------");

});
