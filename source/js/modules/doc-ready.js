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

  const paths = document.querySelectorAll(`.result path`);

  paths.forEach((path) => {
    const dashArray = path.getTotalLength();
    const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);

    path.setAttribute(`stroke-dasharray`, `0 ` + Math.ceil(dashArray / 3));
    animate.setAttribute(`attributeName`, `stroke-dasharray`);
    animate.setAttribute(`from`, `0 ` + Math.ceil(dashArray / 3));
    animate.setAttribute(`to`, Math.ceil(dashArray / 3) + ` 0`);
    animate.setAttribute(`dur`, `1s`);
    animate.setAttribute(`begin`, `click`);
    animate.setAttribute(`fill`, `freeze`);
    animate.setAttribute(`keyTimes`, `0; 1`);
    animate.setAttribute(`keySplines`, `0.5 0.5 0.5 0.5`);

    path.appendChild(animate);
  });

  const paths2 = document.querySelectorAll(`.result__lose path`);

  let delay = 0;

  paths2.forEach((path) => {
    path.style.animationDelay = `${delay}s`;
    delay += 0.08;
  });
});
