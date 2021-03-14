import { shuffleArray, assignCardsValues, sortCardsArray } from './Image-Functions';

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

export {
    CardsBalanceEyes,
}
