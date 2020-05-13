import {TypographyBuilder} from './typography-builder';

export default () => document.addEventListener(`DOMContentLoaded`, () => {
  document.body.classList.add(`load`);

  // module 2 task 1
  const listItems = document.querySelectorAll(`.rules__item p`);
  const lastListItem = listItems[listItems.length - 1];
  const rulesBtn = document.querySelector(`.rules__link`);

  lastListItem.onanimationend = () => {
    rulesBtn.classList.add(`rules__link--showed`);
  };

  // module 2 task 2
  // анимация заголовка главной страницы
  const animationTopScreenTextLine = new TypographyBuilder({
    elementSelector: `.intro__title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  const animationTopScreenDateLine = new TypographyBuilder({
    elementSelector: `.intro__date`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  // анимация заголовка страницы историй
  const animationTopScreenHistoryItemLine = new TypographyBuilder({
    elementSelector: `.slider__item-title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  // анимация заголовка страницы призов
  const animationTopScreenPrizesLine = new TypographyBuilder({
    elementSelector: `.prizes__title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  // анимация заголовка страницы правил
  const animationTopScreenRulesLine = new TypographyBuilder({
    elementSelector: `.rules__title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  // анимация заголовка страницы игры
  const animationTopScreenGameLine = new TypographyBuilder({
    elementSelector: `.game__title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  const pageObserver = (event) => {
    const pageId = event.detail.screenId;

    animationTopScreenTextLine.destroy();
    animationTopScreenDateLine.destroy();
    animationTopScreenHistoryItemLine.destroy();
    animationTopScreenPrizesLine.destroy();
    animationTopScreenRulesLine.destroy();

    if (pageId === 0) {
      // запуск анимации заголовка на главной странице
      setTimeout(() => {
        animationTopScreenTextLine.run();
      }, 500);

      setTimeout(() => {
        animationTopScreenDateLine.run();
      }, 1500);
    }

    if (pageId === 1) {
      // запуск анимации заголовка на странице историй
      if (event.detail.screenId === 1) {
        setTimeout(() => {
          animationTopScreenHistoryItemLine.run();
        }, 500);
      }
    }

    if (pageId === 2) {
      // запуск анимации заголовка на странице призов
      if (event.detail.screenId === 2) {
        setTimeout(() => {
          animationTopScreenPrizesLine.run();
        }, 500);
      }
    }

    if (pageId === 3) {
      // запуск анимации заголовка на странице правил
      if (event.detail.screenId === 3) {
        setTimeout(() => {
          animationTopScreenRulesLine.run();
        }, 500);
      }
    }

    if (pageId === 4) {
      // запуск анимации заголовка на странице игры
      if (event.detail.screenId === 4) {
        setTimeout(() => {
          animationTopScreenGameLine.run();
        }, 500);
      }
    }
  };

  document.body.addEventListener(`screenChanged`, pageObserver);
});
