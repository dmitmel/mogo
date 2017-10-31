const ITEM_SELECTOR = '.accordion-item';
const ITEM_TOGGLE_SELECTOR = '.accordion-item__toggle';
const ITEM_EXPANDED = 'accordion-item_expanded';

export class Accordion {
  constructor(element) {
    if (!(element instanceof Element))
      throw new TypeError('"element" argument must be an element');

    this.element = element;
    this.items = [];

    let items = $(element).find(ITEM_SELECTOR);
    items.toArray().forEach(item => this._addItem(item));
  }

  _addItem(element) {
    element = $(element);
    let toggle = element.find(ITEM_TOGGLE_SELECTOR);
    let item = { element, toggle };
    this.items.push(item);

    toggle.click(e => {
      e.preventDefault();
      this._expandItem(item);
    });
  }

  _expandItem(item) {
    if (item.element.hasClass(ITEM_EXPANDED)) return;

    this.items.forEach(otherItem => {
      if (!otherItem.element.hasClass(ITEM_EXPANDED)) return;
      otherItem.element.removeClass(ITEM_EXPANDED);
      otherItem.toggle.attr('aria-expanded', 'false');
    });

    item.element.addClass(ITEM_EXPANDED);
    item.toggle.attr('aria-expanded', 'true');
  }
}

$.fn.accordion = function() {
  return this.toArray().map(element => new Accordion(element));
};

$(() => $('.accordion').accordion());
