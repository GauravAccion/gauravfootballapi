'use strict';


/**
 * get standings information
 *
 * action String what action need to be performed
 * aPIkey String The provided api key
 * returns Countries
 **/
const requester = require('../utils/requester');
const constants = require('../utils/constants');
let countries = [];
exports.getStandings = function (action, apiKey) {
  return new Promise(function (resolve1, reject1) {
    return new Promise(function (resolve, reject) {


      let params = {
        action: constants.GET_COUNTRIES,
        APIkey: constants.API_KEY
      };
      requester.makeGetRequestToFootballAPI(params, function (err, response) {
        if (response) {
          resolve(JSON.parse(response));
        } else {
          reject(err);
        }
      });
    }).then(function (response) {

      // For Finding leagues of countries
      let PromiseArray = [];
      response.forEach(element => {
        let promiseObject = {
          action: constants.GET_LEAGUE,
          APIkey: constants.API_KEY,
          country_id: element.country_id
        };
        let P = new Promise(function (resolve, reject) {
          requester.makeGetRequestToFootballAPI(promiseObject, function (err, response) {
            if (response) {
              resolve(JSON.parse(response));
            } else {
              reject(err);
            }
          });
        });
        PromiseArray.push(P);
      });
      Promise.all(PromiseArray).then(values => {
        for (let index = 0; index < values.length; index++) {
          countries.push(values[index][0]);
        }
        return (countries);
      }).then(function (countries) {
        // For Finding standings of countries
        let PromiseArray = [];
        countries.forEach(element => {
          let promiseObject = {
            action: constants.GET_STANDINGS,
            APIkey: constants.API_KEY,
            league_id: element.league_id
          };
          let P = new Promise(function (resolve, reject) {
            requester.makeGetRequestToFootballAPI(promiseObject, function (err, response) {
              if (response) {
                resolve(JSON.parse(response));
              } else {
                reject(err);
              }
            });
          });
          PromiseArray.push(P);
        });
        Promise.all(PromiseArray).then(values1 => {
          let team_info = [];
          let countriesReplica = countries;
          for (let index = 0; index < countries.length; index++) {
            values1.forEach(value1 => {
              if (countries[index].league_id === value1[0].league_id) {
                value1.forEach(element => {
                  var obj = {
                    team_name: element.team_name,
                    overall_league_position: element.overall_league_position
                  };
                  team_info.push(obj);
                });
                countriesReplica[index]["team_info"] = team_info;
                team_info = [];
              } else if (countries[index].league_id === value1[1].league_id) {
                value1.forEach(element => {
                  var obj = {
                    team_name: element.team_name,
                    overall_league_position: element.overall_league_position
                  };
                  team_info.push(obj);

                });
                countriesReplica[index]["team_info"] = team_info;
                team_info = [];
              }
            });

          };
          // Final value  
          let examples1 = [];
          countriesReplica.forEach(country => {
          
            let examples = {
              "Team_info": country.team_info,
              "League_Name": country.league_name,
              "Country_Name": country.country_name,
              "League_ID": country.league_id,
              "country_ID": country.country_id
            };
            examples1.push(examples);
          });
          resolve1(examples1);
        });
      });


    });

  });
}
