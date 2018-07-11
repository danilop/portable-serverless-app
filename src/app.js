"use strict";

const Greetings = require('./Greetings');

// Use Express

const express = require('express')
const app = express()

function buildResponse(message) {
    const response = {
        message: message
    };
    console.log('response: ' + JSON.stringify(response))
    return response;
}

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(
        buildResponse(
            Greetings.greetingsFor(req.query.name)
        )
    );
})

const server = app.listen(process.env.PORT || 3000,
    () => console.log('Listening on port ' + server.address().port));

module.exports = app; // for testing