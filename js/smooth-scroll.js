createModule('SmoothScroll', function(SmoothScroll) {
  var scrollRoot = $('html, body');
  SmoothScroll.scroll = function(top, callback) {
    scrollRoot.animate({ scrollTop: top }, 1000, 'easeInOutSine', callback);
  };

  SmoothScroll.init = function(link) {
    var target = $(link.hash);
    if (target.length) {
      $(link).click(function(e) {
        e.preventDefault();
        var targetOffset = target.offset().top;
        SmoothScroll.scroll(targetOffset, function() {
          window.location.hash = link.hash;
        });
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
