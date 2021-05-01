import React from 'react'
import './Character.scss'

export default class Character extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div class="row justify-content-center">
                <img src={this.props.image} id="Throw-Eyes-Character" />
            </div>
        )
    }
}