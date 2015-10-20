import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { CIRCLE } from './constants';

const circleSpec = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`You dropped ${item.name} into ${dropResult.name}`);
    }
  }
};

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


class Circle extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    const style = {
      opacity: opacity
    };

    // NOTE: be sure to use a dragSource fn (e.g. connectDragSource(...))
    // to encapsulate the render.
    return (
      connectDragSource(
        <div className='circle' style={style}>
          {name}
        </div>
      )
    );
  }
}

Circle.propType = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default DragSource(CIRCLE, circleSpec, collect)(Circle);
