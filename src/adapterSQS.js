"use strict";

const Greetings = require('./Greetings');

// Event wrapper for Amazon SQS

exports.handler = async (event, context) => {

    function buildResponse(message) {
        const response = {
            message: message
        };
        console.log(JSON.stringify(response));
    }

    console.log('event: ' + JSON.stringify(event));

    const records = event.Records;

    for(let record of records) {
        const name = record.body;
        buildResponse(Greetings.greetingsFor(name));
    }

    return {};
};
