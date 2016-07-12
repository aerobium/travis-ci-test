"use strict";

require("chai").should();
var expect = require('chai').expect;

const {main} = require('./package');
const add = require("./add.js");

describe('add', () => {

    it("should be a function with 1 param", () => {
        add.should
            .be.a("function")
            .have.lengthOf(1)
    });

    it("should return 0 for empty string", () => {
        add("").should.equal(0)
    });

    it("should be up to 3 numbers", () => {
        add("1").should.equal(1);
        add("1,2").should.equal(3);
        add("3,6,1").should.equal(10);
        add("4,8,15,16,23,42").should.equal(108)
    });

    it("should return NaN for incorrect input", () => {
        add("1,\n").should.be.NaN
        add("2\n,5").should.be.NaN
        add("23,4,\n\n\n").should.be.NaN
        add("1,24,,,,,").should.be.NaN
    });

    it("should handle new lines between numbers", () => {
        add("1\n2,3").should.equal(6);
        add("1\n1\n2\n8").should.equal(12)
    });


    it("should allow supplying custom delimiter", () => {
        add("//;\n1;2;3").should.equal(6);
        add("//z\n3z4").should.equal(7)
    });

    it("should throw an exception negatives not allowed and the negative that was passed for calling Add with negative number", () => {
        expect(() => add("-1")).to.throw('negatives not allowed: -1');
        expect(() => add("-1, -2")).to.throw('negatives not allowed: -1,-2');
        expect(() => add("-1,5,29, -2")).to.throw('negatives not allowed: -1,-2')
    });

    it("should ignore numbers bigger than 1000", () => {
        add("2,1001").should.equal(2);
        add("2,1001,3,20050").should.equal(5)
    });

    it("should allow any length of the delimiters", () => {
        add("//[***]\n1***2***3").should.equal(6);
        add("//[%%%]\n1%%%2%%%3").should.equal(6);
        add("//[ololo]\n1ololo2ololo3").should.equal(6);
    });

    it("should allow multiple delimiters", () => {
        add("//[*][%]\n1*2%3").should.equal(6);
    });

    it("should allow multiple delimiters with length longer than one char", () => {
        add("//[***][%%]\n1***2%%3").should.equal(6);
        add("//[***][%%][$%]\n1***2%%3$%4").should.equal(10);
    })
});