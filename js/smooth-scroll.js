createModule('SmoothScroll', function(SmoothScroll) {
  var scrollRoot = $('html, body');
  SmoothScroll.scroll = function(top) {
    scrollRoot.animate({ scrollTop: top }, 1000);
  };

  SmoothScroll.init = function(link) {
    var target = $(link.hash);
    if (target.length) {
      var targetOffset = target.offset().top;
      $(link).click(function(e) {
        e.preventDefault();
        SmoothScroll.scroll(targetOffset);
      });
    }
  };

  $.fn.SmoothScroll = function() {
    this.each(function() {
      SmoothScroll.init(this);
    });
  };

  $('a[href^="#"]')
    .not('[href="#"]')
    .SmoothScroll();
});
