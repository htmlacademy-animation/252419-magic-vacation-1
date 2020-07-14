export function gameTimer(time = 5 * 60) {
  let localTime = time;
  let interval = 1000;
  let now;
  let then = Date.now();
  let elapsed;

  function draw() {
    const seconds = `${parseInt(localTime % 60, 10)}`;
    const minutes = `${parseInt(localTime / 60 % 60, 10)}`;

    const [minuteContent, secondContent] = document.querySelectorAll(`.game__counter span`);

    minuteContent.innerHTML = minutes.length === 2 ? minutes : `0${minutes}`;
    secondContent.innerHTML = seconds.length === 2 ? seconds : `0${seconds}`;
  }

  function tick() {
    const requestId = requestAnimationFrame(tick);

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
}
