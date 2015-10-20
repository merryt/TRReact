import React, { Component, PropTypes } from 'react';
import PlayingCard from './PlayingCard'
import {SUITS, HANDS, FACE_VALUES} from './constants'

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PokerGame extends Component {
  handleDealButton(e){
    let cardsToChange = [];
    // Loop through all checkboxes to see which cards the player wants to change
    for (let i = 0; i < 5; i++) {
      if(!this.refs['hold' + i].getDOMNode().checked) {
        cardsToChange.push(i)
      }
    }
    // Invoke the container component callback with the indexes of the cards to change
    this.props.handleDeal(cardsToChange);
  }

  render(){
    let pokerHandDescription;

    if(this.props.handRank !== null){
      pokerHandDescription = (
        <div key={this.props.handRank} className='card-rank'>
          <h1>{ HANDS[this.props.handRank] }</h1>
        </div>
      );
    }

    let cards = this.props.hand.map((card, index) => {
        return <PlayingCard key={card.rank+card.suit}
                            rank={card.rank}
                            suit={card.suit}
                            style={{marginLeft:7*index+'em'}} />
    });

    return (
      <div className='game'>
          { pokerHandDescription }

        <div className='cards'>
            {cards}
        </div>

        <div className='controls'>
          <label className='card-hold'><input type="checkbox" ref='hold0' />Hold</label>
          <label className='card-hold'><input type="checkbox" ref='hold1' />Hold</label>
          <label className='card-hold'><input type="checkbox" ref='hold2' />Hold</label>
          <label className='card-hold'><input type="checkbox" ref='hold3' />Hold</label>
          <label className='card-hold'><input type="checkbox" ref='hold4' />Hold</label>
          <button className='card-deal' onClick={this.handleDealButton.bind(this)}>Deal</button>
        </div>
      </div>
    )
  }
}
PokerGame.propTypes = {
  hand: React.PropTypes.arrayOf(React.PropTypes.object),
  handRank: React.PropTypes.number,
  handleDeal: React.PropTypes.func
}

export default PokerGame;
