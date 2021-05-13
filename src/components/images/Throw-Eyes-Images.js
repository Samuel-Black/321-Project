/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { assignThrowEyesValues, sortThrowEyesImages } from './Image-Functions';

// import all images in a specified folder
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

// import all images, assign appropriate object values and randomize the order for ThrowEyes
const imageModules = importAll(
  require.context('../../assets/games/hotspot/Throw_Eyes/', false, /\.(png|jpe?g|svg)$/)
);
let images = Object.values(imageModules);
images = assignThrowEyesValues(images);
let ThrowEyes = sortThrowEyesImages(images);

export {
    ThrowEyes,
}
