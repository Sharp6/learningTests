module.exports = function makeNonDivisibleValidationRule(division, error) {
	return function(n,result) {
		if(n % division === 0) {
			result.push(error);
		}
	}
};