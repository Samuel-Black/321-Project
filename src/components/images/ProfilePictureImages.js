
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModules = importAll(
  require.context('../../assets/profile-pictures/', false, /\.(png|jpe?g|svg)$/)
);

let ProfilePictureImages = Object.values(imageModules);

export {
    ProfilePictureImages,
}