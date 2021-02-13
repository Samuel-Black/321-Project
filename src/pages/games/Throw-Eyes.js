import React from 'react'
import './Throw-Eyes.scss'

export default class ThrowEyes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            win: false
        };
        console.log(this.props.shuffledImages);
    }

    render() {
        return (
            <div>
                {this.props.shuffledImages.easy.map((image) => (
                <div className="row justify-content-center">
                    <img src={image.default} />
                </div>
                ))}
                {this.props.shuffledImages.medium.map((image) => (
                <div className="row justify-content-center">
                    <img src={image.default} />
                </div>
                ))}
                {this.props.shuffledImages.hard.map((image) => (
                <div className="row justify-content-center">
                    <img src={image.default} />
                </div>
                ))}
            </div>
        )
    }
}
