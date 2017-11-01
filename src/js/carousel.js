$(() =>
  $('.carousel').slick({
    cssEase: 'ease-in-out',
    easing: 'easeInOut',
    prevArrow: `<button type="button" class="slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>`,
    nextArrow: `<button type="button" class="slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>`,
    draggable: false
  })
);
