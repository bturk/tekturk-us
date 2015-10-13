# tekturk-us v0.10.0

[![Travis](https://img.shields.io/travis/bturk/tekturk-us.svg)](https://travis-ci.org/bturk/tekturk-us)
[![Coverage Status](https://coveralls.io/repos/bturk/tekturk-us/badge.svg?branch=master&service=github)](https://coveralls.io/github/bturk/tekturk-us?branch=master)
[![Codacy](https://img.shields.io/codacy/ae396700daf243c3804179d24c20f6a4.svg)](https://www.codacy.com/app/bturk/tekturk-us/dashboard)
[![Dependency Status](https://david-dm.org/bturk/tekturk-us.svg?theme=shields.io&style=flat)](https://david-dm.org/bturk/tekturk-us)
[![devDependency Status](https://david-dm.org/bturk/tekturk-us/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/bturk/tekturk-us#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/bturk/tekturk-us.svg)](https://github.com/bturk/tekturk-us/issues)
[![GitHub license](https://img.shields.io/github/license/bturk/tekturk-us.svg)](https://github.com/bturk/tekturk-us/blob/master/LICENSE-MIT)

tekturk is intended to be a framework to help workers on Amazon's Mechanical Turk system.

tekturk-us is a Greasemonkey/Tapermonkey user script to improve Amazons's site.

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

## Goals

 * Overridable settings (rating colors, etc)
 * HIT Database
 * HIT Statistics
 * HIT Export

## Resources

* [Source Repository](https://github.com/bturk/tekturk-us)

## Development Dependencies:

 * [jQuery](https://jquery.com/)
 * [Tapermonkey](https://tampermonkey.net/)
 * [Greasemonkey](http://www.greasespot.net/)
 * [Node.js](https://nodejs.org/en/)
 * [Grunt](http://gruntjs.com/)
 * [JSHint](http://jshint.com/)
 * [JSCS](http://jscs.info/)
 * [JSDoc](http://usejsdoc.org/)
 * [QUnit](http://qunitjs.com/)

## Creators

**Robert E. Adams**

 * <https://github.com/bturk/>

## Copyright and license

Code and documentation copyright 2011-2015 Robert E. Adams. Released under [the MIT license](https://github.com/bturk/tekturk-us/blob/master/LICENSE-MIT).
