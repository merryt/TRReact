import React, { Component, PropTypes } from 'react';
import marked from 'marked'
import CheckList from './CheckList';
import { DragSource, DropTarget } from 'react-dnd';
import { CARD } from './constants';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let titlePropType = (props, propName, componentName) =>  {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName}  is longer than 80 characters`
      );
    }
  }
}

const cardDragSpec = {
  beginDrag(props) {
    props.cardCallbacks.prepareMove(props.id);
    return {
      id: props.id
    };
  },
  endDrag(props) {
    props.cardCallbacks.persistMove(props.id);
  }
};


const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id)
  }
}


let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}



class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList taskCallbacks={this.props.taskCallbacks}
                     tasks={this.props.tasks} cardId={this.props.id} />
        </div>
      );
    }

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return connectDropTarget(connectDragSource(
      <div className='card'>
        <div style={sideColor}/>
        <div className="card__edit"></div>
        <div className={
          this.state.showDetails? "card__title card__title--is-open" : "card__title"
          } onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        <ReactCSSTransitionGroup transitionName="toggle">
        {cardDetails}
        </ ReactCSSTransitionGroup>
      </div>
    ));
  }
}
Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.array,
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};


let dragHighOrderCard = DragSource(CARD, cardDragSpec, collectDrag)(Card);
let dragDropHighOrderCard = DropTarget(CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard
