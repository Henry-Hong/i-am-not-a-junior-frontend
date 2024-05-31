class MiniQuery {
  constructor(selectors, container) {
    this.elements = Array.from(
      (container ?? document).querySelectorAll(selectors)
    );
  }

  click = (callback) => {
    this.elements.forEach((element) => {
      element.addEventListener("click", callback);
    });
    return this;
  };

  mouseover = (callback) => {
    this.elements.forEach((element) => {
      element.addEventListener("mouseover", callback);
    });
    return this;
  };

  length = () => this.elements.length;
}

export const $ = (selectors, container) => new MiniQuery(selectors, container);
