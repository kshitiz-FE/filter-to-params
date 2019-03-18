'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = removeDefaultValues;

function isEmpty(obj) {
	if (obj == null) {
		return true;
	}

	if (obj === 0) {
		return false
	}

	if (Array.isArray(obj)) {
		return !obj.length;
	}

	if (typeof obj == 'object') {
		return !Object.keys(obj).length;
	}

	return !obj;
}

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
			filters.hasOwnProperty(key) && !(ignoreFilters.indexOf(key) >= 0) && !(0, isEmpty)(filters[key])) {
				fstr[key] = filters[key];
			}
		}
	}
	return fstr;
}