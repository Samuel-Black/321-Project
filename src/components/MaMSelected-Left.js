import React from 'react'
import img1 from '../assets/games/mix&match/Balance_Arms/Difficulty 2/MixandMatchCards__Balance_Arms2_Left_Correct1.png'

export default class SelectedCardLeft extends React.Component {
    constructor() {
      super();
    }
    
    render() {
      return (
          <img src={img1}  style={{ height: 400 }} />
        )
    }
  }
