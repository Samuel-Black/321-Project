import { shuffleArray, assignMaMValues, sortMaMImages } from './Image-Functions';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModulesBalanceArms = importAll(
  require.context('../../assets/games/mix&match/Balance_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let balanceArmsImages = Object.values(imageModulesBalanceArms);
balanceArmsImages = assignMaMValues(Object.keys(imageModulesBalanceArms), balanceArmsImages);
let BalanceArms = shuffleArray(balanceArmsImages);
BalanceArms = sortMaMImages(BalanceArms);

const imageModulesJumpArms = importAll(
  require.context('../../assets/games/mix&match/Jump_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let jumpArmsImages = Object.values(imageModulesJumpArms);
jumpArmsImages = assignMaMValues(Object.keys(imageModulesJumpArms), jumpArmsImages);
let JumpArms = shuffleArray(jumpArmsImages);
JumpArms = sortMaMImages(JumpArms);

const imageModulesLeapLegs = importAll(
  require.context('../../assets/games/mix&match/Leap_Legs/', false, /\.(png|jpe?g|svg)$/)
);
let leapLegsImages = Object.values(imageModulesLeapLegs);
leapLegsImages = assignMaMValues(Object.keys(imageModulesLeapLegs), leapLegsImages);
let LeapLegs = shuffleArray(leapLegsImages);
LeapLegs = sortMaMImages(LeapLegs);

const imageModulesRunArms = importAll(
  require.context('../../assets/games/mix&match/Run_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let runArmsImages = Object.values(imageModulesRunArms);
runArmsImages = assignMaMValues(Object.keys(imageModulesRunArms), runArmsImages);
let RunArms = shuffleArray(runArmsImages);
RunArms = sortMaMImages(RunArms);

const imageModulesRunKnees = importAll(
  require.context('../../assets/games/mix&match/Run_Knees/', false, /\.(png|jpe?g|svg)$/)
);
let runKneesImages = Object.values(imageModulesRunKnees);
runKneesImages = assignMaMValues(Object.keys(imageModulesRunKnees), runKneesImages);
let RunKnees = shuffleArray(runKneesImages);
RunKnees = sortMaMImages(RunKnees);

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
