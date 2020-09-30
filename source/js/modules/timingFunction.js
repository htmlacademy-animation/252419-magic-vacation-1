export const easeOut = (timing) => {
  return (timeFraction) => {
    return 1 - timing(1 - timeFraction);
  };
};

export const elasticIn = (x) => (timeFraction) => {
  return Math.pow(Math.max(x * timeFraction, 2), 10 * (timeFraction - 1)) * Math.cos(10 * Math.PI * timeFraction);
};

export const elasticOut = (x) => easeOut(elasticIn(x));

export const linear = (timeFraction) => timeFraction;
