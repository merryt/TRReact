import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import { CIRCLE } from './constants';

const circleTargetSpec = {
  drop() {
    return { name: 'CircleBin' };
  }
};


let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class CircleBin extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#FFFFFF';
    if (isActive) {
      backgroundColor = '#F7F7BD';
    } else if (canDrop) {
      backgroundColor = '#F7F7F7';
    }

    const style = {
      backgroundColor: backgroundColor
    };

    return connectDropTarget(
      <div className='circle-bin' style={style}>
        {isActive ?
          'Release the circle' :
          'Drag here!'
        }
      </div>
    );
  }
}

CircleBin.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default DropTarget(CIRCLE, circleTargetSpec, collect)(CircleBin);
