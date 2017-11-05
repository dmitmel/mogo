$.easing.easeInOut = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

import './smooth-scroll';
import './return-to-top';
import './accordion';
import './carousel';
import './map';
