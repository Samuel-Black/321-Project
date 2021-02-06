import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import "./Target.scss";

class Target extends Component {

    render() {
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        let className = "";
        if (isOver && canDrop) {
            className = "green";
        } else if (!isOver && canDrop) {
            className = "yellow";
        } else if (isOver && !canDrop) {
            className = "red";
        }

        return connectDropTarget(
            <div id={this.props.position == 'Left' ? 'Left-Target' : 'Right-Target'} className={`target ${className}`} correct={droppedItem.correct}>
                <img src={droppedItem.image} />
            </div>
        );
    }
}

const spec = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    props.onDrop(item);
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}

const position = {
  getPosition(props) {
    const item = props.position;
    return item;
  }
};

export default DropTarget(position.getPosition, spec, collect)(Target);
