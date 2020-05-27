function imageConverter(elem) {
  const src = elem.src;

  elem.src = ``;

  return function () {
    elem.src = `${ src }?${Math.random()}`;
  };
}

export function imageBuilder() {
  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenId === 2) {
      let prizesList = document.querySelector(`.prizes__list`);

      if (!prizesList.classList.contains(`prizes__list--activated`)) {
        prizesList.classList.add(`prizes__list--activated`);

        Array.from(prizesList.querySelectorAll(`img`))
          .map(imageConverter)
          .forEach((fun) => {
            if (window.innerHeight < window.innerWidth) {
              fun();
            }
          });
      }
    }
  });
}
