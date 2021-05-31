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

// import all images in a folder for profile images
const imageModules = importAll(
  require.context('../../assets/profile-pictures/', false, /\.(png|jpe?g|svg)$/)
);

let ProfilePictureImages = Object.values(imageModules);

export {
    ProfilePictureImages,
}