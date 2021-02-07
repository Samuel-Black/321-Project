import shuffleArray from '../components/images/Randomize-Images';
import assignValues from '../components/images/Assign-Values';
import sortImages from '../components/images/Sort-Images';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModules = importAll(
  require.context('../assets/games/mix&match/Balance_Arms/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

let images = Object.values(imageModules);
images = assignValues(images);
let MaMBalanceArms = shuffleArray(images);
MaMBalanceArms = sortImages(MaMBalanceArms);


export {
    MaMBalanceArms,
}
