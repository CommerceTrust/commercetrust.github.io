
// nav
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




// lazyloader
//

var $article_size, $loadless, $loadmore, more, x;

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




// subscribe
//
var $subscribe, $subscribe_box, $subscribe_button, $subscribe_error, $subscribe_input, $subscribe_message, IsEmail;

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


// Add date

var today = new Date(),
    year = today.getFullYear();

$('.footer-copyright__box').prepend("<small>&copy;"+ year +" Commerce Bancshares, Inc.</small>");
