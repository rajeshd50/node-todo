let should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  mongoose = require('mongoose');

let config = require('../app_api/config/config').config;

let newUserData = {
  userName: 'testuser1',
  password: 'passwordtest1',
  email: 'email1@test.com'
};
let loginDetails = {
  userName: newUserData.userName,
  password: newUserData.password,
};
let newUserId = '';
let newTokens = [];

// test all api related to user
describe('Routing', function() {
  let url = 'http://localhost:3000';

  describe('Account', () => {

    describe('New user registration', () => {

      //Create user test
      it('should create a new user', function(done) {
        request(url)
          .post('/api/user/register')
          .send(newUserData)
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(201);
            res.body.should.have.property('_id').which.is.a.String();
            newUserId = res.body._id;
            done();
          });

      });


      // Create user with same data, should throw error
      it('should not create duplicate user', (done) => {
        request(url)
          .post('/api/user/register')
          .send(newUserData)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(500);
            done();
          });
      });

      // error should throw is password is missing
      it('should throw error is password is missing', (done) => {
        request(url)
          .post('/api/user/register')
          .send({
            userName: 'testfail',
            email: 'test@abc.com'
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(400);
            done();
          });
      });

      // error should throw is userName is missing
      it('should throw error is userName is missing', (done) => {
        request(url)
          .post('/api/user/register')
          .send({
            password: 'testfail',
            email: 'test@abc.com'
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(400);
            done();
          });
      });
    });

    describe('User login', () => {

      // login a valid user
      it('should login a valid user', (done) => {
        request(url)
          .post('/api/user/authenticate')
          .send(loginDetails)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            res.body.should.have.property('token').which.is.a.String();

            res.body.should.have.property('userId').which.is.a.String();

            newTokens.push({
              userId: res.body.userId,
              token: res.body.token
            });
            done();
          });
      });

      // should not login an invalid user
      it('should not login an invalid user', (done) => {
        request(url)
          .post('/api/user/authenticate')
          .send({
            userName: 'sjkdbjsdjhsd',
            password: 'dsdasasasas'
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equalOneOf(403, 401, 404);
            done();
          });
      });
    });

    describe('Logged is user validation', () => {

      // should valid the new token
      it('should validate the new token', (done) => {
        request(url)
          .post('/api/user/validate')
          .send({
            token: newTokens[0].token
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            res.body.should.have.property('message').which.is.a.String();
            done();
          });
      });

      // should invalidate a random token
      it('should invalidate a random token', (done) => {
        request(url)
          .post('/api/user/validate')
          .send({
            token: 'ihisubbsjnsjnxsnxzx'
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equalOneOf(403, 401);
            done();
          });
      });
    });

    describe('Logout user', () => {

      // logout the user
      it('logout the user', (done) => {
        let logoutUrl = '/api/user/logout'
        request(url)
          .get(logoutUrl)
          .send({
            token: newTokens[0].token
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            done();
          });
      });

      // should invalidate the last token
      it('should invalidate the last token', (done) => {
        request(url)
          .post('/api/user/validate')
          .send({
            token: newTokens[0].token
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equalOneOf(403, 401);
            done();
          });
      });
    });
  });
});
