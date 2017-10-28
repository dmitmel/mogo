createModule('ReturnToTop', function() {
  var SmoothScroll = require('SmoothScroll');

  var $window = $(window);
  var returnToTop = $('#return-to-top');

  var MIN_SCROLL = $('#about').offset().top;
  var VISIBLE_CLASS = 'return-to-top_visible';

  $window.scroll(function() {
    if ($window.scrollTop() >= MIN_SCROLL) {
      returnToTop.addClass(VISIBLE_CLASS);
    } else {
      returnToTop.removeClass(VISIBLE_CLASS);
    }
  });

  var header = $('#header');
  returnToTop.click(function(e) {
    e.preventDefault();
    var headerOffset = header.offset().top;
    SmoothScroll.scroll(headerOffset, function() {
      window.location.hash = '#';
    });
  });
});
