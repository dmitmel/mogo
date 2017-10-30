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
    this.items.push(element);

    element.find(ITEM_TOGGLE_SELECTOR).click(e => {
      e.preventDefault();
      this._expandItem(element);
    });
  }

  _expandItem(item) {
    if (item.hasClass(ITEM_EXPANDED)) return;

    this.items.forEach(otherItem => {
      otherItem.removeClass(ITEM_EXPANDED);
    });

    item.addClass(ITEM_EXPANDED);
  }
}

$.fn.accordion = function() {
  return this.toArray().map(element => new Accordion(element));
};

$(() => $('.accordion').accordion());
