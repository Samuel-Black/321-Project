import React from "react"
import Source from "../../components/mixandmatch/Source"
import Target from "../../components/mixandmatch/Target"
import './MixAndMatch.scss'
import { ItemTypes } from '../../components/DragItemTypes'
import { shuffleArray } from '../../components/images/Image-Functions'

export default class MixAndMatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        droppedItemLeft: {},
        droppedItemRight: {},
        win: false,
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
      } else {
        this.setState({
          win: false
        });
      }
    }

    render() {
      return (
        <div className="game-background">
          {this.props.backButton}
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg">
                {this.props.shuffledImages.left.map((image) => (
                <div className="row justify-content-center">
                  <Source image={image.default} correct={image.correct} position={image.position} />
                </div>
                ))}
              </div>
              
              <div className= "row">
                <div className="col-lg-12">
                  {this.state.win ? 'True' : 'False'}
                </div>
                  <Target position={ItemTypes.CARDLEFT} droppedItem={this.state.droppedItemLeft} onDrop={this.onDropLeft} />
                  <Target position={ItemTypes.CARDRIGHT} droppedItem={this.state.droppedItemRight} onDrop={this.onDropRight} />
              </div>

              <div className="col-lg">
                {this.props.shuffledImages.right.map((image) => (
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
