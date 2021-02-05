import React from "react";
import Source from "./Source";
import Target from "./Target";
import { ItemTypes } from '../components/DragItemTypes'
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
let shuffledImages = shuffleArray(images);
shuffledImages = sortImages(shuffledImages);

console.log(shuffledImages);

export default class Container extends React.Component {
    constructor() {
      super();
      this.state = {
        droppedItemLeft: {},
        droppedItemRight: {}
      };
      this.onDropLeft = this.onDropLeft.bind(this);
      this.onDropRight = this.onDropRight.bind(this);
    }
  
    onDropLeft(item) {
      this.setState({
        droppedItemLeft: item
      });
    }
  
    onDropRight(item) {
      this.setState({
        droppedItemRight: item
      });
    }
  
    render() {
      return (
        <div className="App">
          <div className="source">
          {shuffledImages.left.map((image) => (
            <Source image={image.default} correct={image.correct} position={image.position} />
          ))}
          </div>
          <div className="destination">
            <Target position={'Left'} droppedItem={this.state.droppedItemLeft} onDrop={this.onDropLeft} />
          </div>
          <div className="destination">
            <Target position={'Right'} droppedItem={this.state.droppedItemRight} onDrop={this.onDropRight} />
          </div>
          {shuffledImages.right.map((image) => (
            <Source image={image.default} correct={image.correct} position={image.position} />
          ))}
        </div>
      );
    }
}
