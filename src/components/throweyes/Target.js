import React from 'react'
import './Target.scss'


export default class Target extends React.Component {

    render() {
        return(
            <img src={this.props.image} class="Throw-Eyes-Target" targetID={this.props.targetID} />
        )
    }
}