(function () {
	'use strict';

	$.mockjax ({
		url: '*multi-attrs.php*',
		urlParams: [ 'ids' ],
		responseTime: 1,
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		responseText: {
			'123456': {
				name: 'Requestor Name',
				attrs: {
					comm: 4.67,
					pay: 3.57,
					fair: 2.70,
					fast: 1.92
				},
				reviews: 52,
				tos_flags: 0
			},
			'234567': {
				name: 'Mismatched Name',
				attrs: {
					comm: 2.67,
					pay: 5.00,
					fair: 2.70,
					fast: 2.92
				},
				reviews: 5,
				tos_flags: 5
			},
			'345678': false
		}
		// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	});

	QUnit.test ('hello test', function (assert) {
		var done = assert.async ();
		setTimeout (function () {
			assert.ok ( 1 === 1, 'Passed!');
			done ();
		}, 5);
	});
}) ();
