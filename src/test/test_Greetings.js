'use strict';

const app = require('../Greetings.js');
const chai = require('chai');
const expect = chai.expect;


describe('Tests index', function () {
    it('verifies Greetings correct response without a name', async () => {
        const result = app.greetingsFor();

        expect(result).to.be.a('string');
        expect(result).to.equal('Hello World!');
    });
    it('verifies Greetings correct response with an empty name', async () => {
        const name = '';
        const result = app.greetingsFor(name);

        expect(result).to.be.a('string');
        expect(result).to.equal('Hello World!');
    });
    it('verifies Greetings correct response with a name', async () => {
        const name = 'AName';
        const result = app.greetingsFor(name);

        expect(result).to.be.a('string');
        expect(result).to.equal('Hello AName!');
    });
});

