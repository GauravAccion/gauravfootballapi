'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /apifootball', function() {
    describe('tests for get', function() {
        it('should respond 200 for "Countries standing information"', function() {
            var response = request('get', 'https://localhost/api/apifootball', { 
                'qs': {"action":"tempor","APIkey":"dolore"},
                'headers': {"Content-Type":"application/json","Accept":"application/xml"},
                'time': true
            });
           
            //expect(response).to.have.schema({"type":"object","properties":{"country_ID":{"type":"string"},"Country_Name":{"type":"string"},"League_ID":{"type":"string"},"League_Name":{"type":"string"},"Overall_League_Position":{"type":"string"}},"example":{"Overall_League_Position":"Overall_League_Position","League_Name":"League_Name","Country_Name":"Country_Name","League_ID":"League_ID","country_ID":"country_ID"}});
            return chakram.wait();
        });

        it('should respond 500 for "ServerError"', function() {
            var response = request('get', 'https://localhost/api/apifootball', { 
                'qs': {"action":"ullamco dolor","APIkey":"irure mollit Lorem"},
                'headers': {"Content-Type":"application/json","Accept":"application/xml"},
                'time': true
            });

           
            return chakram.wait();
        });    
    });
});