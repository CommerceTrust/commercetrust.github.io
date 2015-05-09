# Browserify entry point for the global.js bundle (yay CoffeeScript!)

console.log 'global.js loaded!'

$ = require("jquery")
# jmobile = require('./vendor/jquery.mobile.custom.min')

#jQuery(document).ready ($) ->

#if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well

#move nav element position according to window width

#mobile - open lateral menu clicking on the menu icon

#open search form

#close lateral menu on mobile

#prevent default clicking on direct children of .cd-primary-nav

#open submenu

#desktop version only

#submenu items - go back link
closeNav = ->
  $(".cd-nav-trigger").removeClass "nav-is-visible"
  $(".cd-main-header").removeClass "nav-is-visible"
  $(".cd-primary-nav").removeClass "nav-is-visible"
  $(".has-children ul").addClass "is-hidden"
  $(".has-children a").removeClass "selected"
  $(".moves-out").removeClass "moves-out"
  $(".cd-main-content").removeClass("nav-is-visible").one "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", ->
    $("body").removeClass "overflow-hidden"

toggleSearch = (type) ->
  if type is "close"

    #close serach
    $(".cd-search").removeClass "is-visible"
    $(".cd-search-trigger").removeClass "search-is-visible"
    $(".cd-overlay").removeClass "search-is-visible"
  else

    #toggle search visibility
    $(".cd-search").toggleClass "is-visible"
    $(".cd-search-trigger").toggleClass "search-is-visible"
    $(".cd-overlay").toggleClass "search-is-visible"
    $(".cd-search").find("input[type=\"search\"]").focus()  if $(window).width() > MqL and $(".cd-search").hasClass("is-visible")
    (if ($(".cd-search").hasClass("is-visible")) then $(".cd-overlay").addClass("is-visible") else $(".cd-overlay").removeClass("is-visible"))
checkWindowWidth = ->

  #check window width (scrollbar included)
  e = window
  a = "inner"
  unless "innerWidth" of window
    a = "client"
    e = document.documentElement or document.body
  if e[a + "Width"] >= MqL
    true
  else
    false
moveNavigation = ->
  navigation = $(".cd-nav")
  desktop = checkWindowWidth()
  if desktop
    navigation.detach()
    navigation.insertBefore ".cd-header-buttons"
  else
    navigation.detach()
    navigation.insertAfter ".cd-main-content"
MqL = 1170
moveNavigation()
$(window).on "resize", ->
  (if (not window.requestAnimationFrame) then setTimeout(moveNavigation, 300) else window.requestAnimationFrame(moveNavigation))

$(".cd-nav-trigger").on "click", (event) ->
  event.preventDefault()
  if $(".cd-main-content").hasClass("nav-is-visible")
    closeNav()
    $(".cd-overlay").removeClass "is-visible"
  else
    $(this).addClass "nav-is-visible"
    $(".cd-primary-nav").addClass "nav-is-visible"
    $(".cd-main-header").addClass "nav-is-visible"
    $(".cd-main-content").addClass("nav-is-visible").one "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", ->
      $("body").addClass "overflow-hidden"

    toggleSearch "close"
    $(".cd-overlay").addClass "is-visible"

$(".cd-search-trigger").on "click", (event) ->
  event.preventDefault()
  toggleSearch()
  closeNav()

$(".cd-overlay").on "swiperight", ->
  if $(".cd-primary-nav").hasClass("nav-is-visible")
    closeNav()
    $(".cd-overlay").removeClass "is-visible"

$(".nav-on-left .cd-overlay").on "swipeleft", ->
  if $(".cd-primary-nav").hasClass("nav-is-visible")
    closeNav()
    $(".cd-overlay").removeClass "is-visible"

$(".cd-overlay").on "click", ->
  closeNav()
  toggleSearch "close"
  $(".cd-overlay").removeClass "is-visible"

$(".cd-primary-nav").children(".has-children").children("a").on "click", (event) ->
  event.preventDefault()

$(".has-children").children("a").on "click", (event) ->
  event.preventDefault()  unless checkWindowWidth()
  selected = $(this)
  if selected.next("ul").hasClass("is-hidden")
    selected.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".has-children").parent("ul").addClass "moves-out"
    selected.parent(".has-children").siblings(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass "selected"
    $(".cd-overlay").addClass "is-visible"
  else
    selected.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".has-children").parent("ul").removeClass "moves-out"
    $(".cd-overlay").removeClass "is-visible"
  toggleSearch "close"

$(".go-back").on "click", ->
  $(this).parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass "moves-out"
