import React from 'react'
import Character from '../../components/throweyes/Character'
import Target from '../../components/throweyes/Target'
import { returnRandomThrowEyesChar } from '../../components/images/Image-Functions'
import GamePopup from '../../components/Game-Popup'
import './Throw-Eyes.scss'
import 'reactjs-popup/dist/index.css';

export default class ThrowEyes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            levelCleared: false,
            character: this.setChar()
        };
    }

    difficulty = 0;
    
    easyTargets = [false,true,false,true,false];
    mediumTargets = [false,true,true,true,false];
    hardTargets = [true,true,true,true,true];

    setChar() {
        if(this.difficulty === 0) {
            return returnRandomThrowEyesChar(this.props.shuffledImages.easy)
        }
        else if (this.difficulty === 1) {
            return returnRandomThrowEyesChar(this.props.shuffledImages.medium)
        }
        else if (this.difficulty === 2) {
            return returnRandomThrowEyesChar(this.props.shuffledImages.hard)
        }
    }

    winCondition(targetID) {
        if(targetID === this.state.character.id) {
            this.difficulty++;
            this.setState({
                character: this.setChar()
            });
        }
        else {
            console.log('nope');
        }
    }

    render() {
        return (
            <div className="game-background">
            {this.props.backButton}
                {this.difficulty === 0 && 
                    <div id={'Throw-Eyes-Easy'} className="container-fluid">
                        <GamePopup />
                        <Character image={this.state.character.default} />

                        <div className="row justify-content-center">
                            {this.easyTargets.map((target, i) => ( 
                            <div class="col-lg-2">
                                {target == true ?  <a onClick={this.winCondition.bind(this, i+1)}> <Target image={this.props.shuffledImages.target.default} targetID={this.state.character.id} /> </a> : <span></span> }
                            </div>
                            ))}
                        </div>
                    </div>
                }

                {this.difficulty === 1 &&
                    <div id={'Throw-Eyes-Medium'} className="container-fluid">
                        
                        <Character image={this.state.character.default} />

                        <div className="row justify-content-center">
                            {this.mediumTargets.map((target, i) => ( 
                            <div class="col-lg-2">
                                {target == true ?  <a onClick={this.winCondition.bind(this, i+1)}> <Target image={this.props.shuffledImages.target.default} targetID={this.state.character.id} /> </a> : <span></span> }
                            </div>
                            ))}
                        </div>
                    </div>
                }

                {this.difficulty === 2 &&
                    <div id={'Throw-Eyes-Hard'} className="container-fluid">
                        
                        <Character image={this.state.character.default} />

                        <div className="row justify-content-center">
                            {this.hardTargets.map((target, i) => ( 
                            <div class="col-lg-2">
                                {target == true ?  <a onClick={this.winCondition.bind(this, i+1)}> <Target image={this.props.shuffledImages.target.default} targetID={this.state.character.id} /> </a> : <span></span> }
                            </div>
                            ))}
                        </div>
                    </div>
                }

            </div>
        )
    }
}
