"use strict";

const Greetings = require('./Greetings');

// Event wrapper for Amazon API Gateway

exports.handler = async (event, context) => {

    function buildResponse(message) {
        const responseBody = {
            message: message
        };
        const response = {
            statusCode: 200,
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(responseBody)
        };
        console.log('response: ' + JSON.stringify(response));
        return response;
    }

    console.log('request: ' + JSON.stringify(event));

    let name;
    if (event.queryStringParameters) {
        name = event.queryStringParameters.name;
    }
    
    return buildResponse(Greetings.greetingsFor(name));
};
