createModule('ReturnToTop', function() {
  var SmoothScroll = require('SmoothScroll');

  var $window = $(window);
  var $returnToTop = $('.return-to-top');

  var MIN_SCROLL = $('#about').offset().top;
  var VISIBLE_CLASS = 'return-to-top_visible';

  $window.scroll(function() {
    if ($window.scrollTop() >= MIN_SCROLL) {
      $returnToTop.addClass(VISIBLE_CLASS);
    } else {
      $returnToTop.removeClass(VISIBLE_CLASS);
    }
  });

  var HEADER_OFFSET = $('#header').offset().top;

  $returnToTop.click(function(e) {
    e.preventDefault();
    SmoothScroll.scroll(HEADER_OFFSET);
  });
});
