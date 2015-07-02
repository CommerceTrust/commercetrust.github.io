(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({".//javascript/global.coffee":[function(require,module,exports){
var lazyloader, nav, subscribe;

console.log('global.js loaded!');

nav = require("./nav");

subscribe = require("./subscribe");

lazyloader = require("./lazyloader");



},{"./lazyloader":"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/lazyloader.coffee","./nav":"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/nav.coffee","./subscribe":"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/subscribe.coffee"}],"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/lazyloader.coffee":[function(require,module,exports){
var $article_size, $loadless, $loadmore, more, x;

console.log('lazyloader.js loaded!');

$article_size = $(".card-article__box").size();

x = 3;

more = 3;

$loadmore = $("#loadMore");

$loadless = $("#showLess");

$(".card-article__box:lt(" + x + ")").show();

$loadless.addClass('disabled');

$loadmore.click(function() {
  x = (x + more <= $article_size ? x + more : $article_size);
  $(".card-article__box:lt(" + x + ")").show('slow', function() {
    if ($(".card-article__box:visible").length === $article_size) {
      return $loadmore.addClass('disabled');
    }
  });
  return $loadless.removeClass('disabled');
});

$loadless.click(function() {
  if ($(".card-article__box:visible").length > more) {
    x = (x - more < 0 ? 3 : x - more);
    $(".card-article__box").not(":lt(" + x + ")").hide('slow', function() {
      if ($(".card-article__box:visible").length <= more) {
        return $loadless.addClass('disabled');
      }
    });
    return $loadmore.removeClass('disabled');
  }
});



},{}],"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/nav.coffee":[function(require,module,exports){
var MqL, checkWindowWidth, closeNav, moveNavigation, toggleSearch;

closeNav = function() {
  $(".cd-nav-trigger").removeClass("nav-is-visible");
  $(".cd-main-header").removeClass("nav-is-visible");
  $(".cd-primary-nav").removeClass("nav-is-visible");
  $(".has-children ul").addClass("is-hidden");
  $(".has-children a").removeClass("selected");
  $(".moves-out").removeClass("moves-out");
  return $(".cd-main-content").removeClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
    return $("body").removeClass("overflow-hidden");
  });
};

toggleSearch = function(type) {
  if (type === "close") {
    $(".cd-search").removeClass("is-visible");
    $(".cd-search-trigger").removeClass("search-is-visible");
    return $(".cd-overlay").removeClass("search-is-visible");
  } else {
    $(".cd-search").toggleClass("is-visible");
    $(".cd-search-trigger").toggleClass("search-is-visible");
    $(".cd-overlay").toggleClass("search-is-visible");
    if ($(window).width() > MqL && $(".cd-search").hasClass("is-visible")) {
      $(".cd-search").find("input[type=\"search\"]").focus();
    }
    if ($(".cd-search").hasClass("is-visible")) {
      return $(".cd-overlay").addClass("is-visible");
    } else {
      return $(".cd-overlay").removeClass("is-visible");
    }
  }
};

checkWindowWidth = function() {
  var a, e;
  e = window;
  a = "inner";
  if (!("innerWidth" in window)) {
    a = "client";
    e = document.documentElement || document.body;
  }
  if (e[a + "Width"] >= MqL) {
    return true;
  } else {
    return false;
  }
};

moveNavigation = function() {
  var desktop, navigation;
  navigation = $(".cd-nav");
  desktop = checkWindowWidth();
  if (desktop) {
    navigation.detach();
    return navigation.insertBefore(".cd-header-buttons");
  } else {
    navigation.detach();
    return navigation.insertAfter(".cd-main-content");
  }
};

MqL = 1023;

moveNavigation();

$(window).on("resize", function() {
  if (!window.requestAnimationFrame) {
    return setTimeout(moveNavigation, 300);
  } else {
    return window.requestAnimationFrame(moveNavigation);
  }
});

$(".cd-nav-trigger").on("click", function(event) {
  event.preventDefault();
  if ($(".cd-main-content").hasClass("nav-is-visible")) {
    closeNav();
    return $(".cd-overlay").removeClass("is-visible");
  } else {
    $(this).addClass("nav-is-visible");
    $(".cd-primary-nav").addClass("nav-is-visible");
    $(".cd-main-header").addClass("nav-is-visible");
    $(".cd-main-content").addClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
      return $("body").addClass("overflow-hidden");
    });
    toggleSearch("close");
    return $(".cd-overlay").addClass("is-visible");
  }
});

$(".cd-search-trigger").on("click", function(event) {
  event.preventDefault();
  toggleSearch();
  return closeNav();
});

$(".cd-overlay").on("swiperight", function() {
  if ($(".cd-primary-nav").hasClass("nav-is-visible")) {
    closeNav();
    return $(".cd-overlay").removeClass("is-visible");
  }
});

$(".nav-on-left .cd-overlay").on("swipeleft", function() {
  if ($(".cd-primary-nav").hasClass("nav-is-visible")) {
    closeNav();
    return $(".cd-overlay").removeClass("is-visible");
  }
});

$(".cd-overlay").on("click", function() {
  closeNav();
  toggleSearch("close");
  return $(".cd-overlay").removeClass("is-visible");
});

$(".cd-primary-nav").children(".has-children").children("a").on("click", function(event) {
  return event.preventDefault();
});

$(".has-children").children("a").on("click", function(event) {
  var selected;
  if (!checkWindowWidth()) {
    event.preventDefault();
  }
  selected = $(this);
  if (selected.next("ul").hasClass("is-hidden")) {
    selected.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".has-children").parent("ul").addClass("moves-out");
    selected.parent(".has-children").siblings(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected");
    $(".cd-overlay").addClass("is-visible");
  } else {
    selected.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".has-children").parent("ul").removeClass("moves-out");
    $(".cd-overlay").removeClass("is-visible");
  }
  return toggleSearch("close");
});

