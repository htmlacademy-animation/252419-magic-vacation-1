import {
  rotateCtx,
  animationTick,
  animateCtx,
  serialAnimations,
} from './helpers';

const ANIMATION_CYCLE_TIME = 500;
const TREE_ANIMATION_CYCLE_TIME = 300;
const DELAY = 300;

const TRAIL_COLOR = `rgb(172, 195, 255)`;
const TREE_COLOR = `rgb(92, 66, 137)`;

const windowHW = window.innerWidth / 2;
const windowHH = window.innerHeight / 2;

const planeWidth = 80;
const planeHeight = 77;

const planeStart = {
  x: windowHW - 50,
  y: windowHH - 240,
};

const planeFinish = {
  x: windowHW + 354,
  y: windowHH - 133,
};

const staticTreeTopPoint = {
  x: windowHW + 100,
  y: windowHH - 100,
};

const dynamicTreeTopPoint = {
  x: windowHW + 50,
  y: 0,
};

const initialAngle = 90;

let planeOpacity = 0;
let translateY = 0;
let translateX = 0;
let angle = 0;
let ellipseHeight = 0;
let renderPlane = false;
let animationProgress = 0;
let treeOpacity = 0;

const getPlaneTail = () => ({
  x: translateX + planeWidth * 0.14,
  y: translateY + planeHeight * 0.865,
});

const translateAnimationTick = (from, to) => (progress) => {
  translateX = animationTick(from.x, to.x, progress);
  translateY =
    from.y -
    (
      Math.sign(to.y - from.y) *
      Math.abs(to.y - from.y) *
      Math.sin((progress * Math.PI) - (5 / 4 * Math.PI))
    );
};

const rotateAnimationTick = (from, to) => (progress) => {
  angle = animationTick(from, to, progress);
};

const opacityAnimationTick = (from, to) => (progress) => {
  planeOpacity = animationTick(from, to, progress);
};

const currentAnimationTick = (progress) => {
  animationProgress = progress;
};

const treeTranslateYAnimationTick = (from, to) => (progress) => {
  dynamicTreeTopPoint.y = animationTick(from, to, progress);
};

const treeOpacityAnimationTick = (from, to) => (progress) => {
  treeOpacity = animationTick(from, to, progress);
};

const getNormalizedTrailBezierOffset = (val) => val * animationProgress;

const ellipseAnimationTick = (from, to) => (progress) => {
  ellipseHeight = animationTick(from, to, progress);
};

const rotateAnimations = [
  () => animateCtx(rotateAnimationTick(initialAngle, initialAngle), ANIMATION_CYCLE_TIME * 0.35),
  () => animateCtx(rotateAnimationTick(initialAngle, -10), ANIMATION_CYCLE_TIME - (ANIMATION_CYCLE_TIME * 0.35)),
];
const airplaneAnimate = (ctx, img) => {
  const drawPlane = () => {
    ctx.save();
    const planeTail = getPlaneTail();
    rotateCtx(ctx, angle, planeTail.x, planeTail.y);
    ctx.globalAlpha = planeOpacity;
    ctx.translate(translateX, translateY);
    ctx.drawImage(img, 0, 0, planeWidth, planeHeight);
    ctx.restore();
  };

  const drawStaticTree = () => {
    ctx.beginPath();
    ctx.moveTo(staticTreeTopPoint.x, staticTreeTopPoint.y);
    ctx.lineTo(staticTreeTopPoint.x + 40, staticTreeTopPoint.y + 200);
    ctx.lineTo(staticTreeTopPoint.x - 40, staticTreeTopPoint.y + 200);
    ctx.fill();
    ctx.closePath();
  };

  const drawDynamicTree = () => {
    ctx.beginPath();
    ctx.moveTo(dynamicTreeTopPoint.x, dynamicTreeTopPoint.y);
    ctx.lineTo(dynamicTreeTopPoint.x + 50, dynamicTreeTopPoint.y + 300);
    ctx.lineTo(dynamicTreeTopPoint.x - 50, dynamicTreeTopPoint.y + 300);
    ctx.globalAlpha = treeOpacity;
    ctx.fill();
    ctx.closePath();
  };

  const drawTrees = () => {
    ctx.fillStyle = TREE_COLOR;
    drawStaticTree();
    drawDynamicTree();
  };

  const drawTrail = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(planeStart.x, planeStart.y);
    const planeTail = getPlaneTail();
    const cp1 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(145),
      y: planeStart.y + getNormalizedTrailBezierOffset(10),
    };
    const cp2 = {
      x: planeTail.x - getNormalizedTrailBezierOffset(143),
      y: planeTail.y + getNormalizedTrailBezierOffset(59),
    };
    const cp3 = {
      x: planeTail.x - getNormalizedTrailBezierOffset(42),
      y: planeTail.y + getNormalizedTrailBezierOffset(71),
    };
    const cp4 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(240),
      y: planeStart.y + getNormalizedTrailBezierOffset(325),
    };
    const cp5 = {
      x: planeStart.x - getNormalizedTrailBezierOffset(280),
      y: planeStart.y + ellipseHeight,
    };
    const cp6 = {
      x: planeStart.x - getNormalizedTrailBezierOffset(280),
      y: planeStart.y,
    };
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, planeTail.x, planeTail.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, planeStart.x, planeStart.y + ellipseHeight);
    ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, planeStart.x, planeStart.y);
    ctx.fillStyle = TRAIL_COLOR;
    ctx.globalAlpha = planeOpacity;
    ctx.fill();
    ctx.closePath();
    ctx.clip();
    drawTrees();
    ctx.restore();
  };

  const draw = () => {
    if (!renderPlane) {
      return;
    }

    drawPlane();
    drawTrail();
  };

  const animateTrail = () => {
    animateCtx(ellipseAnimationTick(0, 340), ANIMATION_CYCLE_TIME);
  };

  const animatePlane = () => {
    animateCtx(translateAnimationTick(planeStart, planeFinish), ANIMATION_CYCLE_TIME);
    serialAnimations(rotateAnimations);
  };

  const animateTree = () => {
    animateCtx(treeTranslateYAnimationTick(windowHH - 50, windowHH - 190), TREE_ANIMATION_CYCLE_TIME);
    animateCtx(treeOpacityAnimationTick(0.5, 1), TREE_ANIMATION_CYCLE_TIME);
  };

  const animate = () => {
    setTimeout(() => {
      if (!renderPlane) {
        renderPlane = true;
      }
      animatePlane();
      animateTrail();
      animateCtx(currentAnimationTick, ANIMATION_CYCLE_TIME);
      animateCtx(opacityAnimationTick(0, 1), ANIMATION_CYCLE_TIME * 0.3);

      setTimeout(() => {
        animateTree();
      }, ANIMATION_CYCLE_TIME * 0.6);
    }, DELAY);
  };

  return {
    animate,
    draw,
  };
};

export {airplaneAnimate};
