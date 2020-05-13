import {TypographyBuild} from './typography-builder';

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
  const animationTopScreenTextLine = new TypographyBuild({
    elementSelector: `.intro__title`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  const animationTopScreenDateLine = new TypographyBuild({
    elementSelector: `.intro__date`,
    timer: 350,
    classForActivate: `showed`,
    property: `transform`,
  });

  setTimeout(() => {
    animationTopScreenTextLine.runAnimation();
  }, 500);

  setTimeout(() => {
    animationTopScreenDateLine.runAnimation();
  }, 1500);
});