$(".go-back").on("click", function() {
  return $(this).parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass("moves-out");
});



},{}],"/Applications/MAMP/htdocs/CommerceBank-GITHUB/commerce-1/src/javascript/subscribe.coffee":[function(require,module,exports){
var $subscribe, $subscribe_box, $subscribe_button, $subscribe_error, $subscribe_input, $subscribe_message, IsEmail;

console.log('subscribe.js loaded!');

$subscribe = $(".cta-subscribe");

$subscribe_box = $subscribe.find(".cta-subscribe__signup");

$subscribe_error = $subscribe.find(".cta-subscribe__error");

$subscribe_input = $subscribe_box.find(".cta-subscribe__input");

$subscribe_button = $subscribe_box.find(".cta-subscribe__button");

$subscribe_message = $subscribe.find(".cta-subscribe__message");

IsEmail = function(email) {
  var regex;
  regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

$subscribe_button.on("click", function() {
  if (IsEmail($subscribe_input.val())) {
    $subscribe_box.fadeOut('fast');
    $subscribe_message.fadeIn('slow');
    return $subscribe_error.hide();
  } else {
    return $subscribe_error.fadeIn('fast');
  }
});



},{}]},{},[".//javascript/global.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL0NvbW1lcmNlQmFuay1HSVRIVUIvY29tbWVyY2UtMS9zcmMvamF2YXNjcmlwdC9nbG9iYWwuY29mZmVlIiwiL0FwcGxpY2F0aW9ucy9NQU1QL2h0ZG9jcy9Db21tZXJjZUJhbmstR0lUSFVCL2NvbW1lcmNlLTEvc3JjL2phdmFzY3JpcHQvbGF6eWxvYWRlci5jb2ZmZWUiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL0NvbW1lcmNlQmFuay1HSVRIVUIvY29tbWVyY2UtMS9zcmMvamF2YXNjcmlwdC9uYXYuY29mZmVlIiwiL0FwcGxpY2F0aW9ucy9NQU1QL2h0ZG9jcy9Db21tZXJjZUJhbmstR0lUSFVCL2NvbW1lcmNlLTEvc3JjL2phdmFzY3JpcHQvc3Vic2NyaWJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0VBLElBQUEsMEJBQUE7O0FBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixDQUFBLENBQUE7O0FBQUEsR0FHQSxHQUFNLE9BQUEsQ0FBUSxPQUFSLENBSE4sQ0FBQTs7QUFBQSxTQUlBLEdBQVksT0FBQSxDQUFRLGFBQVIsQ0FKWixDQUFBOztBQUFBLFVBS0EsR0FBYSxPQUFBLENBQVEsY0FBUixDQUxiLENBQUE7Ozs7O0FDRkEsSUFBQSw0Q0FBQTs7QUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFaLENBQUEsQ0FBQTs7QUFBQSxhQUVBLEdBQWdCLENBQUEsQ0FBRSxvQkFBRixDQUF1QixDQUFDLElBQXhCLENBQUEsQ0FGaEIsQ0FBQTs7QUFBQSxDQUdBLEdBQUksQ0FISixDQUFBOztBQUFBLElBSUEsR0FBTyxDQUpQLENBQUE7O0FBQUEsU0FLQSxHQUFZLENBQUEsQ0FBRSxXQUFGLENBTFosQ0FBQTs7QUFBQSxTQU1BLEdBQVksQ0FBQSxDQUFF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LEtBQUEsR0FBUSwrREFBUixDQUFBO1NBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFYLEVBRlE7QUFBQSxDQWZWLENBQUE7O0FBQUEsaUJBbUJpQixDQUFDLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFNBQUEsR0FBQTtBQUM1QixFQUFBLElBQUcsT0FBQSxDQUFRLGdCQUFnQixDQUFDLEdBQWpCLENBQUEsQ0FBUixDQUFIO0FBQ0UsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixNQUF2QixDQUFBLENBQUE7QUFBQSxJQUNBLGtCQUFrQixDQUFDLE1BQW5CLENBQTBCLE1BQTFCLENBREEsQ0FBQTtXQUVBLGdCQUFnQixDQUFDLElBQWpCLENBQUEsRUFIRjtHQUFBLE1BQUE7V0FLRSxnQkFBZ0IsQ0FBQyxNQUFqQixDQUF3QixNQUF4QixFQUxGO0dBRDRCO0FBQUEsQ0FBOUIsQ0FuQkEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEJyb3dzZXJpZnkgZW50cnkgcG9pbnQgZm9yIHRoZSBnbG9iYWwuanMgYnVuZGxlICh5YXkgQ29mZmVlU2NyaXB0ISlcblxuY29uc29sZS5sb2cgJ2dsb2JhbC5qcyBsb2FkZWQhJ1xuXG4jJCA9IHJlcXVpcmUoXCJqcXVlcnlcIilcbm5hdiA9IHJlcXVpcmUgXCIuL25hdlwiXG5zdWJzY3JpYmUgPSByZXF1aXJlIFwiLi9zdWJzY3JpYmVcIlxubGF6eWxvYWRlciA9IHJlcXVpcmUgXCIuL2xhenlsb2FkZXJcIlxuIiwiY29uc29sZS5sb2cgJ2xhenlsb2FkZXIuanMgbG9hZGVkISdcblxuJGFydGljbGVfc2l6ZSA9ICQoXCIuY2FyZC1hcnRpY2xlX19ib3hcIikuc2l6ZSgpXG54ID0gM1xubW9yZSA9IDNcbiRsb2FkbW9yZSA9ICQoXCIjbG9hZE1vcmVcIilcbiRsb2FkbGVzcyA9ICQoXCIjc2hvd0xlc3NcIilcblxuJChcIi5jYXJkLWFydGljbGVfX2JveDpsdChcIiArIHggKyBcIilcIikuc2hvdygpXG4kbG9hZGxlc3MuYWRkQ2xhc3MoJ2Rpc2FibGVkJylcblxuJGxvYWRtb3JlLmNsaWNrIC0+XG4gIHggPSAoaWYgKHggKyBtb3JlIDw9ICRhcnRpY2xlX3NpemUpIHRoZW4geCArIG1vcmUgZWxzZSAkYXJ0aWNsZV9zaXplKVxuICAkKFwiLmNhcmQtYXJ0aWNsZV9fYm94Omx0KFwiICsgeCArIFwiKVwiKS5zaG93KCdzbG93JywgLT5cbiAgICBpZiAoJChcIi5jYXJkLWFydGljbGVfX2JveDp2aXNpYmxlXCIpLmxlbmd0aCA9PSAkYXJ0aWNsZV9zaXplKVxuICAgICAgI2NvbnNvbGUubG9nICdoZWxsbydcbiAgICAgICRsb2FkbW9yZS5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICAgIClcbiAgJGxvYWRsZXNzLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG5cblxuJGxvYWRsZXNzLmNsaWNrIC0+XG4gIGlmICgkKFwiLmNhcmQtYXJ0aWNsZV9fYm94OnZpc2libGVcIikubGVuZ3RoID4gbW9yZSlcbiAgICB4ID0gKGlmICh4IC0gbW9yZSA8IDApIHRoZW4gMyBlbHNlIHggLSBtb3JlKVxuICAgICQoXCIuY2FyZC1hcnRpY2xlX19ib3hcIikubm90KFwiOmx0KFwiICsgeCArIFwiKVwiKS5oaWRlKCdzbG93JywgLT5cbiAgICAgIGlmICgkKFwiLmNhcmQtYXJ0aWNsZV9fYm94OnZpc2libGVcIikubGVuZ3RoIDw9IG1vcmUpXG4gICAgICAgICRsb2FkbGVzcy5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICAgIClcbiAgICAkbG9hZG1vcmUucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcbiIsIiMgTmF2aWdhdGlvblxuY2xvc2VOYXYgPSAtPlxuICAkKFwiLmNkLW5hdi10cmlnZ2VyXCIpLnJlbW92ZUNsYXNzIFwibmF2LWlzLXZpc2libGVcIlxuICAkKFwiLmNkLW1haW4taGVhZGVyXCIpLnJlbW92ZUNsYXNzIFwibmF2LWlzLXZpc2libGVcIlxuICAkKFwiLmNkLXByaW1hcnktbmF2XCIpLnJlbW92ZUNsYXNzIFwibmF2LWlzLXZpc2libGVcIlxuICAkKFwiLmhhcy1jaGlsZHJlbiB1bFwiKS5hZGRDbGFzcyBcImlzLWhpZGRlblwiXG4gICQoXCIuaGFzLWNoaWxkcmVuIGFcIikucmVtb3ZlQ2xhc3MgXCJzZWxlY3RlZFwiXG4gICQoXCIubW92ZXMtb3V0XCIpLnJlbW92ZUNsYXNzIFwibW92ZXMtb3V0XCJcbiAgJChcIi5jZC1tYWluLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJuYXYtaXMtdmlzaWJsZVwiKS5vbmUgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIC0+XG4gICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MgXCJvdmVyZmxvdy1oaWRkZW5cIlxuXG50b2dnbGVTZWFyY2ggPSAodHlwZSkgLT5cbiAgaWYgdHlwZSBpcyBcImNsb3NlXCJcblxuICAgICNjbG9zZSBzZXJhY2hcbiAgICAkKFwiLmNkLXNlYXJjaFwiKS5yZW1vdmVDbGFzcyBcImlzLXZpc2libGVcIlxuICAgICQoXCIuY2Qtc2VhcmNoLXRyaWdnZXJcIikucmVtb3ZlQ2xhc3MgXCJzZWFyY2gtaXMtdmlzaWJsZVwiXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzIFwic2VhcmNoLWlzLXZpc2libGVcIlxuICBlbHNlXG5cbiAgICAjdG9nZ2xlIHNlYXJjaCB2aXNpYmlsaXR5XG4gICAgJChcIi5jZC1zZWFyY2hcIikudG9nZ2xlQ2xhc3MgXCJpcy12aXNpYmxlXCJcbiAgICAkKFwiLmNkLXNlYXJjaC10cmlnZ2VyXCIpLnRvZ2dsZUNsYXNzIFwic2VhcmNoLWlzLXZpc2libGVcIlxuICAgICQoXCIuY2Qtb3ZlcmxheVwiKS50b2dnbGVDbGFzcyBcInNlYXJjaC1pcy12aXNpYmxlXCJcbiAgICAkKFwiLmNkLXNlYXJjaFwiKS5maW5kKFwiaW5wdXRbdHlwZT1cXFwic2VhcmNoXFxcIl1cIikuZm9jdXMoKSAgaWYgJCh3aW5kb3cpLndpZHRoKCkgPiBNcUwgYW5kICQoXCIuY2Qtc2VhcmNoXCIpLmhhc0NsYXNzKFwiaXMtdmlzaWJsZVwiKVxuICAgIChpZiAoJChcIi5jZC1zZWFyY2hcIikuaGFzQ2xhc3MoXCJpcy12aXNpYmxlXCIpKSB0aGVuICQoXCIuY2Qtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImlzLXZpc2libGVcIikgZWxzZSAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJpcy12aXNpYmxlXCIpKVxuY2hlY2tXaW5kb3dXaWR0aCA9IC0+XG5cbiAgI2NoZWNrIHdpbmRvdyB3aWR0aCAoc2Nyb2xsYmFyIGluY2x1ZGVkKVxuICBlID0gd2luZG93XG4gIGEgPSBcImlubmVyXCJcbiAgdW5sZXNzIFwiaW5uZXJXaWR0aFwiIG9mIHdpbmRvd1xuICAgIGEgPSBcImNsaWVudFwiXG4gICAgZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBvciBkb2N1bWVudC5ib2R5XG4gIGlmIGVbYSArIFwiV2lkdGhcIl0gPj0gTXFMXG4gICAgdHJ1ZVxuICBlbHNlXG4gICAgZmFsc2Vcbm1vdmVOYXZpZ2F0aW9uID0gLT5cbiAgbmF2aWdhdGlvbiA9ICQoXCIuY2QtbmF2XCIpXG4gIGRlc2t0b3AgPSBjaGVja1dpbmRvd1dpZHRoKClcbiAgaWYgZGVza3RvcFxuICAgIG5hdmlnYXRpb24uZGV0YWNoKClcbiAgICBuYXZpZ2F0aW9uLmluc2VydEJlZm9yZSBcIi5jZC1oZWFkZXItYnV0dG9uc1wiXG4gIGVsc2VcbiAgICBuYXZpZ2F0aW9uLmRldGFjaCgpXG4gICAgbmF2aWdhdGlvbi5pbnNlcnRBZnRlciBcIi5jZC1tYWluLWNvbnRlbnRcIlxuXG5NcUwgPSAxMDIzXG5tb3ZlTmF2aWdhdGlvbigpXG4kKHdpbmRvdykub24gXCJyZXNpemVcIiwgLT5cbiAgKGlmIChub3Qgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgdGhlbiBzZXRUaW1lb3V0KG1vdmVOYXZpZ2F0aW9uLCAzMDApIGVsc2Ugd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlTmF2aWdhdGlvbikpXG5cbiQoXCIuY2QtbmF2LXRyaWdnZXJcIikub24gXCJjbGlja1wiLCAoZXZlbnQpIC0+XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgaWYgJChcIi5jZC1tYWluLWNvbnRlbnRcIikuaGFzQ2xhc3MoXCJuYXYtaXMtdmlzaWJsZVwiKVxuICAgIGNsb3NlTmF2KClcbiAgICAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MgXCJpcy12aXNpYmxlXCJcbiAgZWxzZVxuICAgICQodGhpcykuYWRkQ2xhc3MgXCJuYXYtaXMtdmlzaWJsZVwiXG4gICAgJChcIi5jZC1wcmltYXJ5LW5hdlwiKS5hZGRDbGFzcyBcIm5hdi1pcy12aXNpYmxlXCJcbiAgICAkKFwiLmNkLW1haW4taGVhZGVyXCIpLmFkZENsYXNzIFwibmF2LWlzLXZpc2libGVcIlxuICAgICQoXCIuY2QtbWFpbi1jb250ZW50XCIpLmFkZENsYXNzKFwibmF2LWlzLXZpc2libGVcIikub25lIFwid2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiLCAtPlxuICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MgXCJvdmVyZmxvdy1oaWRkZW5cIlxuXG4gICAgdG9nZ2xlU2VhcmNoIFwiY2xvc2VcIlxuICAgICQoXCIuY2Qtb3ZlcmxheVwiKS5hZGRDbGFzcyBcImlzLXZpc2libGVcIlxuXG4kKFwiLmNkLXNlYXJjaC10cmlnZ2VyXCIpLm9uIFwiY2xpY2tcIiwgKGV2ZW50KSAtPlxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIHRvZ2dsZVNlYXJjaCgpXG4gIGNsb3NlTmF2KClcblxuJChcIi5jZC1vdmVybGF5XCIpLm9uIFwic3dpcGVyaWdodFwiLCAtPlxuICBpZiAkKFwiLmNkLXByaW1hcnktbmF2XCIpLmhhc0NsYXNzKFwibmF2LWlzLXZpc2libGVcIilcbiAgICBjbG9zZU5hdigpXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzIFwiaXMtdmlzaWJsZVwiXG5cbiQoXCIubmF2LW9uLWxlZnQgLmNkLW92ZXJsYXlcIikub24gXCJzd2lwZWxlZnRcIiwgLT5cbiAgaWYgJChcIi5jZC1wcmltYXJ5LW5hdlwiKS5oYXNDbGFzcyhcIm5hdi1pcy12aXNpYmxlXCIpXG4gICAgY2xvc2VOYXYoKVxuICAgICQoXCIuY2Qtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyBcImlzLXZpc2libGVcIlxuXG4kKFwiLmNkLW92ZXJsYXlcIikub24gXCJjbGlja1wiLCAtPlxuICBjbG9zZU5hdigpXG4gIHRvZ2dsZVNlYXJjaCBcImNsb3NlXCJcbiAgJChcIi5jZC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzIFwiaXMtdmlzaWJsZVwiXG5cbiQoXCIuY2QtcHJpbWFyeS1uYXZcIikuY2hpbGRyZW4oXCIuaGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbiBcImNsaWNrXCIsIChldmVudCkgLT5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4kKFwiLmhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub24gXCJjbGlja1wiLCAoZXZlbnQpIC0+XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCkgIHVubGVzcyBjaGVja1dpbmRvd1dpZHRoKClcbiAgc2VsZWN0ZWQgPSAkKHRoaXMpXG4gIGlmIHNlbGVjdGVkLm5leHQoXCJ1bFwiKS5oYXNDbGFzcyhcImlzLWhpZGRlblwiKVxuICAgIHNlbGVjdGVkLmFkZENsYXNzKFwic2VsZWN0ZWRcIikubmV4dChcInVsXCIpLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpLmVuZCgpLnBhcmVudChcIi5oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikuYWRkQ2xhc3MgXCJtb3Zlcy1vdXRcIlxuICAgIHNlbGVjdGVkLnBhcmVudChcIi5oYXMtY2hpbGRyZW5cIikuc2libGluZ3MoXCIuaGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwidWxcIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikuZW5kKCkuY2hpbGRyZW4oXCJhXCIpLnJlbW92ZUNsYXNzIFwic2VsZWN0ZWRcIlxuICAgICQoXCIuY2Qtb3ZlcmxheVwiKS5hZGRDbGFzcyBcImlzLXZpc2libGVcIlxuICBlbHNlXG4gICAgc2VsZWN0ZWQucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKS5uZXh0KFwidWxcIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikuZW5kKCkucGFyZW50KFwiLmhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5yZW1vdmVDbGFzcyBcIm1vdmVzLW91dFwiXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzIFwiaXMtdmlzaWJsZVwiXG4gIHRvZ2dsZVNlYXJjaCBcImNsb3NlXCJcblxuJChcIi5nby1iYWNrXCIpLm9uIFwiY2xpY2tcIiwgLT5cbiAgJCh0aGlzKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIuaGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLnJlbW92ZUNsYXNzIFwibW92ZXMtb3V0XCJcbiIsImNvbnNvbGUubG9nICdzdWJzY3JpYmUuanMgbG9hZGVkISdcblxuIyBHZXQgc3Vic2NyaWJlIGJveFxuJHN1YnNjcmliZSA9ICQoXCIuY3RhLXN1YnNjcmliZVwiKVxuJHN1YnNjcmliZV9ib3ggPSAkc3Vic2NyaWJlLmZpbmQoXCIuY3RhLXN1YnNjcmliZV9fc2lnbnVwXCIpXG4kc3Vic2NyaWJlX2Vycm9yID0gJHN1YnNjcmliZS5maW5kKFwiLmN0YS1zdWJzY3JpYmVfX2Vycm9yXCIpXG5cbiMgR2V0IGlucHV0IGFuZCBidXR0b25cbiRzdWJzY3JpYmVfaW5wdXQgPSAkc3Vic2NyaWJlX2JveC5maW5kKFwiLmN0YS1zdWJzY3JpYmVfX2lucHV0XCIpXG4kc3Vic2NyaWJlX2J1dHRvbiA9ICRzdWJzY3JpYmVfYm94LmZpbmQoXCIuY3RhLXN1YnNjcmliZV9fYnV0dG9uXCIpXG5cbiMgR2V0IG1lc3NhZ2VcbiRzdWJzY3JpYmVfbWVzc2FnZSA9ICRzdWJzY3JpYmUuZmluZChcIi5jdGEtc3Vic2NyaWJlX19tZXNzYWdlXCIpXG5cbiMgVmFsaWRhdGlvblxuSXNFbWFpbCA9IChlbWFpbCkgLT5cbiAgcmVnZXggPSAvXihbYS16QS1aMC05Xy4rLV0pK1xcQCgoW2EtekEtWjAtOS1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskL1xuICByZWdleC50ZXN0IGVtYWlsXG5cbiRzdWJzY3JpYmVfYnV0dG9uLm9uIFwiY2xpY2tcIiwgLT5cbiAgaWYgSXNFbWFpbCgkc3Vic2NyaWJlX2lucHV0LnZhbCgpKVxuICAgICRzdWJzY3JpYmVfYm94LmZhZGVPdXQoJ2Zhc3QnKVxuICAgICRzdWJzY3JpYmVfbWVzc2FnZS5mYWRlSW4oJ3Nsb3cnKVxuICAgICRzdWJzY3JpYmVfZXJyb3IuaGlkZSgpXG4gIGVsc2VcbiAgICAkc3Vic2NyaWJlX2Vycm9yLmZhZGVJbignZmFzdCcpXG4iXX0=
