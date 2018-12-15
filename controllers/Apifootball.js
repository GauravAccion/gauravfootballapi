'use strict';

var utils = require('../utils/writer.js');
var Apifootball = require('../service/ApifootballService');

module.exports.getStandings = function getStandings (req, res, next) {
  var action = req.swagger.params['action'].value;
  var aPIkey = req.swagger.params['APIkey'].value;
  Apifootball.getStandings(action,aPIkey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
