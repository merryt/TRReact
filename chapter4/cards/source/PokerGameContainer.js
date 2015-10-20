import React, { Component, PropTypes } from 'react/addons';
import {SUITS, FACE_VALUES} from './constants';
import PokerGame from './PokerGame';
import dealer from './Dealer';

class PokerGameContainer extends Component {
  constructor(){
    super(...arguments);
    this.state={
      hand: [],
      handRank: null,
    }
  }

  componentDidMount(){
    let initialHand = dealer.deal(5);
    let handRank = dealer.rankPokerHand(initialHand);
    this.setState({hand:initialHand, handRank:handRank});
  }

  handleDeal(cardsToChange){
    let newHand = this.state.hand.map((card, index)=>{
      if(cardsToChange.indexOf(index) === -1){
        return card;
      } else {
        return dealer.deal(1)[0];
      }
    });

    let handRank = dealer.rankPokerHand(newHand);
    this.setState({hand:newHand, handRank:handRank});
  }

  render(){
    return (
      <PokerGame hand={this.state.hand} handRank={this.state.handRank} handleDeal={this.handleDeal.bind(this)} />
    )
  }
}

React.render(<PokerGameContainer />, document.getElementById('app'));
