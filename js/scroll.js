(function() {
  var minScroll = $('#about').offset().top;
  var $window = $(window);
  var $returnToTop = $('.return-to-top');
  var visibleClass = 'return-to-top_visible';

  $window.scroll(function() {
    if ($window.scrollTop() >= minScroll) {
      $returnToTop.addClass(visibleClass);
    } else {
      $returnToTop.removeClass(visibleClass);
    }
  });
})();
