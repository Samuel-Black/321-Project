/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { shuffleArray, assignMaMValues, sortMaMImages } from './Image-Functions';

// import all images in a specified folder
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

// import all images, assign appropriate object values and randomize the order for BalanceArms
const imageModulesBalanceArms = importAll(
  require.context('../../assets/games/mix&match/Balance_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let balanceArmsImages = Object.values(imageModulesBalanceArms);
balanceArmsImages = assignMaMValues(Object.keys(imageModulesBalanceArms), balanceArmsImages);
let BalanceArms = shuffleArray(balanceArmsImages);
BalanceArms = sortMaMImages(BalanceArms);

// import all images, assign appropriate object values and randomize the order for JumpArms
const imageModulesJumpArms = importAll(
  require.context('../../assets/games/mix&match/Jump_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let jumpArmsImages = Object.values(imageModulesJumpArms);
jumpArmsImages = assignMaMValues(Object.keys(imageModulesJumpArms), jumpArmsImages);
let JumpArms = shuffleArray(jumpArmsImages);
JumpArms = sortMaMImages(JumpArms);

// import all images, assign appropriate object values and randomize the order for LeapLegs
const imageModulesLeapLegs = importAll(
  require.context('../../assets/games/mix&match/Leap_Legs/', false, /\.(png|jpe?g|svg)$/)
);
let leapLegsImages = Object.values(imageModulesLeapLegs);
leapLegsImages = assignMaMValues(Object.keys(imageModulesLeapLegs), leapLegsImages);
let LeapLegs = shuffleArray(leapLegsImages);
LeapLegs = sortMaMImages(LeapLegs);

// import all images, assign appropriate object values and randomize the order for RunArms
const imageModulesRunArms = importAll(
  require.context('../../assets/games/mix&match/Run_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let runArmsImages = Object.values(imageModulesRunArms);
runArmsImages = assignMaMValues(Object.keys(imageModulesRunArms), runArmsImages);
let RunArms = shuffleArray(runArmsImages);
RunArms = sortMaMImages(RunArms);

// import all images, assign appropriate object values and randomize the order for RunKnees
const imageModulesRunKnees = importAll(
  require.context('../../assets/games/mix&match/Run_Knees/', false, /\.(png|jpe?g|svg)$/)
);
let runKneesImages = Object.values(imageModulesRunKnees);
runKneesImages = assignMaMValues(Object.keys(imageModulesRunKnees), runKneesImages);
let RunKnees = shuffleArray(runKneesImages);
RunKnees = sortMaMImages(RunKnees);

// import all images, assign appropriate object values and randomize the order for HopLegs
const imageModulesHopLegs = importAll(
  require.context('../../assets/games/mix&match/Hop_Legs/', false, /\.(png|jpe?g|svg)$/)
);
let hopLegsImages = Object.values(imageModulesHopLegs);
hopLegsImages = assignMaMValues(Object.keys(imageModulesHopLegs), hopLegsImages);
let HopLegs = shuffleArray(hopLegsImages);
HopLegs = sortMaMImages(HopLegs);

export {
    BalanceArms,
    JumpArms,
    LeapLegs,
    RunArms,
    RunKnees,
    HopLegs,
}
