var validatorWith = require('./validator');
var nonPositiveValidationRule = require('./rules/nonPositive');
var nonDivisibleValidationRule = require('./rules/nonDivisible');

var ruleFactoryMap = {
	nonPositive: function() {
		return nonPositiveValidationRule;
	},
	nonDivisible: function(options) {
		return nonDivisibleValidationRule(options.divisor, options.error);
	}
};

function toValidatorRule(ruleDescription) {
	return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
}

module.exports = function(findConfiguration) {
	return function(ruleNameSet) {
		return validatorWith(findConfiguration(ruleNameSet).map(toValidatorRule));
	}
}