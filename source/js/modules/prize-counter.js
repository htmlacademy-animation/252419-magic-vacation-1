export function prizeCounter() {
  const prizeBlocks = document.querySelectorAll(`.prizes__desc b`);

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function timer(element, start, end) {
    let count = 0;
    let interval = 1000 / 12;
    let now;
    let then = Date.now();
    let elapsed;
    let requestId;

    function tick() {
      requestId = requestAnimationFrame(tick);

      now = Date.now();
      elapsed = now - then;

      if (elapsed >= interval) {
        then = now - (elapsed % interval);

        count++;

        element.innerHTML = randomInteger(start + 1, end - 1);

        if (count >= 7) {
          cancelAnimationFrame(requestId);

          element.innerHTML = end;
        }
      }
    }

    requestAnimationFrame(tick);
  }

  const prizeBlock2Value = prizeBlocks[1].innerHTML;
  const prizeBlock3Value = prizeBlocks[2].innerHTML;

  prizeBlocks[1].innerHTML = `0`;
  prizeBlocks[2].innerHTML = `11`;

  prizeBlocks[1].addEventListener(`transitionend`, () => {
    timer(prizeBlocks[1], 1, prizeBlock2Value);
  });

  prizeBlocks[2].addEventListener(`transitionend`, () => {
    timer(prizeBlocks[2], 50, prizeBlock3Value);
  });
}
