const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const nock = require('nock');
const response = require('./response');
const app = require('../app')

//nock.disableNetConnect();

describe('Unit testing the / route', function () {

  // beforeEach(() => {
  //   nock(/.*/)
  //     .get(/.*/)
  //     .reply(200, response);
  // });

  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });

  // it('should return OK status', function () {
  //   return request(app)
  //     .get('/')
  //     .then(function (response) {
  //       assert.equal(response.status, 200)
  //     })
  // });

  // it('Get data', () => {
  //   return request(app)
  //     .get('/')
  //     .then(function (response) {
  //       expect(response.text).to.contain('ryan.giraud@example.com')
  //     })
  // });
});
