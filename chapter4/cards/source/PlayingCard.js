import React, { Component, PropTypes } from 'react';
import {SUITS, FACE_VALUES} from 'constants'

class PlayingCard extends Component {
  render(){
    let card;
    let { rank, suit, ...other } = this.props;
    return (
    	<div {...other} className="card-group">
          <div className={`front card ${suit} v${rank}`}
               data-index={`${FACE_VALUES[rank]} ${SUITS[suit].symbol}`}>
            <span className="rank">{FACE_VALUES[rank]}</span>
            <span className="suit">{SUITS[suit].symbol}</span>
          </div>

          <div className="back card" />
    	</div>
    )
  }
}
Card.propTypes = {
  rank: React.PropTypes.oneOf([2,3,4,5,6,7,8,9,10,11,12,13,14]).isRequired,
  suit: React.PropTypes.oneOf(['spades', 'clubs', 'hearts', 'diamonds']).isRequired,
};

export default PlayingCard;
