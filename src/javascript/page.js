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
