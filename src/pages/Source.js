import React, { Component } from "react";
import { DragSource } from "react-dnd";
import "./Source.scss";

class Source extends Component {
  render() {
    const { image, connectDragSource } = this.props;
    return connectDragSource(<div className="square"><img src={image} /></div>);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const cardSource = {
  beginDrag(props, monitor, component) {
    const item = {  image: props.image,
                    correct: props.correct    };
    return item;
  }
};

const position = {
  getPosition(props) {
    const item = props.position;
    return item;
  }
};

export default DragSource(position.getPosition, cardSource, collect)(Source);
