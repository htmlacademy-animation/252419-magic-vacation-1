import {imageLoader} from './imageLoader';
import {animateCtx} from './helpers';
import {calfAnimate} from './calfAnimate';
import {snowflakesAnimate} from './snowflakersAnimate';
import {airplaneAnimate} from './airplaneAnimate';

export const resultCanvas = () => {
  imageLoader([
    `img/win-primary-images/calf.png`,
    `img/win-primary-images/snowflake.png`,
    `img/win-primary-images/airplane.png`,
  ])
    .then(([
      calf,
      snowflake,
      plane,
    ]) => {
      const canvas = document.querySelector(`#canvas-result`);
      const ctx = canvas.getContext(`2d`);
      const calfRenderer = calfAnimate(ctx, calf);
      const airplane = airplaneAnimate(ctx, plane);
      const flakers = snowflakesAnimate(ctx, snowflake);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const render = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        airplane.draw();
        flakers.draw();
        calfRenderer.draw();
      };

      airplane.animate();
      flakers.animate();
      calfRenderer.animate();
      animateCtx(render, 10000);
    });
};
