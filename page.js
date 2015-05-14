(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({".//javascript/page.js":[function(require,module,exports){
// Browserify entry point for the page.js bundle (yay JavaScript!)

//var $ = require('jquery');

// global.js already contains jQuery, so in our config.js file, we
// are exposing it to other files like this one in the `require` array.
// Also in config.js, jquery is listed in `external` array for this bundle.
// This combination lets this file use the jquery module bundled with
// global.js, instead of including it twice!

var today = new Date(),
    year = today.getFullYear();

$('.footer-copyright__box').prepend("<small>&copy;"+ year +" Commerce Bank, LLC</small>");

console.log('page.js loaded!');

},{}]},{},[".//javascript/page.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0L3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEJyb3dzZXJpZnkgZW50cnkgcG9pbnQgZm9yIHRoZSBwYWdlLmpzIGJ1bmRsZSAoeWF5IEphdmFTY3JpcHQhKVxuXG4vL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIGdsb2JhbC5qcyBhbHJlYWR5IGNvbnRhaW5zIGpRdWVyeSwgc28gaW4gb3VyIGNvbmZpZy5qcyBmaWxlLCB3ZVxuLy8gYXJlIGV4cG9zaW5nIGl0IHRvIG90aGVyIGZpbGVzIGxpa2UgdGhpcyBvbmUgaW4gdGhlIGByZXF1aXJlYCBhcnJheS5cbi8vIEFsc28gaW4gY29uZmlnLmpzLCBqcXVlcnkgaXMgbGlzdGVkIGluIGBleHRlcm5hbGAgYXJyYXkgZm9yIHRoaXMgYnVuZGxlLlxuLy8gVGhpcyBjb21iaW5hdGlvbiBsZXRzIHRoaXMgZmlsZSB1c2UgdGhlIGpxdWVyeSBtb2R1bGUgYnVuZGxlZCB3aXRoXG4vLyBnbG9iYWwuanMsIGluc3RlYWQgb2YgaW5jbHVkaW5nIGl0IHR3aWNlIVxuXG52YXIgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgIHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuXG4kKCcuZm9vdGVyLWNvcHlyaWdodF9fYm94JykucHJlcGVuZChcIjxzbWFsbD4mY29weTtcIisgeWVhciArXCIgQ29tbWVyY2UgQmFuaywgTExDPC9zbWFsbD5cIik7XG5cbmNvbnNvbGUubG9nKCdwYWdlLmpzIGxvYWRlZCEnKTtcbiJdfQ==
