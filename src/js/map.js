$(() => {
  const map = $('#map');
  const toggleMap = $('#map__toggle');

  toggleMap.click(e => {
    e.preventDefault();
    map.toggleClass('map_visible');
  });
});
