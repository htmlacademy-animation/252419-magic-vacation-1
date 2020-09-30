import {linear} from './timingFunction';

export const animateEasing = (render, duration, easing) => {
  let start = Date.now();

  function loop() {
    let p = (Date.now() - start) / duration;
    if (p > 1) {
      render(1);
    } else {
      requestAnimationFrame(loop);
      render(easing(p));
    }
  }

  loop();
};

export const animationTick = (from, to, progress) => from + progress * Math.sign(to - from) * Math.abs(to - from);

export const serialAnimations = (animations) => {
  animations.forEach((animation) => {
    animation();
  });
};

export const animateCtx = (render, duration) => animateEasing(render, duration, linear);

export const rotateCtx = (ctx, angle, x, y) => {
  ctx.translate(x, y);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-x, -y);
};

export const skewCtx = (ctx, x = 0, y = 0) => ctx.transform(1, x, y, 1, 0, 0);
