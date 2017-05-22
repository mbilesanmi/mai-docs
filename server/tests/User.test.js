import expect from "expect.js";
import Sequelize from "sequelize";
const env = process.env.NODE_ENV || 'test';
const config = require('../config/config.json')[env];

// const sequelize = new Sequelize(, {logging: false});
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

import UserModel from "../models/user";
import userService from "../controllers/user";
 
describe("userService", function () {
    var mockResponse = function (callback) { return { send: callback }; };
    var newUser = { username: "Johne", password:"imjohne" };
 
    beforeEach(function (done) {
        sequelize.sync({ force: true}).success(function () { done(); });
    });
 
    it("should find created users", function (done) {
        //arrange
        model.User.create(newUser).success(function () {
            //act
            userService.get({}, mockResponse(function (data) {
                //assert
                expect(data[0].username).to.eql(newUser.username);
                done();
            }))
        })
    });
    it("should create user", function (done) {
        //arrange
        var req = { body: newUser };
        //act
        userService.create(req, mockResponse(function (statusCode) {
            //assert
            expect(statusCode).to.eql(200);
            done();
        }))
    });
});