import { shuffleArray, assignCardsValues, assignHopArmsValues, sortCardsArray, sortCardsArrayWithZoom, sortHopArmsArray } from './Image-Functions';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const imageModulesBalanceEyes = importAll(
  require.context('../../assets/games/cards/BalanceEyes/', false, /\.(png|jpe?g|svg)$/)
);
let balanceEyesImages = Object.values(imageModulesBalanceEyes);
balanceEyesImages = assignCardsValues(Object.keys(imageModulesBalanceEyes), balanceEyesImages);
let BalanceEyes = shuffleArray(balanceEyesImages);
BalanceEyes = sortCardsArray(BalanceEyes);

const imageModulesBalanceLegs = importAll(
  require.context('../../assets/games/cards/BalanceLegs/', false, /\.(png|jpe?g|svg)$/)
);
let balanceLegsImages = Object.values(imageModulesBalanceLegs);
balanceLegsImages = assignCardsValues(Object.keys(imageModulesBalanceLegs), balanceLegsImages);
let BalanceLegs = shuffleArray(balanceLegsImages);
BalanceLegs = sortCardsArray(BalanceLegs);

const imageModulesHopEyes = importAll(
  require.context('../../assets/games/cards/HopEyes/', false, /\.(png|jpe?g|svg)$/)
);
let hopEyesImages = Object.values(imageModulesHopEyes);
hopEyesImages = assignCardsValues(Object.keys(imageModulesHopEyes), hopEyesImages);
let HopEyes = shuffleArray(hopEyesImages);
HopEyes = sortCardsArray(HopEyes);

const imageModulesJumpFeet = importAll(
  require.context('../../assets/games/cards/JumpFeet/', false, /\.(png|jpe?g|svg)$/)
);
let jumpFeetImages = Object.values(imageModulesJumpFeet);
jumpFeetImages = assignCardsValues(Object.keys(imageModulesJumpFeet), jumpFeetImages);
let JumpFeet = shuffleArray(jumpFeetImages);
JumpFeet = sortCardsArray(JumpFeet);

const imageModulesJumpKnees = importAll(
  require.context('../../assets/games/cards/JumpKnees/', false, /\.(png|jpe?g|svg)$/)
);
let jumpKneesImages = Object.values(imageModulesJumpKnees);
jumpKneesImages = assignCardsValues(Object.keys(imageModulesJumpKnees), jumpKneesImages);
let JumpKnees = shuffleArray(jumpKneesImages);
JumpKnees = sortCardsArray(JumpKnees);

const imageModulesKickEyes = importAll(
  require.context('../../assets/games/cards/KickEyes/', false, /\.(png|jpe?g|svg)$/)
);
let kickEyesImages = Object.values(imageModulesKickEyes);
kickEyesImages = assignCardsValues(Object.keys(imageModulesKickEyes), kickEyesImages);
let KickEyes = shuffleArray(kickEyesImages);
KickEyes = sortCardsArray(KickEyes);

const imageModulesKickFoot = importAll(
  require.context('../../assets/games/cards/KickFoot/', false, /\.(png|jpe?g|svg)$/)
);
let kickFootImages = Object.values(imageModulesKickFoot);
kickFootImages = assignCardsValues(Object.keys(imageModulesKickFoot), kickFootImages);
let KickFoot = shuffleArray(kickFootImages);
KickFoot = sortCardsArray(KickFoot);

const imageModulesKickLegs = importAll(
  require.context('../../assets/games/cards/KickLegs/', false, /\.(png|jpe?g|svg)$/)
);
let kickLegsImages = Object.values(imageModulesKickLegs);
kickLegsImages = assignCardsValues(Object.keys(imageModulesKickLegs), kickLegsImages);
let KickLegs = shuffleArray(kickLegsImages);
KickLegs = sortCardsArrayWithZoom(KickLegs);

const imageModulesLeapEyes = importAll(
  require.context('../../assets/games/cards/LeapEyes/', false, /\.(png|jpe?g|svg)$/)
);
let leapEyesImages = Object.values(imageModulesLeapEyes);
leapEyesImages = assignCardsValues(Object.keys(imageModulesLeapEyes), leapEyesImages);
let LeapEyes = shuffleArray(leapEyesImages);
LeapEyes = sortCardsArray(LeapEyes);

const imageModulesRunEyes = importAll(
  require.context('../../assets/games/cards/RunEyes/', false, /\.(png|jpe?g|svg)$/)
);
let runEyesImages = Object.values(imageModulesRunEyes);
runEyesImages = assignCardsValues(Object.keys(imageModulesRunEyes), runEyesImages);
let RunEyes = shuffleArray(runEyesImages);
RunEyes = sortCardsArray(RunEyes);

const imageModulesSlideFeet = importAll(
  require.context('../../assets/games/cards/SlideFeet/', false, /\.(png|jpe?g|svg)$/)
);
let slideFeetImages = Object.values(imageModulesSlideFeet);
slideFeetImages = assignCardsValues(Object.keys(imageModulesSlideFeet), slideFeetImages);
let SlideFeet = shuffleArray(slideFeetImages);
SlideFeet = sortCardsArray(SlideFeet);

const imageModulesHopArms = importAll(
  require.context('../../assets/games/hotspot/Hop_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let hopArmsImages = Object.values(imageModulesHopArms);
hopArmsImages = assignHopArmsValues(Object.keys(imageModulesHopArms), hopArmsImages);
let HopArms = shuffleArray(hopArmsImages);
HopArms = sortHopArmsArray(HopArms);

export {
    BalanceEyes,
    BalanceLegs,
    HopEyes,
    JumpFeet,
    JumpKnees,
    KickEyes,
    KickFoot,
    KickLegs,
    LeapEyes,
    RunEyes,
    SlideFeet,
    HopArms,
}
