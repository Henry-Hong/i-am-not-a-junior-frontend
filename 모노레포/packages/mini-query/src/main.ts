class MiniQuery {
  private elements: Element[];

  constructor(selectors: any, container?: Element) {
    this.elements = Array.from(
      (container ?? document).querySelectorAll(selectors)
    );
  }

  click = (callback: EventListenerOrEventListenerObject) => {
    this.elements.forEach((element) => {
      element.addEventListener("click", callback);
    });
    return this;
  };

  length = () => this.elements.length;
}

export const $ = (selectors: any, container?: Element) =>
  new MiniQuery(selectors, container);
