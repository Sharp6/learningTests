module.exports = function nonPositiveValidationRule(n, result) {
	if(n <= 0)
		result.push('error.nonpositive');
};