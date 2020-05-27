import {TypographyBuilder} from './typography-builder';
import {imageBuilder} from './image-builder';

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
  });

  const animationTopScreenDateLine = new TypographyBuilder({
    elementSelector: `.intro__date`,
    delay: 1500,
  });

  // анимация заголовка страницы историй
  const animationTopScreenHistoryItemLine = new TypographyBuilder({
    elementSelector: `.slider__item-title`,
  });

  // анимация заголовка страницы призов
  const animationTopScreenPrizesLine = new TypographyBuilder({
    elementSelector: `.prizes__title`,
  });

  // анимация заголовка страницы правил
  const animationTopScreenRulesLine = new TypographyBuilder({
    elementSelector: `.rules__title`,
  });

  // анимация заголовка страницы игры
  const animationTopScreenGameLine = new TypographyBuilder({
    elementSelector: `.game__title`,
  });

  animationTopScreenTextLine.run();
  animationTopScreenDateLine.run();
  animationTopScreenHistoryItemLine.run();
  animationTopScreenPrizesLine.run();
  animationTopScreenRulesLine.run();
  animationTopScreenGameLine.run();

  // module 3
  imageBuilder();
});
