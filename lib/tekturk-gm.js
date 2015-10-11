/**
 * tekturkgm namespace
 *
 * @namespace
 */
var tekturkgm = (function () {
	'use strict';

	var _config = {}, _requestors = {};

	/**
	 * Renders a rating line with visual bar indicator
	 *
	 * @private
	 * @memberof tekturkgm
	 * @param {double} rating - Total average rating
	 * @param {boolean=} isFair - True if rating is fairness for more aggressive coloring
	 * @return {string} The HTML marksup for the rating line
	 */
	function _renderBar (rating, isFair) {
		var color;

		switch (parseInt (rating, 10)) {
			case 5: color = 'color_good'; break;
			case 4: color = 'color_good'; break;
			case 3: color = isFair ? 'color_evil' : 'color_ok'; break;
			case 2: color = isFair ? 'color_evil' : 'color_questionable'; break;
			case 1: color = isFair ? 'color_evil' : 'color_evil'; break;
			case 0: color = 'color_unknown'; break;
		}

		return _template ('<%= barTemplate %>', {
			color: color,
			width: Math.round (rating / 5 * _config.barWidth)
		});
	}

	/**
	 * Reads the Turkopticon raring data and renders rating hover boxes
	 *
	 * @private
	 * @memberof tekturkgm
	 * @param {object} data - The Turkopticon rating data
	 */
	function _onTORatingsLoaded (data) {
		$.each (data, function (id, review) {
			var requestor = _requestors [id], color, tot = 0, count = 0, nc = false;
			if (review) {
				requestor.review = review;
				review.attrs = review.attrs || {};
				if (review.name !== requestor.name) {
					requestor.$elements.addClass ('name_changed');
					requestor.$elements.attr ('title', 'Original Name: ' + review.name);
					nc = true;
				}

				if (review.attrs.fair > 0 && review.attrs.fair < 4) {
					color = 'color_evil';
				} else {
					$.each (review.attrs, function (attribute, value) {
						if (value && value > 0) {
							tot += parseFloat (value);
							count++;
						}
					});
					switch (parseInt (tot / count, 10)) {
						case 5: color = 'color_good'; break;
						case 4: color = 'color_good'; break;
						case 3: color = 'color_ok'; break;
						case 2: color = 'color_questionable'; break;
						case 1: color = 'color_evil'; break;
					}
				}

				//TODO smaller report for TurkMaster:  if (elelement.closest ('.watcher_container')

				requestor.content = _template (
					'<%= ratingTemplate.join ("\' + \n\t\t\t\t\t\'") %>', {
					id: id,
					toUrl: _config.toUrl,
					nc: nc ? ' class="named_changed"' : '',
					newName: requestor.name,
					nameLine: nc ? _template ('<%= origNameTemplate %>', {
						toUrl: _config.toUrl + id,
						nc: nc ? ' class="named_changed"' : '',
						oldName: review.name
					}) : '',
					fairBar: _renderBar (review.attrs.fair, true),
					fastBar: _renderBar (review.attrs.fast, false),
					payBar: _renderBar (review.attrs.pay, false),
					commBar: _renderBar (review.attrs.comm, false),
					comm: review.attrs.comm,
					fair: review.attrs.fair,
					fast: review.attrs.fast,
					pay: review.attrs.pay,
					reviewCount: review.reviews,
					// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
					tosFlags: review.tos_flags,
					// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
					amazonName: encodeURIComponent (requestor.name),
					reviewLine: _config.showReviews ? '<li class="reviews">Loading Reviews</li>' : ''
				});
			} else {
				requestor.content = _template (
					'<%= noRatingTemplate.join ("\' + \n\t\t\t\t\t\'") %>', {
					id: id,
					toUrl: _config.toUrl,
					newName: requestor.name,
					amazonName: encodeURIComponent (requestor.name)
				});
			}

			requestor.$elements [_config._insertLocation] (_template ('<%= linkTemplate %>', {
				id: id,
				color: color
			}));
		});

		$ ('div.drop_link').qtip ({
			content: {
				text: _ratingContent
			},
			position: {
				/* jscs:disable requireDollarBeforejQueryAssignment */
				viewport: $ (window)
				/* jscs:enable requireDollarBeforejQueryAssignment */
			},
			style: {
				classes: 'qtip-light qtip-shadow qtip-rounded'
			},
			hide: {
				fixed: true,
				delay: 500
			}
		});
	}

	/**
	 * Loads reviews when showing the ratings view if not already loaded
	 *
	 * @private
	 * @memberof tekturkgm
	 * @param {object} requestor - the requestor to load review for
	 */
	function _loadReview (requestor) {
		$.ajax (_config.reviewUrl + requestor.id, {
			accepts: 'text/json',
			async: true,
			cache: false,
			context: requestor,
			dataType: 'json', /* Only needed because TO returns wrong data type */
			method: 'GET',
			//TODO: on error popdown error from top of screen
			success: _onTOReviewsLoaded
		});
	}

	/**
	 * Reads the Turkopticon raring data and renders rating hover boxes
	*
	 * @private
	 * @memberof tekturkgm
	 * @param {object} data - The Turkopticon rating data
	 */
	function _onTOReviewsLoaded (data) {
		var requestor = this,
			reviewContent = '';

		$.each (data.reviews, function (index, review) {
			reviewContent += _template (
				'<%= reviewTemplate.join ("\' + \n\t\t\t\t\'") %>', {
				fairBar: _renderBar (review.fair, true),
				fastBar: _renderBar (review.fast, false),
				payBar: _renderBar (review.pay, false),
				commBar: _renderBar (review.comm, false),
				comm: review.comm,
				fair: review.fair,
				fast: review.fast,
				pay: review.pay,
				// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
				date: review.created_on,
				// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
				review: review.text
			});
		});

		requestor.reviews = data;
		requestor.content = requestor.content.replace (/Loading Reviews/, reviewContent);
		$ ('ul[data-rid=' + requestor.id + '] li.reviews').html (reviewContent);
	}

	/**
	 * Render a template
	 *
	 * @private
	 * @memberof tekturkgm
	 * @param {string} template - The template render
	 * @param {data} data - The template data
	 * @return {string} - The rendered data
	 */
	function _template (template, data) {
		var re = /{{([^}}]+)?}}/, match = re.exec (template);
		while (match) {
			template = template.replace (match [0], data [match [1]]);
			match = re.exec (template);
		}
		return template;
	}

	/**
	 * Returns tooltip data for a rating
	 *
	 * @private
	 * @memberof tekturkgm
	 * @return {string} The tooltip data to show
	 */
	function _ratingContent () {
		var id = $ (this).attr ('data-rid'),
			requestor = _requestors [id];

		if (!requestor.reviews) {
			_loadReview (requestor);
		}

		return requestor.content;
	}

	return {
		/**
		 * Set the _configuration for tekturkgm
		 *
		 * @public
	 	 * @memberof tekturkgm
		 * @param {object} config - Configuration settings
		 * @return {object} - this for chaining
		 */
		setConfig: function (config) {
			_config = config;
			return this;
		},

		/**
		 * Starts the script
		 *
		 * @public
	 	 * @memberof tekturkgm
		 * @return {object} - this for chaining
		 */
		run: function () {
			var $elements, link;

			$ ('head').append (_template (
					'<%= headerTemplate.join ("\' + \n\t\t\t\t\t\'") %>', {
					maxWidth: _config.barWidth + 185,
					barWidth: _config.barWidth
				}
			));

			$elements = $ ('a[href*=requesterId], input[name=requesterId]');
			$elements.each (function (index, el) {
				var requestorId, id;
				if ('INPUT' === el.nodeName) {
					_config._insertLocation = 'prepend';
					id = el.value;
					if (!(id in _requestors)) {
						_requestors [id] = {
							id: id,
							name: $ ('.capsule_field_text:eq(0)') [0].innerText,
							$elements: $ ('.capsule_field_text:eq(0)')
						};
					}
				} else {
					requestorId = /requesterId=([A-Z,0-9]+)/.exec (el.href);
					if (requestorId && requestorId.length > 1) {
						_config._insertLocation = 'before';
						id = requestorId [1];
						if (id in _requestors) {
							_requestors [id].$elements = _requestors [id].$elements.add (el);
						} else {
							_requestors [id] = {
								id: id,
								name: el.innerText,
								$elements: $ (el)
							};
						}
					}
				}
			});

			link = _config.ratingUrl + $.unique (Object.getOwnPropertyNames (_requestors)).join (',');
			$.ajax (link, {
				accepts: 'text/json',
				async: true,
				cache: false,
				dataType: 'json', /* Only needed because TO returns wrong data type */
				method: 'GET',
				//TODO: on error popdown error from top of screen
				success: _onTORatingsLoaded
			});

			return this;
		}
	};
}) ();

$ (function () {
	'use strict';

	var toBase = 'https://turkopticon.ucsd.edu/';
	tekturkgm.setConfig ({
		toUrl: toBase,
		apiUrl: toBase + 'api/',
		ratingUrl: toBase + 'api/multi-attrs.php?ids=',
		reviewUrl: 'https://jsonp.afeld.me/?url=' + toBase + encodeURIComponent ('api/search.php?field=id&type=start&query='),
		barWidth: 300,
		showReviews: true
	}).run ();
});