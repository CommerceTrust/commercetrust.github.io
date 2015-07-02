// Browserify entry point for the page.js bundle (yay JavaScript!)

// Add date

var today = new Date(),
    year = today.getFullYear();

$('.footer-copyright__box').prepend("<small>&copy;"+ year +" Commerce Bancshares, Inc.</small>");

console.log('page.js loaded!');
