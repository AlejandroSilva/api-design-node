var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function(){
  var theLion = {
    name: 'mufasaa',
    gender: 'male',
    pride: 'mipride',
    age: '11'
  };
  var modifiedLion = {
    name: 'Mr. Mufasa',
    age: 30
  };

  // GET ALL
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  // POST
  it('should create a lion', function (done) {
    request(app)
        .post('/lions')
        .set('Accept', 'application/json')
        .type('json')
        .send(theLion)
        .expect('Content-Type', /json/)
        .end(function (err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.name).to.be.equal(theLion.name);
          expect(resp.body.gender).to.be.equal(theLion.gender);
          expect(resp.body.pride).to.be.equal(theLion.pride);
          expect(resp.body.age).to.be.equal(theLion.age);
          //expect(resp.body).to.be.equal(theLion);
          // equal => fast equal, by reference   {}==={}
          // eql   => deep equal, by properties
          done();
        });
  });

  // GET
  it('should get one lion', function (done){
    request(app)
        .get('/lions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, resp) {
          expect(resp.body).to.be.an('object')
          expect(resp.body.id).to.not.be.a('undefined');
          done();
        })
  });

  // UPDATE
  it('should update a lion', function (done) {
    request(app)
        .put('/lions/1')
        .set('Accept', 'application/json')
        .type('form')
        .send(modifiedLion)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.name).to.be.equal(modifiedLion.name);
          expect(res.body.gender).to.be.equal(theLion.gender);
          expect(res.body.pride).to.be.equal(theLion.pride);
          //expect(res.body.age).to.be.equal(modifiedLion.age);
          done();
        })
  });


  // DELETE
  it('should delete a lion', function (done) {
    request(app)
        .del('/lions/1')
        .set('Accept', 'application/json')
        .type('form')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, resp) {
          expect(resp.body.name).to.be.equal(modifiedLion.name);
          done();
        })
  });

    //beforeEach
    //afterEach
});