class MiniQuery {
  private elements: Element[];

  constructor(selectors: any, container?: Element) {
    this.elements = Array.from(
      (container ?? document).querySelectorAll(selectors)
    );
  }

  length = () => this.elements.length;
}

export const $ = (selectors: any, container?: Element) =>
  new MiniQuery(selectors, container);
