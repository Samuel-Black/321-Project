import { shuffleArray, assignThrowEyesValues, sortThrowEyesImages } from './Image-Functions';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModules = importAll(
  require.context('../../assets/games/hotspot/Throw_Eyes/', false, /\.(png|jpe?g|svg)$/)
);

let images = Object.values(imageModules);
images = assignThrowEyesValues(images);
let HotSpotThrowEyes = sortThrowEyesImages(images);
//HotSpotThrowEyes = shuffleArray(HotSpotThrowEyes);

export {
    HotSpotThrowEyes,
}
