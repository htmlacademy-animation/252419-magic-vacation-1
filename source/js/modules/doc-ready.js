import {followLinks} from './follow-links';

export default () => document.addEventListener(`DOMContentLoaded`, () => {
  document.body.classList.add(`load`);
  followLinks();
});
