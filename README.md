# tekturk-gm v0.10.0

tekturk is intended to be a framework to help workers on Amazon's Mechanical Turk system.

tekturk-gm is a Greasemonkey user script to improve Amazons's site.

## Table of contents

* [Status](#status)
* [Featuers](#current-features)
* [Goals](#goals)
* [Resources](#resources)
* [Creators](#creators)
* [Copyright and license](#copyright-and-license)

## Status

Currently in development status

## Current Features

* Live requestor reviews similar to the Turkopticon user script but with the following additional feature
	* Display reviews directly on the ratings drop down, rather than requiring the user to have an account on or go to Turkopticon to view the reviews
 	* Opens all Turkopticon links in a new tab
 	* Shows Requestor Name in red if it has been changed
 	* Shows new and original name in hover if name has been changed
 	* Shows an "average" rating on the hover link by color (weighted towards fairness) so you don't have to hover to get an overall rating score
 	* More aggressive on the ratings colors (especially for fairness)
 	* Works on more pages
 	* Visual enhancments

### Goals

* User Script:
	 * Provide ability to copy hits to clipboard in a variety of formats for sharing
	 * Overridable settings (rating colors, etc)
 * HIT Database
 * HIT Statistics
 * HIT Export

## Resources

* [Source Repository](https://github.com/bturk/tekturk-gm)

### Development Dependencies:

 * [jQuery](https://jquery.com/)
 * [Tapermonkey](https://tampermonkey.net/)
 * [Node.js](https://nodejs.org/en/)
 * [Grunt](http://gruntjs.com/)
 * [JSHint](http://jshint.com/)
 * [JSCS](http://jscs.info/)
 * [JSDoc](http://usejsdoc.org/)

## Creators

**Robert E. Adams**

 * <https://github.com/bturk/>

## Copyright and license

Code and documentation copyright 2011-2015 Robert E. Adams. Released under [the MIT license](https://github.com/bturk/tekturk-gm/blob/master/LICENSE).
