let should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  path = require('path');

let config = require('../app_api/config/config').config;

let userData = {
  userName: 'testuser1',
  password: 'passwordtest1'
};

let newTokens = [];
let createdTodo = {};

describe('Routing', () => {
  let url = 'http://localhost:3000';

  describe('Todo', () => {
    //login the user
    it('should login a valid user', (done) => {
      request(url)
        .post('/api/user/authenticate')
        .send(userData)
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

    describe('Create todo', () => {
      // create a todo
      it('should create a new todo', (done) => {
        request(url)
          .post('/api/todo/create')
          .field('token', newTokens[0].token)
          .field('text', 'New todo from test test')
          .field('completed', 'false')
          .field('expiary', 'Fri Sep 02 2016 18:29:30 GMT+0530 (IST)')
          .attach('image', path.join(__dirname, 'testpic.jpg'))
          .end((err, res) => {
            res.status.should.be.equal(201);
            createdTodo = res.body;
            done();
          });
      });
    });

    describe('Get todos', () => {
      // get the single todo
      it('should get the single todo created', (done) => {
        let getUrl = '/api/todo/single/' + createdTodo._id
        request(url)
          .get(getUrl)
          .send({
            token: newTokens[0].token
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            res.body.text.should.be.equal('New todo from test test');
            done();
          });
      });

      // get user todo list
      it('should get the user todo list', (done) => {
        let getUrl = '/api/todo/list'
        request(url)
          .get(getUrl)
          .send({
            token: newTokens[0].token
          })
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            res.body.length.should.above(0);
            done();
          });
      });

      // get an invalid todo
      it('should not get any data using invalid todo id', (done) => {
        let getUrl = '/api/todo/single/53hfusd8828ihfjnsdkv89'
        request(url)
          .get(getUrl)
          .send({
            token: newTokens[0].token
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

    describe('Update todo', () => {
      // update the todo image only
      it('should update the image of newly created todo', (done) => {
        let updateUrl = '/api/todo/update/' + createdTodo._id
        request(url)
          .put(updateUrl)
          .field('token', newTokens[0].token)
          .attach('image', path.join(__dirname, 'testpic2.jpg'))
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            res.body.file.path.should.equal(createdTodo.file.path);
            createdTodo = res.body;
            done();
          });
      });

      // update the todo text
      it('should update the text of newly created todo', (done) => {
        let updateUrl = '/api/todo/update/' + createdTodo._id
        request(url)
          .put(updateUrl)
          .field('token', newTokens[0].token)
          .field('text', 'New todo from test updated!!')
          .field('completed', 'true')
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equal(200);
            createdTodo = res.body;
            res.body.text.should.be.equal('New todo from test updated!!');
            res.body.completed.should.be.equal(true);
            done();
          });
      });

      // update a todo without auth token
      it('should not update any todo without auth token', (done) => {
        let updateUrl = '/api/todo/update/' + createdTodo._id
        request(url)
          .put(updateUrl)
          .field('text', 'New todo from test updated!!')
          .field('completed', 'true')
          .end((err, res) => {
            if (err) {
              throw err;
            }
            res.status.should.be.equalOneOf(403, 401)
            done();
          });
      });
    });

    describe('Delete todo', () => {
      // Should delete the todo
      it('should delete the todo created', (done) => {
        let removeUrl = '/api/todo/remove/' + createdTodo._id
        request(url)
          .delete(removeUrl)
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

      // Should not delete any other todo
      it('should not delete any other todo', (done) => {
        let removeUrl = '/api/todo/remove/53hfusd8828ihfjnsdkv89'
        request(url)
          .delete(removeUrl)
          .send({
            token: newTokens[0].token
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
  });
});
