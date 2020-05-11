export default () => document.addEventListener(`DOMContentLoaded`, () => {
  document.body.classList.add(`load`);

  const listItems = document.querySelectorAll(`.rules__item p`);
  const lastListItem = listItems[listItems.length - 1];
  const rulesBtn = document.querySelector(`.rules__link`);

  lastListItem.onanimationend = () => {
    rulesBtn.classList.add(`rules__link--showed`);
  };
});
