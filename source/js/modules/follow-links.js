export const followLinks = () => {
  const overlay = document.querySelector(`.overlay`);

  const linkList = document.querySelectorAll(`.js-menu-link`);

  const storyPage = document.querySelector(`.screen--story`);

  let currentPage = document
    .querySelector(`.js-menu-link.active`)
    .getAttribute(`data-href`);

  if (currentPage === `story`) {
    overlay.classList.remove(`overlay--active`);
  } else {
    overlay.classList.add(`overlay--active`);
  }

  linkList.forEach((link) => {
    link.addEventListener(`click`, (event) => {
      const nextPage = event.target.getAttribute(`data-href`);

      if (currentPage === `story` && nextPage !== `story`) {
        event.preventDefault();
        overlay.classList.add(`overlay--active`);
        storyPage.classList.add(`screen--hidden`);

        setTimeout(() => {
          window.location.href = `#${nextPage}`;
        }, 500);
      } else if (nextPage === `story`) {
        overlay.classList.remove(`overlay--active`);
        storyPage.classList.remove(`screen--hidden`);
      }

      currentPage = nextPage;
    });
  });

};
