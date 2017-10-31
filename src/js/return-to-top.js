import { scrollTo } from './smooth-scroll';

var RETURN_TO_TOP_VISIBLE = 'return-to-top_visible';

$(() => {
  const MIN_SCROLL = $('#about').offset().top;

  const returnToTop = $('#return-to-top');

  const $window = $(window);
  $window.scroll(function() {
    if ($window.scrollTop() >= MIN_SCROLL) {
      returnToTop.addClass(RETURN_TO_TOP_VISIBLE);
    } else {
      returnToTop.removeClass(RETURN_TO_TOP_VISIBLE);
    }
  });

  const header = $('#header');
  returnToTop.click(function(e) {
    e.preventDefault();
    var headerOffset = header.offset().top;
    scrollTo(headerOffset, function() {
      window.location.hash = '#';
    });
  });
});
