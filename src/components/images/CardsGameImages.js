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
let CardsBalanceEyes = shuffleArray(balanceEyesImages);
CardsBalanceEyes = sortCardsArray(CardsBalanceEyes);

const imageModulesBalanceLegs = importAll(
  require.context('../../assets/games/cards/BalanceLegs/', false, /\.(png|jpe?g|svg)$/)
);
let balanceLegsImages = Object.values(imageModulesBalanceLegs);
balanceLegsImages = assignCardsValues(Object.keys(imageModulesBalanceLegs), balanceLegsImages);
let CardsBalanceLegs = shuffleArray(balanceLegsImages);
CardsBalanceLegs = sortCardsArray(CardsBalanceLegs);

const imageModulesHopEyes = importAll(
  require.context('../../assets/games/cards/HopEyes/', false, /\.(png|jpe?g|svg)$/)
);
let hopEyesImages = Object.values(imageModulesHopEyes);
hopEyesImages = assignCardsValues(Object.keys(imageModulesHopEyes), hopEyesImages);
let CardsHopEyes = shuffleArray(hopEyesImages);
CardsHopEyes = sortCardsArray(CardsHopEyes);

const imageModulesJumpFeet = importAll(
  require.context('../../assets/games/cards/JumpFeet/', false, /\.(png|jpe?g|svg)$/)
);
let jumpFeetImages = Object.values(imageModulesJumpFeet);
jumpFeetImages = assignCardsValues(Object.keys(imageModulesJumpFeet), jumpFeetImages);
let CardsJumpFeet = shuffleArray(jumpFeetImages);
CardsJumpFeet = sortCardsArray(CardsJumpFeet);

const imageModulesJumpKnees = importAll(
  require.context('../../assets/games/cards/JumpKnees/', false, /\.(png|jpe?g|svg)$/)
);
let jumpKneesImages = Object.values(imageModulesJumpKnees);
jumpKneesImages = assignCardsValues(Object.keys(imageModulesJumpKnees), jumpKneesImages);
let CardsJumpKnees = shuffleArray(jumpKneesImages);
CardsJumpKnees = sortCardsArray(CardsJumpKnees);

const imageModulesKickEyes = importAll(
  require.context('../../assets/games/cards/KickEyes/', false, /\.(png|jpe?g|svg)$/)
);
let kickEyesImages = Object.values(imageModulesKickEyes);
kickEyesImages = assignCardsValues(Object.keys(imageModulesKickEyes), kickEyesImages);
let CardsKickEyes = shuffleArray(kickEyesImages);
CardsKickEyes = sortCardsArray(CardsKickEyes);

const imageModulesKickFoot = importAll(
  require.context('../../assets/games/cards/KickFoot/', false, /\.(png|jpe?g|svg)$/)
);
let kickFootImages = Object.values(imageModulesKickFoot);
kickFootImages = assignCardsValues(Object.keys(imageModulesKickFoot), kickFootImages);
let CardsKickFoot = shuffleArray(kickFootImages);
CardsKickFoot = sortCardsArray(CardsKickFoot);

const imageModulesKickLegs = importAll(
  require.context('../../assets/games/cards/KickLegs/', false, /\.(png|jpe?g|svg)$/)
);
let kickLegsImages = Object.values(imageModulesKickLegs);
kickLegsImages = assignCardsValues(Object.keys(imageModulesKickLegs), kickLegsImages);
let CardsKickLegs = shuffleArray(kickLegsImages);
CardsKickLegs = sortCardsArrayWithZoom(CardsKickLegs);

const imageModulesLeapEyes = importAll(
  require.context('../../assets/games/cards/LeapEyes/', false, /\.(png|jpe?g|svg)$/)
);
let leapEyesImages = Object.values(imageModulesLeapEyes);
leapEyesImages = assignCardsValues(Object.keys(imageModulesLeapEyes), leapEyesImages);
let CardsLeapEyes = shuffleArray(leapEyesImages);
CardsLeapEyes = sortCardsArray(CardsLeapEyes);

const imageModulesRunEyes = importAll(
  require.context('../../assets/games/cards/RunEyes/', false, /\.(png|jpe?g|svg)$/)
);
let runEyesImages = Object.values(imageModulesRunEyes);
runEyesImages = assignCardsValues(Object.keys(imageModulesRunEyes), runEyesImages);
let CardsRunEyes = shuffleArray(runEyesImages);
CardsRunEyes = sortCardsArray(CardsRunEyes);

const imageModulesSlideFeet = importAll(
  require.context('../../assets/games/cards/SlideFeet/', false, /\.(png|jpe?g|svg)$/)
);
let slideFeetImages = Object.values(imageModulesSlideFeet);
slideFeetImages = assignCardsValues(Object.keys(imageModulesSlideFeet), slideFeetImages);
let CardsSlideFeet = shuffleArray(slideFeetImages);
CardsSlideFeet = sortCardsArray(CardsSlideFeet);

const imageModulesHopArms = importAll(
  require.context('../../assets/games/hotspot/Hop_Arms/', false, /\.(png|jpe?g|svg)$/)
);
let hopArmsImages = Object.values(imageModulesHopArms);
hopArmsImages = assignHopArmsValues(Object.keys(imageModulesHopArms), hopArmsImages);
let CardsHopArms = shuffleArray(hopArmsImages);
CardsHopArms = sortHopArmsArray(CardsHopArms);

export {
    CardsBalanceEyes,
    CardsBalanceLegs,
    CardsHopEyes,
    CardsJumpFeet,
    CardsJumpKnees,
    CardsKickEyes,
    CardsKickFoot,
    CardsKickLegs,
    CardsLeapEyes,
    CardsRunEyes,
    CardsSlideFeet,
    CardsHopArms,
}
