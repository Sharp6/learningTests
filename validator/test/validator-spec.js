var chai = require('chai'), expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var factoryWithConfiguration = require('../lib/factory');

describe("A validation", function() {

	function expectedToIncludeErrorWhenInvalid(example) {
		var number = example.number, error = example.error;
		it('like ' + number, function() {
			expect(validator(number)).to.include(error);
		});
	}

	var validator, configuration;	
	context('using the default validation rules: ', function() {
		beforeEach(function() {
			configuration = sinon.stub();
			configuration.returns([
				{'type': 'nonPositive'},
				{'type': 'nonDivisible', options: {divisor: 3, error: 'error.three'}},
				{'type': 'nonDivisible', options: {divisor: 5, error: 'error.five'}}
			]);

			var newValidator = factoryWithConfiguration(configuration);
			validator = newValidator('default');
		});

		it('will access the configuration to get the validation rules', function() {
			expect(configuration).to.have.been.calledOnce;
			expect(configuration).to.have.been.calledWithExactly('default');
		});

		it("will return no errors for valid numbers", function() {
			expect(validator(7)).to.be.empty;
		});

		describe("will return error.nonpositive for not strictly positive numbers", function() {
			[
				{number: 0, error: 'error.nonpositive'},
				{number: -2, error: 'error.nonpositive'}
			].forEach(expectedToIncludeErrorWhenInvalid);
		});

		describe("will return error.three for divisible by 3 numbers", function() {
			[
				{number: 3, error: 'error.three'},
				{number: 15, error: 'error.three'}
			].forEach(expectedToIncludeErrorWhenInvalid);
		});

		describe("will return error.five for divisible by 5 numbers", function() {
			[5,15,20,50,100]
			.map(function(testNumber) {
				return {
					number: testNumber,
					error: 'error.five'
				}
			})
			.forEach(expectedToIncludeErrorWhenInvalid);
		});
	});
	
	context('using the alternative validation rules', function() {
		beforeEach(function() {
			configuration = sinon.stub();

			configuration.returns([
				{'type': 'nonPositive'},
				{'type': 'nonDivisible', options: {'divisor': 11, 'error': 'error.eleven'}}
			]);
			
			configuration.callCount = 0;
			var newValidator = factoryWithConfiguration(configuration);
			validator = newValidator('alternative');
		});

		it('will access the configuration to get the validation rules', function() {
			expect(configuration.callCount).to.be.equal(1);
			expect(configuration.calledWithExactly('alternative')).to.be.ok;
		});

		it("will return no errors for valid numbers", function() {
			expect(validator(7)).to.be.empty;
		});

		describe("will return error.eleven for divisible by 11 numbers", function() {
			[11,22,33,55,88]
			.map(function(testNumber) {
				return {
					number: testNumber,
					error: 'error.eleven'
				}
			})
			.forEach(expectedToIncludeErrorWhenInvalid);
		});
	});
});