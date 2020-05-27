export function imageBuilder(elem) {
  const src = elem.src;

  elem.classList.add(`img--activated`);
  elem.src = ``;

  return function () {
    elem.src = src;
  };
}
