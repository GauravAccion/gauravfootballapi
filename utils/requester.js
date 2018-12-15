var request = require("request");

function makeGetRequestToFootballAPI(params, callback) {
    var options =
    {
        method: 'GET',
        url: 'https://apifootball.com/api/',
        qs: params,
    };
    request(options, function (error, response, body) {
        if (error) {
            callback(new Error(error), null);
        } else {
            callback(null, body);
        }
    });
}

module.exports = {
    makeGetRequestToFootballAPI: makeGetRequestToFootballAPI
};
