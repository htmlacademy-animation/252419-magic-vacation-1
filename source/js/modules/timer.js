function timer(time = 5 * 60) {
  let localTime = time;
  let interval = 1000;
  let now;
  let then = Date.now();
  let elapsed;
  let requestId;

  function draw(drawTime = localTime) {
    const seconds = `${parseInt(drawTime % 60, 10)}`;
    const minutes = `${parseInt(drawTime / 60 % 60, 10)}`;

    const [minuteContent, secondContent] = document.querySelectorAll(`.game__counter span`);

    minuteContent.innerHTML = minutes.length === 2 ? minutes : `0${minutes}`;
    secondContent.innerHTML = seconds.length === 2 ? seconds : `0${seconds}`;
  }

  function tick() {
    requestId = requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    if (elapsed >= interval) {
      then = now - (elapsed % interval);

      --localTime;
      if (localTime <= 0) {
        cancelAnimationFrame(requestId);
      }
      draw();
    }
  }

  requestAnimationFrame(tick);

  return true;
}

export function gameTimer() {
  let timerStarted = false;

  document.body.addEventListener(`screenChanged`, (obj) => {
    if (obj.detail.screenId === 4 && !timerStarted) {
      timerStarted = timer();
    }
  });
}
