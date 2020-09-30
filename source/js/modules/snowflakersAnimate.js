import {animateCtx, animationTick, skewCtx} from './helpers';

const ANIMATION_CYCLE_TIME = 8 * 1000;

const windowHW = window.innerWidth / 2;
const windowHH = window.innerHeight / 2;

const snow1 = {
  width: 232,
  height: 228,
  left: windowHW - 470,
  top: windowHH - (windowHH * 0.1),
  defaultTop: windowHH - (windowHH * 0.1),
  skewX: -0.2,
  skewY: 0.2,
  opacity: 0,
  opacityDelay: 700,
  movingDelay: 1300,
};

const snow2 = {
  width: 168,
  height: 160,
  left: -windowHW - 400,
  top: windowHH - windowHH,
  defaultTop: windowHH - (windowHH * 0.6),
  scaleX: -1,
  skewX: -0.2,
  skewY: 0.2,
  opacity: 0,
  opacityDelay: 1100,
  movingDelay: 0,
};

const translateAnimationTick = (params) => (from, to) => (progress) => {
  params.top =
    from -
    (
      Math.sign(to - from) *
      Math.abs(to - from) *
      Math.sin(progress * 6 * Math.PI)
    );
};

const opacityAnimationTick = (params) => (from, to) => (progress) => {
  params.opacity = animationTick(from, to, progress);
};

const snowflakesAnimate = (ctx, img) => {
  const drawSnowflake = ({
    scaleX = 1,
    scaleY = 1,
    skewX,
    skewY,
    top,
    left,
    width,
    height,
    opacity,
  }) => {
    ctx.save();
    ctx.scale(scaleX, scaleY);
    skewCtx(ctx, skewX, skewY);
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, left, top, width, height);
    ctx.restore();
  };

  const animateSnow = (params) => {
    setTimeout(() => {
      animateCtx(translateAnimationTick(params)(params.defaultTop, params.defaultTop - 10), ANIMATION_CYCLE_TIME - params.movingDelay,
      );
    }, params.movingDelay - 0.1);

    setTimeout(() => {
      animateCtx(opacityAnimationTick(params)(0, 1), 1000);
    }, params.opacityDelay - 0.3);
  };

  return {
    animate() {
      animateSnow(snow1);
      animateSnow(snow2);
    },
    draw() {
      drawSnowflake(snow1);
      drawSnowflake(snow2);
    },
  };
};

export {snowflakesAnimate};
