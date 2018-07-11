const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
chai.use(chaiHttp);

it('verifies app correct response without a name', (done) => {
    chai.request(app)
        .get('/')
        .end((err, res) => {
            expect(res.body.message).to.be.equal("Hello World!");
            done();
        });
});

it('verifies app correct response with a name', (done) => {
    chai.request(app)
        .get('/?name=AName')
        .end((err, res) => {
            expect(res.body.message).to.be.equal("Hello AName!");
            done();
        });
});
