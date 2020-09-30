export const imageLoader = (pathArray = []) => {
  const promises = pathArray.map((path) => {
    return new Promise(((resolve, reject) => {
      let img = new Image();

      img.addEventListener(`load`, () => {
        resolve(img);
      }, false);

      img.addEventListener(`error`, () => {
        reject(`Не удалось загрузить файл: ${path}`);
      });

      img.src = path;
    }));
  });

  return Promise.all(promises);
};
