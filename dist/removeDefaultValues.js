'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = removeDefaultValues;

var _justIsEmpty = require('just-is-empty');

var _justIsEmpty2 = _interopRequireDefault(_justIsEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignoreFilters = ['params', 'secondaryKeys', 'filterReflected', 'currentState'];

function isAmenityOrType(key) {
	return key.indexOf('has_') === 0 || key.indexOf('is_') === 0;
}

/**
 * Decorates the filter object by removing the keys having default values
 * @param filters
 * @param encode
 * @returns {{}}
 */
function removeDefaultValues(filters) {
	var fstr = {};
	//eslint-disable-next-line
	for (var key in filters) {
		if (filters.hasOwnProperty(key)) {
			if (isAmenityOrType(key)) {
				if (filters[key]) fstr[key] = filters[key];
			} else if (
			//eslint-disable-next-line
			filters.hasOwnProperty(key) && !(ignoreFilters.indexOf(key) >= 0) && !(0, _justIsEmpty2.default)(filters[key])) {
				fstr[key] = filters[key];
			}
		}
	}
	return fstr;
}