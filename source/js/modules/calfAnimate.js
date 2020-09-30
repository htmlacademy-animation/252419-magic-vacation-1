import {
  animateCtx,
  animateEasing,
  animationTick,
  rotateCtx,
  serialAnimations,
} from './helpers';
import {elasticOut} from './timingFunction';

export const calfAnimate = (ctx, img) => {
  let translateY = 0;
  const ANIMATION_CICLE_TIME = 6 * 1000;
  let angle = 0;
  const width = img.width;
  const height = img.height;
  const top = (window.innerHeight - height) / 2;
  const left = (window.innerWidth - width) / 2;
  const translateX = left + (width / 2);

  const getTranslateY = () => {
    return translateY + (height / 2);
  };

  const translateAnimationTick = (from, to) => (progress) => {
    translateY = animationTick(from, to, progress);
  };

  const rotateAnimationTick = (from, to) => (progress) => {
    angle = animationTick(from, to, progress);
  };

  const rotateAnimations = [
    () => animateCtx(rotateAnimationTick(30, 30), 200),
    () => animateEasing(rotateAnimationTick(30, 0), ANIMATION_CICLE_TIME - 200, elasticOut(3)),
  ];

  const draw = () => {
    ctx.save();
    rotateCtx(ctx, angle, translateX, getTranslateY());
    ctx.translate(left, translateY);
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  };

  return {
    draw,
    animate() {
      animateEasing(translateAnimationTick(window.innerHeight, top), ANIMATION_CICLE_TIME, elasticOut(5));
      serialAnimations(rotateAnimations);
      animationTick(draw, ANIMATION_CICLE_TIME);
    },
  };
};
