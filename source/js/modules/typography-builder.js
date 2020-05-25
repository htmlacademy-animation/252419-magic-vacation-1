export class TypographyBuilder {
  constructor({
    elementSelector = `.intro__title`,
    timer = 350,
    classForActivate = `showed`,
    property = `transform`,
    delay = 500,
  } = {}) {
    this.elementSelector = elementSelector;
    this.timer = timer;
    this.classForActivate = classForActivate;
    this.property = property;
    this.element = document.querySelector(this.elementSelector);
    this.iterationCount = 0;
    this.staticDelay = 0;
    this.delay = delay;

    this.prePareText();
  }

  _createElement(letter, delay) {
    const span = document.createElement(`span`);

    span.textContent = letter;
    span.style.transition = `${this.property} ${this.timer}ms ease ${this.delay + delay}ms`;

    return span;
  }

  get _delayCreator() {
    if (this.iterationCount >= 3) {
      this.iterationCount = 0;
      this.staticDelay += 150;
    }

    this.iterationCount += 1;
    switch (this.iterationCount) {
      case 1:
        return 50 + this.staticDelay;
      case 3:
        return 100 + this.staticDelay;
      case 2:
        return 150 + this.staticDelay;
      default:
        return 0;
    }
  }

  prePareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent
      .trim()
      .split(` `)
      .filter((latter) => latter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word)
        .reduce((fragment, latter) => {
          fragment.appendChild(this._createElement(latter, this._delayCreator));
          return fragment;
        }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  run() {
    if (!this.element) {
      return;
    }
    this.element.classList.add(this.classForActivate);
  }
}
