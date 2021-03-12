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

const imageModulesRunKnees = importAll(
  require.context('../../assets/games/mix&match/Run_Knees/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);

/*
const imageModulesHopLegs = importAll(
  require.context('../../assets/games/mix&match/Hop_Legs/Difficulty 2/', false, /\.(png|jpe?g|svg)$/)
);
*/

let balanceArmsImages = Object.values(imageModulesBalanceArms);
balanceArmsImages = assignMaMValues(Object.keys(imageModulesBalanceArms), balanceArmsImages);
let MaMBalanceArms = shuffleArray(balanceArmsImages);
MaMBalanceArms = sortMaMImages(MaMBalanceArms);

let jumpArmsImages = Object.values(imageModulesJumpArms);
jumpArmsImages = assignMaMValues(Object.keys(imageModulesJumpArms), jumpArmsImages);
let MaMJumpArms = shuffleArray(jumpArmsImages);
MaMJumpArms = sortMaMImages(MaMJumpArms);

let leapLegsImages = Object.values(imageModulesLeapLegs);
leapLegsImages = assignMaMValues(Object.keys(imageModulesLeapLegs), leapLegsImages);
let MaMLeapLegs = shuffleArray(leapLegsImages);
MaMLeapLegs = sortMaMImages(MaMLeapLegs);

let runArmsImages = Object.values(imageModulesRunArms);
runArmsImages = assignMaMValues(Object.keys(imageModulesRunArms), runArmsImages);
let MaMRunArms = shuffleArray(runArmsImages);
MaMRunArms = sortMaMImages(MaMRunArms);

let runKneesImages = Object.values(imageModulesRunKnees);
runKneesImages = assignMaMValues(Object.keys(imageModulesRunKnees), runKneesImages);
let MaMRunKnees = shuffleArray(runKneesImages);
MaMRunKnees = sortMaMImages(MaMRunKnees);
console.log(MaMRunKnees)

/*
console.log(imageModulesHopLegs)
let hopLegsImages = Object.values(imageModulesHopLegs);
hopLegsImages = assignMaMValues(hopLegsImages);
let MaMHopLegs = shuffleArray(hopLegsImages);
MaMHopLegs = sortMaMImages(MaMHopLegs);
*/
export {
    MaMBalanceArms,
    MaMJumpArms,
    MaMLeapLegs,
    MaMRunArms,
    MaMRunKnees,
    //MaMHopLegs,
}
