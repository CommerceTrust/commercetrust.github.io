(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lazyloader, subscribe;

console.log('global.js loaded!');

subscribe = require("./nav");

subscribe = require("./subscribe");

lazyloader = require("./lazyloader");



},{"./lazyloader":2,"./nav":3,"./subscribe":4}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
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



},{}],4:[function(require,module,exports){
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



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL2NvbW1lcmNlLXRydXN0LWdpdGh1Yi9zcmMvamF2YXNjcmlwdC9nbG9iYWwuY29mZmVlIiwiL0FwcGxpY2F0aW9ucy9NQU1QL2h0ZG9jcy9jb21tZXJjZS10cnVzdC1naXRodWIvc3JjL2phdmFzY3JpcHQvbGF6eWxvYWRlci5jb2ZmZWUiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL2NvbW1lcmNlLXRydXN0LWdpdGh1Yi9zcmMvamF2YXNjcmlwdC9uYXYuY29mZmVlIiwiL0FwcGxpY2F0aW9ucy9NQU1QL2h0ZG9jcy9jb21tZXJjZS10cnVzdC1naXRodWIvc3JjL2phdmFzY3JpcHQvc3Vic2NyaWJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0VBLElBQUE7O0FBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWjs7QUFHQSxTQUFBLEdBQVksT0FBQSxDQUFRLE9BQVI7O0FBQ1osU0FBQSxHQUFZLE9BQUEsQ0FBUSxhQUFSOztBQUNaLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUjs7Ozs7QUNQYixJQUFBOztBQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksdUJBQVo7O0FBRUEsYUFBQSxHQUFnQixDQUFBLENBQUUsb0JBQUYsQ0FBdUIsQ0FBQyxJQUF4QixDQUFBOztBQUNoQixDQUFBLEdBQUk7O0FBQ0osSUFBQSxHQUFPOztBQUNQLFNBQUEsR0FBWSxDQUFBLENBQUUsV0FBRjs7QUFDWixTQUFBLEdBQVksQ0FBQSxDQUFFLFdBQUY7O0FBRVosQ0FBQSxDQUFFLHdCQUFBLEdBQTJCLENBQTNCLEdBQStCLEdBQWpDLENBQXFDLENBQUMsSUFBdEMsQ0FBQTs7QUFDQSxTQUFTLENBQUMsUUFBVixDQUFtQixVQUFuQjs7QUFFQSxTQUFTLENBQUMsS0FBVixDQUFnQixTQUFB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Q0FBQyxNQUFuRSxDQUEwRSxJQUExRSxDQUErRSxDQUFDLFdBQWhGLENBQTRGLFdBQTVGO0FBRHdCLENBQTFCOzs7OztBQ3ZHQSxJQUFBOztBQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVo7O0FBR0EsVUFBQSxHQUFhLENBQUEsQ0FBRSxnQkFBRjs7QUFDYixjQUFBLEdBQWlCLFVBQVUsQ0FBQyxJQUFYLENBQWdCLHdCQUFoQjs7QUFDakIsZ0JBQUEsR0FBbUIsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsdUJBQWhCOztBQUduQixnQkFBQSxHQUFtQixjQUFjLENBQUMsSUFBZixDQUFvQix1QkFBcEI7O0FBQ25CLGlCQUFBLEdBQW9CLGNBQWMsQ0FBQyxJQUFmLENBQW9CLHdCQUFwQjs7QUFHcEIsa0JBQUEsR0FBcUIsVUFBVSxDQUFDLElBQVgsQ0FBZ0IseUJBQWhCOztBQUdyQixPQUFBLEdBQVUsU0FBQyxLQUFEO0FBQ1IsTUFBQTtFQUFBLEtBQUEsR0FBUTtTQUNSLEtBQUssQ0FBQyxJQUFOLENBQVcsS0FBWDtBQUZROztBQUlWLGlCQUFpQixDQUFDLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFNBQUE7RUFDNUIsSUFBRyxPQUFBLENBQVEsZ0JBQWdCLENBQUMsR0FBakIsQ0FBQSxDQUFSLENBQUg7SUFDRSxjQUFjLENBQUMsT0FBZixDQUF1QixNQUF2QjtJQUNBLGtCQUFrQixDQUFDLE1BQW5CLENBQTBCLE1BQTFCO1dBQ0EsZ0JBQWdCLENBQUMsSUFBakIsQ0FBQSxFQUhGO0dBQUEsTUFBQTtXQUtFLGdCQUFnQixDQUFDLE1BQWpCLENBQXdCLE1BQXhCLEVBTEY7O0FBRDRCLENBQTlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQnJvd3NlcmlmeSBlbnRyeSBwb2ludCBmb3IgdGhlIGdsb2JhbC5qcyBidW5kbGUgKHlheSBDb2ZmZWVTY3JpcHQhKVxuXG5jb25zb2xlLmxvZyAnZ2xvYmFsLmpzIGxvYWRlZCEnXG5cbiMkID0gcmVxdWlyZShcImpxdWVyeVwiKVxuc3Vic2NyaWJlID0gcmVxdWlyZSBcIi4vbmF2XCJcbnN1YnNjcmliZSA9IHJlcXVpcmUgXCIuL3N1YnNjcmliZVwiXG5sYXp5bG9hZGVyID0gcmVxdWlyZSBcIi4vbGF6eWxvYWRlclwiXG4iLCJjb25zb2xlLmxvZyAnbGF6eWxvYWRlci5qcyBsb2FkZWQhJ1xuXG4kYXJ0aWNsZV9zaXplID0gJChcIi5jYXJkLWFydGljbGVfX2JveFwiKS5zaXplKClcbnggPSAzXG5tb3JlID0gM1xuJGxvYWRtb3JlID0gJChcIiNsb2FkTW9yZVwiKVxuJGxvYWRsZXNzID0gJChcIiNzaG93TGVzc1wiKVxuXG4kKFwiLmNhcmQtYXJ0aWNsZV9fYm94Omx0KFwiICsgeCArIFwiKVwiKS5zaG93KClcbiRsb2FkbGVzcy5hZGRDbGFzcygnZGlzYWJsZWQnKVxuXG4kbG9hZG1vcmUuY2xpY2sgLT5cbiAgeCA9IChpZiAoeCArIG1vcmUgPD0gJGFydGljbGVfc2l6ZSkgdGhlbiB4ICsgbW9yZSBlbHNlICRhcnRpY2xlX3NpemUpXG4gICQoXCIuY2FyZC1hcnRpY2xlX19ib3g6bHQoXCIgKyB4ICsgXCIpXCIpLnNob3coJ3Nsb3cnLCAtPlxuICAgIGlmICgkKFwiLmNhcmQtYXJ0aWNsZV9fYm94OnZpc2libGVcIikubGVuZ3RoID09ICRhcnRpY2xlX3NpemUpXG4gICAgICAjY29uc29sZS5sb2cgJ2hlbGxvJ1xuICAgICAgJGxvYWRtb3JlLmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gICAgKVxuICAkbG9hZGxlc3MucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuXG4kbG9hZGxlc3MuY2xpY2sgLT5cbiAgaWYgKCQoXCIuY2FyZC1hcnRpY2xlX19ib3g6dmlzaWJsZVwiKS5sZW5ndGggPiBtb3JlKVxuICAgIHggPSAoaWYgKHggLSBtb3JlIDwgMCkgdGhlbiAzIGVsc2UgeCAtIG1vcmUpXG4gICAgJChcIi5jYXJkLWFydGljbGVfX2JveFwiKS5ub3QoXCI6bHQoXCIgKyB4ICsgXCIpXCIpLmhpZGUoJ3Nsb3cnLCAtPlxuICAgICAgaWYgKCQoXCIuY2FyZC1hcnRpY2xlX19ib3g6dmlzaWJsZVwiKS5sZW5ndGggPD0gbW9yZSlcbiAgICAgICAgJGxvYWRsZXNzLmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gICAgKVxuICAgICRsb2FkbW9yZS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxuIiwiIyBOYXZpZ2F0aW9uXG5jbG9zZU5hdiA9IC0+XG4gICQoXCIuY2QtbmF2LXRyaWdnZXJcIikucmVtb3ZlQ2xhc3MgXCJuYXYtaXMtdmlzaWJsZVwiXG4gICQoXCIuY2QtbWFpbi1oZWFkZXJcIikucmVtb3ZlQ2xhc3MgXCJuYXYtaXMtdmlzaWJsZVwiXG4gICQoXCIuY2QtcHJpbWFyeS1uYXZcIikucmVtb3ZlQ2xhc3MgXCJuYXYtaXMtdmlzaWJsZVwiXG4gICQoXCIuaGFzLWNoaWxkcmVuIHVsXCIpLmFkZENsYXNzIFwiaXMtaGlkZGVuXCJcbiAgJChcIi5oYXMtY2hpbGRyZW4gYVwiKS5yZW1vdmVDbGFzcyBcInNlbGVjdGVkXCJcbiAgJChcIi5tb3Zlcy1vdXRcIikucmVtb3ZlQ2xhc3MgXCJtb3Zlcy1vdXRcIlxuICAkKFwiLmNkLW1haW4tY29udGVudFwiKS5yZW1vdmVDbGFzcyhcIm5hdi1pcy12aXNpYmxlXCIpLm9uZSBcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIiwgLT5cbiAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyBcIm92ZXJmbG93LWhpZGRlblwiXG5cbnRvZ2dsZVNlYXJjaCA9ICh0eXBlKSAtPlxuICBpZiB0eXBlIGlzIFwiY2xvc2VcIlxuXG4gICAgI2Nsb3NlIHNlcmFjaFxuICAgICQoXCIuY2Qtc2VhcmNoXCIpLnJlbW92ZUNsYXNzIFwiaXMtdmlzaWJsZVwiXG4gICAgJChcIi5jZC1zZWFyY2gtdHJpZ2dlclwiKS5yZW1vdmVDbGFzcyBcInNlYXJjaC1pcy12aXNpYmxlXCJcbiAgICAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MgXCJzZWFyY2gtaXMtdmlzaWJsZVwiXG4gIGVsc2VcblxuICAgICN0b2dnbGUgc2VhcmNoIHZpc2liaWxpdHlcbiAgICAkKFwiLmNkLXNlYXJjaFwiKS50b2dnbGVDbGFzcyBcImlzLXZpc2libGVcIlxuICAgICQoXCIuY2Qtc2VhcmNoLXRyaWdnZXJcIikudG9nZ2xlQ2xhc3MgXCJzZWFyY2gtaXMtdmlzaWJsZVwiXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLnRvZ2dsZUNsYXNzIFwic2VhcmNoLWlzLXZpc2libGVcIlxuICAgICQoXCIuY2Qtc2VhcmNoXCIpLmZpbmQoXCJpbnB1dFt0eXBlPVxcXCJzZWFyY2hcXFwiXVwiKS5mb2N1cygpICBpZiAkKHdpbmRvdykud2lkdGgoKSA+IE1xTCBhbmQgJChcIi5jZC1zZWFyY2hcIikuaGFzQ2xhc3MoXCJpcy12aXNpYmxlXCIpXG4gICAgKGlmICgkKFwiLmNkLXNlYXJjaFwiKS5oYXNDbGFzcyhcImlzLXZpc2libGVcIikpIHRoZW4gJChcIi5jZC1vdmVybGF5XCIpLmFkZENsYXNzKFwiaXMtdmlzaWJsZVwiKSBlbHNlICQoXCIuY2Qtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImlzLXZpc2libGVcIikpXG5jaGVja1dpbmRvd1dpZHRoID0gLT5cblxuICAjY2hlY2sgd2luZG93IHdpZHRoIChzY3JvbGxiYXIgaW5jbHVkZWQpXG4gIGUgPSB3aW5kb3dcbiAgYSA9IFwiaW5uZXJcIlxuICB1bmxlc3MgXCJpbm5lcldpZHRoXCIgb2Ygd2luZG93XG4gICAgYSA9IFwiY2xpZW50XCJcbiAgICBlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IG9yIGRvY3VtZW50LmJvZHlcbiAgaWYgZVthICsgXCJXaWR0aFwiXSA+PSBNcUxcbiAgICB0cnVlXG4gIGVsc2VcbiAgICBmYWxzZVxubW92ZU5hdmlnYXRpb24gPSAtPlxuICBuYXZpZ2F0aW9uID0gJChcIi5jZC1uYXZcIilcbiAgZGVza3RvcCA9IGNoZWNrV2luZG93V2lkdGgoKVxuICBpZiBkZXNrdG9wXG4gICAgbmF2aWdhdGlvbi5kZXRhY2goKVxuICAgIG5hdmlnYXRpb24uaW5zZXJ0QmVmb3JlIFwiLmNkLWhlYWRlci1idXR0b25zXCJcbiAgZWxzZVxuICAgIG5hdmlnYXRpb24uZGV0YWNoKClcbiAgICBuYXZpZ2F0aW9uLmluc2VydEFmdGVyIFwiLmNkLW1haW4tY29udGVudFwiXG5cbk1xTCA9IDEwMjNcbm1vdmVOYXZpZ2F0aW9uKClcbiQod2luZG93KS5vbiBcInJlc2l6ZVwiLCAtPlxuICAoaWYgKG5vdCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB0aGVuIHNldFRpbWVvdXQobW92ZU5hdmlnYXRpb24sIDMwMCkgZWxzZSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmVOYXZpZ2F0aW9uKSlcblxuJChcIi5jZC1uYXYtdHJpZ2dlclwiKS5vbiBcImNsaWNrXCIsIChldmVudCkgLT5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBpZiAkKFwiLmNkLW1haW4tY29udGVudFwiKS5oYXNDbGFzcyhcIm5hdi1pcy12aXNpYmxlXCIpXG4gICAgY2xvc2VOYXYoKVxuICAgICQoXCIuY2Qtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyBcImlzLXZpc2libGVcIlxuICBlbHNlXG4gICAgJCh0aGlzKS5hZGRDbGFzcyBcIm5hdi1pcy12aXNpYmxlXCJcbiAgICAkKFwiLmNkLXByaW1hcnktbmF2XCIpLmFkZENsYXNzIFwibmF2LWlzLXZpc2libGVcIlxuICAgICQoXCIuY2QtbWFpbi1oZWFkZXJcIikuYWRkQ2xhc3MgXCJuYXYtaXMtdmlzaWJsZVwiXG4gICAgJChcIi5jZC1tYWluLWNvbnRlbnRcIikuYWRkQ2xhc3MoXCJuYXYtaXMtdmlzaWJsZVwiKS5vbmUgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIC0+XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyBcIm92ZXJmbG93LWhpZGRlblwiXG5cbiAgICB0b2dnbGVTZWFyY2ggXCJjbG9zZVwiXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLmFkZENsYXNzIFwiaXMtdmlzaWJsZVwiXG5cbiQoXCIuY2Qtc2VhcmNoLXRyaWdnZXJcIikub24gXCJjbGlja1wiLCAoZXZlbnQpIC0+XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgdG9nZ2xlU2VhcmNoKClcbiAgY2xvc2VOYXYoKVxuXG4kKFwiLmNkLW92ZXJsYXlcIikub24gXCJzd2lwZXJpZ2h0XCIsIC0+XG4gIGlmICQoXCIuY2QtcHJpbWFyeS1uYXZcIikuaGFzQ2xhc3MoXCJuYXYtaXMtdmlzaWJsZVwiKVxuICAgIGNsb3NlTmF2KClcbiAgICAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MgXCJpcy12aXNpYmxlXCJcblxuJChcIi5uYXYtb24tbGVmdCAuY2Qtb3ZlcmxheVwiKS5vbiBcInN3aXBlbGVmdFwiLCAtPlxuICBpZiAkKFwiLmNkLXByaW1hcnktbmF2XCIpLmhhc0NsYXNzKFwibmF2LWlzLXZpc2libGVcIilcbiAgICBjbG9zZU5hdigpXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzIFwiaXMtdmlzaWJsZVwiXG5cbiQoXCIuY2Qtb3ZlcmxheVwiKS5vbiBcImNsaWNrXCIsIC0+XG4gIGNsb3NlTmF2KClcbiAgdG9nZ2xlU2VhcmNoIFwiY2xvc2VcIlxuICAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MgXCJpcy12aXNpYmxlXCJcblxuJChcIi5jZC1wcmltYXJ5LW5hdlwiKS5jaGlsZHJlbihcIi5oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9uIFwiY2xpY2tcIiwgKGV2ZW50KSAtPlxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiQoXCIuaGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbiBcImNsaWNrXCIsIChldmVudCkgLT5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKSAgdW5sZXNzIGNoZWNrV2luZG93V2lkdGgoKVxuICBzZWxlY3RlZCA9ICQodGhpcylcbiAgaWYgc2VsZWN0ZWQubmV4dChcInVsXCIpLmhhc0NsYXNzKFwiaXMtaGlkZGVuXCIpXG4gICAgc2VsZWN0ZWQuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5uZXh0KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIikuZW5kKCkucGFyZW50KFwiLmhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyBcIm1vdmVzLW91dFwiXG4gICAgc2VsZWN0ZWQucGFyZW50KFwiLmhhcy1jaGlsZHJlblwiKS5zaWJsaW5ncyhcIi5oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJ1bFwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5lbmQoKS5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MgXCJzZWxlY3RlZFwiXG4gICAgJChcIi5jZC1vdmVybGF5XCIpLmFkZENsYXNzIFwiaXMtdmlzaWJsZVwiXG4gIGVsc2VcbiAgICBzZWxlY3RlZC5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpLm5leHQoXCJ1bFwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5lbmQoKS5wYXJlbnQoXCIuaGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLnJlbW92ZUNsYXNzIFwibW92ZXMtb3V0XCJcbiAgICAkKFwiLmNkLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MgXCJpcy12aXNpYmxlXCJcbiAgdG9nZ2xlU2VhcmNoIFwiY2xvc2VcIlxuXG4kKFwiLmdvLWJhY2tcIikub24gXCJjbGlja1wiLCAtPlxuICAkKHRoaXMpLnBhcmVudChcInVsXCIpLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikucmVtb3ZlQ2xhc3MgXCJtb3Zlcy1vdXRcIlxuIiwiY29uc29sZS5sb2cgJ3N1YnNjcmliZS5qcyBsb2FkZWQhJ1xuXG4jIEdldCBzdWJzY3JpYmUgYm94XG4kc3Vic2NyaWJlID0gJChcIi5jdGEtc3Vic2NyaWJlXCIpXG4kc3Vic2NyaWJlX2JveCA9ICRzdWJzY3JpYmUuZmluZChcIi5jdGEtc3Vic2NyaWJlX19zaWdudXBcIilcbiRzdWJzY3JpYmVfZXJyb3IgPSAkc3Vic2NyaWJlLmZpbmQoXCIuY3RhLXN1YnNjcmliZV9fZXJyb3JcIilcblxuIyBHZXQgaW5wdXQgYW5kIGJ1dHRvblxuJHN1YnNjcmliZV9pbnB1dCA9ICRzdWJzY3JpYmVfYm94LmZpbmQoXCIuY3RhLXN1YnNjcmliZV9faW5wdXRcIilcbiRzdWJzY3JpYmVfYnV0dG9uID0gJHN1YnNjcmliZV9ib3guZmluZChcIi5jdGEtc3Vic2NyaWJlX19idXR0b25cIilcblxuIyBHZXQgbWVzc2FnZVxuJHN1YnNjcmliZV9tZXNzYWdlID0gJHN1YnNjcmliZS5maW5kKFwiLmN0YS1zdWJzY3JpYmVfX21lc3NhZ2VcIilcblxuIyBWYWxpZGF0aW9uXG5Jc0VtYWlsID0gKGVtYWlsKSAtPlxuICByZWdleCA9IC9eKFthLXpBLVowLTlfListXSkrXFxAKChbYS16QS1aMC05LV0pK1xcLikrKFthLXpBLVowLTldezIsNH0pKyQvXG4gIHJlZ2V4LnRlc3QgZW1haWxcblxuJHN1YnNjcmliZV9idXR0b24ub24gXCJjbGlja1wiLCAtPlxuICBpZiBJc0VtYWlsKCRzdWJzY3JpYmVfaW5wdXQudmFsKCkpXG4gICAgJHN1YnNjcmliZV9ib3guZmFkZU91dCgnZmFzdCcpXG4gICAgJHN1YnNjcmliZV9tZXNzYWdlLmZhZGVJbignc2xvdycpXG4gICAgJHN1YnNjcmliZV9lcnJvci5oaWRlKClcbiAgZWxzZVxuICAgICRzdWJzY3JpYmVfZXJyb3IuZmFkZUluKCdmYXN0JylcbiJdfQ==
