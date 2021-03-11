import { shuffleArray, assignMaMValues, sortMaMImages } from './Image-Functions';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModulesBalanceArms = importAll(
  require.context('../../assets/games/mix&match/Balance_Arms/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

const imageModulesJumpArms = importAll(
  require.context('../../assets/games/mix&match/Jump_Arms/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

const imageModulesLeapLegs = importAll(
  require.context('../../assets/games/mix&match/Leap_Legs/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

const imageModulesRunArms = importAll(
  require.context('../../assets/games/mix&match/Run_Arms/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

let balanceArmsImages = Object.values(imageModulesBalanceArms);
balanceArmsImages = assignMaMValues(balanceArmsImages);
let MaMBalanceArms = shuffleArray(balanceArmsImages);
MaMBalanceArms = sortMaMImages(MaMBalanceArms);

let jumpArmsImages = Object.values(imageModulesJumpArms);
jumpArmsImages = assignMaMValues(jumpArmsImages);
let MaMJumpArms = shuffleArray(jumpArmsImages);
MaMJumpArms = sortMaMImages(MaMJumpArms);

let leapLegsImages = Object.values(imageModulesLeapLegs);
leapLegsImages = assignMaMValues(leapLegsImages);
let MaMLeapLegs = shuffleArray(leapLegsImages);
MaMLeapLegs = sortMaMImages(MaMLeapLegs);

let runArmsImages = Object.values(imageModulesRunArms);
runArmsImages = assignMaMValues(runArmsImages);
let MaMRunArms = shuffleArray(runArmsImages);
MaMRunArms = sortMaMImages(MaMRunArms);

export {
    MaMBalanceArms,
    MaMJumpArms,
    MaMLeapLegs,
    MaMRunArms,
}
