"use strict";

var test = require("ava");
var getFilterParams = require("./dist").default;

test("title", function (t) {
	var state = {
		currentState: {
			name: ""
		},
		ver: 2,
		apartment: [3],
		type: "project",
		property: [10],
		possession: 1,
		prop_by: [2],
		age: null,
		bathrooms: 4,
		has_gas_pipeline: true,
		has_lift: false,
		has_swimming_pool: false,
		has_parking: false,
		is_gated_community: false,
		has_gym: false,
		min_price: null,
		max_price: 35358255,
		routing_range: null,
		routing_range_type: null,
		sort_key: "relevance",
		sort_order: null,
		base: [{
			type: "POLY",
			uuid: "9ccec98ea07c105ca41c",
			label: "Ghitorni"
		}, {
			type: "POLY",
			uuid: "c4cccc73497756009e56",
			label: "Sector 4"
		}],
		collection_ids: [],
		s: "m",
		qv_resale_id: null,
		qv_project_id: null,
		routeType: "search",
		secondaryKeys: {
			np_offset: null,
			resale_offset: null,
			np_total_count: null,
			resale_total_count: null,
			p: 5,
			results_per_page: 60
		},
		filterReflected: true,
		city_uuid: "526acdc6c33455e9e4e9"
	};

	var expected = {
		apartment_type_id: [3],
		bldng: [],
		city_uuid: "526acdc6c33455e9e4e9",
		contact_person_id: [2],
		has_gas_pipeline: true,
		max_poss: 1,
		max_price: 35358255,
		number_of_toilets: 4,
		p: 5,
		poly: ["9ccec98ea07c105ca41c", "c4cccc73497756009e56"],
		property_type_id: [10],
		results_per_page: 60,
		routeType: "search",
		s: "m",
		show_aggregations: false,
		sort_key: "relevance",
		type: "project"
	};

	t.deepEqual(getFilterParams(state), expected);
});