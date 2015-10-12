(function () {
	'use strict';

	$.mockjax ({
		url: '*multi-attrs.php*',
		responseTime: 1,
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		responseText: {
			'123456': {
				name: 'Requestor Name',
				attrs: {
					comm: 4.67,
					pay: 3.57,
					fair: 4.70,
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
					fast: 0.00
				},
				reviews: 5,
				tos_flags: 5
			},
			'345678': '',
			'456789': {
				name: 'Requestor Name',
				reviews: 0,
				tos_flags: 0
			},
			'567890': {
				name: 'Requestor Name',
				attrs: {
					comm: 0,
					pay: 0,
					fair: 0,
					fast: 0
				},
				reviews: 1,
				tos_flags: 0
			}
		}
		// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	});

	$.mockjax ({
		url: '*search.php*',
		responseTime: 1,
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		responseText: {
			reviews: [{
				amzn_requester_id: 12345,
				amzn_requester_name: 'Requestor Name',
				fair: 5,
				fast: 4,
				pay: 3,
				comm: 0,
				text: '',
				created_on: '2014-09-22 14:40:16'
			}]
		}
		// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	});

	QUnit.test ('hello test', function (assert) {
		var done = assert.async ();
		setTimeout (function () {
			var $test = $ ('div.drop_link');

			$test.qtip ('api').options.content.text.call ($test);
			setTimeout (function () {
				$test.qtip ('api').options.content.text.call ($test);
				assert.ok ( 1 === 1, 'Passed!');
				done ();
			}, 50);
		}, 50);
	});
}) ();
