"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (fParams) {
	var stringify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var filterParams = (0, _justExtend2.default)({}, fParams);

	var secondaryKeys = {};
	if (filterParams.secondaryKeys) {
		secondaryKeys = Object.keys(filterParams.secondaryKeys).reduce(function (filteredKeys, key) {
			if (filterParams.secondaryKeys[key] != null) {
				if (typeof filterParams.secondaryKeys[key] === "string") {
					if (filterParams.secondaryKeys[key].length > 0) {
						filteredKeys[key] = filterParams.secondaryKeys[key];
					}
				} else {
					filteredKeys[key] = filterParams.secondaryKeys[key];
				}
			}
			return filteredKeys;
		}, {});
	}

	var filteredKeys = _extends({}, (0, _removeDefaultValues2.default)(filterParams), secondaryKeys);

	var params = {
		show_aggregations: false
	};

	if (filterParams.base && filterParams.base[0] && filterParams.base[0].type !== "EST") {
		delete filterParams.routing_range;
		delete filterParams.routing_range_type;
		delete filterParams.radius;
	}

	if (filterParams?.lat) {
		filterParams.outer_radius =  filterParams.radius
		 delete filterParams.radius
		 delete filteredKeys.poly
	}

	//eslint-disable-next-line
	for (var key in filteredKeys) {
		//eslint-disable-next-line
		if (filteredKeys.hasOwnProperty(key) && filteredKeys[key] !== null) {
			if (key === "collection_ids") {
				params[key] = filteredKeys[key].join(",");
			} else if (key === "base" && !filterParams?.lat ) {
				params = _extends({}, params, getLocation(filteredKeys[key], filteredKeys));
			} else if (key === "age") {
				params = _extends({}, params, getAge(filteredKeys[key]));
			} else if (key === "possession") {
				params = _extends({}, params, getPossession(filteredKeys[key]));
			} else if (key === "apartment" || key === "apartment_types") {
				params.apartment_type_id = filteredKeys[key];
			} else if (key === "prop_by") {
				params.contact_person_id = filteredKeys[key];
			} else if (key === "property") {
				params.property_type_id = filteredKeys[key];
			} else if (key === "bathrooms") {
				params.min_number_of_toilets = filteredKeys[key];
			} else if (key === "builder_id") {
				// only used in events
				params.uuid = filteredKeys[key];
			} 
			else if (key === "rera") {
				params.is_rera_verified = filteredKeys[key];
			}
			else if (key === "image") {
				params.has_cover_image = filteredKeys[key];
			}
			else if (key === "property_details") {
				filteredKeys[key].forEach(item => params[item] = true)
			}
			else if (key !== "ver") {
				params[key] = filteredKeys[key];
			}
		}
	}

	return stringify ? JSON.stringify(params) : params;
};

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _removeDefaultValues = require("./removeDefaultValues");

var _removeDefaultValues2 = _interopRequireDefault(_removeDefaultValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocation(base, filteredKeys) {
	var a = {
		est: [],
		poly: [],
		uuid: [],
		bldng: [],
		region_entity_id: []
	};
	if (base && base.length) {
		base.forEach(function (val) {
			if (val.type === "EST" && a.est.length <= 5) {
				a.est = [val.uuid];
			} else if (val.type === "POLY" && a.poly.length <= 5) {
				a.poly.push(val.uuid);
			} else if (val.type === "DEV" && a.uuid.length <= 5) {
				a.uuid.push(val.uuid);
				a.city_select_uuid = filteredKeys.city_uuid;
			} else if (val.type === "BUILDING" && a.bldng.length <= 5) {
				a.bldng.push(val.uuid);
			} else if (val.type === "project" && a.region_entity_id.length <= 5) {
				a.region_entity_id.push(val.uuid);
			}
		});
	}

	if (!a.est.length || filterParams.lat) delete a.est;
	if (!a.poly.length || filterParams.lat) delete a.poly;
	if (!a.uuid.length) delete a.uuid;
	if (!a.bldng.length) delete a.building;
	if (!a.region_entity_id.length) delete a.region_entity_id;

	return a;
}

function getAge(age) {
	var minAge = void 0;
	var maxAge = void 0;
	if (age === 11) {
		maxAge = -10;
	} else {
		minAge = -age;
	}

	var a = {};

	if (minAge !== undefined) a.min_age = minAge;
	if (maxAge !== undefined) a.max_age = maxAge;

	return a;
}

function getPossession(possession) {
	var minPoss = void 0;
	var maxPoss = void 0;
	if (possession === 4) {
		minPoss = 3;
	} else if (possession === 0) {
		maxPoss = 0;
	} else {
		maxPoss = possession;
	}

	var a = {};
	if (minPoss !== undefined) a.min_poss = minPoss;
	if (maxPoss !== undefined) a.max_poss = maxPoss;

	return a;
}

/**
 * This function takes the values from the listFilter present in store and converts it into
 * filter params that are sent to backend
 * @param filterParams
 * @param stringify
 * @returns {{}}
 */