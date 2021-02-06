import React from 'react';
import './Game1.scss';
import DragImage from './Drag';
import DropImage from './Drop';
  
export default class Game1 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <DragImage />
                <DropImage />
            </div>
        )
    }

}
