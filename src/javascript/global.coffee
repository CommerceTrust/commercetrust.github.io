# Browserify entry point for the global.js bundle (yay CoffeeScript!)

console.log 'global.js loaded!'

#$ = require("jquery")
nav = require "./nav"
subscribe = require "./subscribe"
lazyloader = require "./lazyloader"
