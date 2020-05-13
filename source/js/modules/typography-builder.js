export class TypographyBuilder {
  constructor({
    elementSelector = `.intro__title`,
    timer = 500,
    classForActivate = `showed`,
    property = `transform`,
  } = {}) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._iterationCount = 0;
    this._staticDelay = 0;

    this._prePareText();
  }

  _createElement(letter, delay) {
    const span = document.createElement(`span`);

    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease ${delay}ms`;

    return span;
  }

  get _delayCreator() {
    if (this._iterationCount >= 3) {
      this._iterationCount = 0;
      this._staticDelay += 150;
    }

    this._iterationCount += 1;
    switch (this._iterationCount) {
      case 1:
        return 50 + this._staticDelay;
      case 3:
        return 100 + this._staticDelay;
      case 2:
        return 150 + this._staticDelay;
      default:
        return 0;
    }
  }

  _prePareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent
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

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  run() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroy() {
    this._element.classList.remove(this._classForActivate);
  }
}
