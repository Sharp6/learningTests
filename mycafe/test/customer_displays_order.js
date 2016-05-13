"use strict";

var chai = require("chai"), expect = chai.expect;
var sinon = require("sinon");

describe('Customer displays order', function() {
	context("Given that the order is empty", function() {
		it("will show no order items");
		it("will show 0 as the total price");
		it("will only be possible to add a beverage");
	});

	context("Given that the order contains beverages", function() {
		it("will show one item per beverage");
		it("will show the sum of the unit prices as total price");
		it("will be possible to place the order");
		it("will be possible to add a beverage");
		it("will be possible to remove a beverage");
		it("will be possible to change the quantity of a beverage");
	});

	context("Given that the order has pending messages", function() {
		it("will show the pending messages");
		it("there will be no more pending messages");
	});
});