$.easing.easeInOut = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

var scrollRoot = $('html, body');
export function scrollTo(top, callback) {
  scrollRoot.animate({ scrollTop: top }, 1000, 'easeInOut', callback);
}

export function init(link) {
  var target = $(link.hash);
  if (target.length) {
    $(link).click(function(e) {
      e.preventDefault();
      var targetOffset = target.offset().top;
      scrollTo(targetOffset, () => (window.location.hash = link.hash));
    });
  }
}

$.fn.SmoothScroll = function() {
  this.each(() => init(this));
};

$('a[href^="#"]')
  .not('[href="#"]')
  .SmoothScroll();
