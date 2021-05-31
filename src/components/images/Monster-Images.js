/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// import all images in a specified folder
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

// import all images in a folder for monster image in skill/game level links
const imageModules = importAll(
  require.context('../../assets/monsters/', false, /\.(png|jpe?g|svg)$/)
);

let MonsterImages = Object.values(imageModules);

export {
  MonsterImages,
}