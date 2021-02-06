import React from "react";
import Source from "./Source";
import Target from "./Target";
import './Game2.scss';
import { ItemTypes } from '../components/DragItemTypes';
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

export default class Container extends React.Component {
    constructor() {
      super();
      this.state = {
        droppedItemLeft: {},
        droppedItemRight: {},
        win: false
      };
      this.onDropLeft = this.onDropLeft.bind(this);
      this.onDropRight = this.onDropRight.bind(this);
    }
  
    onDropLeft(item) {
      this.setState({
        droppedItemLeft: item
      });
      this.winCondition();
    }
  
    onDropRight(item) {
      this.setState({
        droppedItemRight: item
      });
      this.winCondition();
    }

    winCondition() {
      if(this.state.droppedItemLeft.correct && this.state.droppedItemRight.correct) {
        this.setState({
          win: true
        });
      }
    }
  
    render() {
      return (
        <div className="game-background">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg">
                {shuffledImages.left.map((image) => (
                <div className="row justify-content-center">
                  <Source image={image.default} correct={image.correct} position={image.position} />
                </div>
                ))}
              </div>
              
              <div className= "row">
                <div className="col-lg-12">
                  {this.state.win ? 'True' : 'False'}
                </div>
                <div className="col-lg">
                  <Target position={ItemTypes.CARDLEFT} droppedItem={this.state.droppedItemLeft} onDrop={this.onDropLeft} />
                </div>
                <div className="col-lg">
                  <Target position={ItemTypes.CARDRIGHT} droppedItem={this.state.droppedItemRight} onDrop={this.onDropRight} />
                </div>
              </div>

              <div className="col-lg">
                {shuffledImages.right.map((image) => (
                  <div className="row justify-content-center">
                    <Source image={image.default} correct={image.correct} position={image.position} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
}
