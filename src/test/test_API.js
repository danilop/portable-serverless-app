'use strict';

const app = require('../adapterAPI.js');
const chai = require('chai');
const expect = chai.expect;


describe('Tests index', function () {
    it('verifies API correct response without a name', async () => {
        const event = {};
        const context = {};
        const result = await app.handler(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.a('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.a('string');
        expect(response.message).to.equal('Hello World!');
    });
    it('verifies API correct response with a name', async () => {
        const event = { queryStringParameters: {name: "AName" } };
        const context = {};
        const result = await app.handler(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.a('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.a('string');
        expect(response.message).to.equal('Hello AName!');
    });
});

