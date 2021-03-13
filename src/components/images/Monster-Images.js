
const importAll = require =>
require.keys().reduce((acc, next) => {
  acc[next.replace("./", "")] = require(next);
  return acc;
}, {});

const imageModules = importAll(
require.context('../../assets/monsters/', false, /\.(png|jpe?g|svg)$/)
);

let MonsterImages = Object.values(imageModules);

export {
  MonsterImages,
}