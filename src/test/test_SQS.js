'use strict';

const app = require('../adapterSQS.js');
const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

describe('Tests index', function () {

    sinon.spy(console, 'log');

    it('verifies SQS correct log without a name', async () => {
        const event = { Records: [{ body: '' }] };
        const context = {};
        const result = await app.handler(event, context);

        expect(result).to.be.an('object');
        expect(console.log).to.have.been.calledWith('{"message":"Hello World!"}');
    });

    it('verifies SQS correct log with a name', async () => {
        const event = { Records: [{ body: 'AName' }] };
        const context = {};
        const result = await app.handler(event, context);

        expect(result).to.be.an('object');
        expect(console.log).to.have.been.calledWith('{"message":"Hello AName!"}');
    });

});

