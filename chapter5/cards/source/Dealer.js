import {SUITS} from './constants'

class Dealer{
  constructor(){
    this.deck = [];
    this.drawn = 0;
    this.createDeck();
  }

createDeck(){
  // Create an array with all 52 cards
  for (var suit = 0; suit < 4; suit++){
    for (var rank = 2; rank < 15; rank++){
      this.deck.push({rank,suit:Object.keys(SUITS)[suit]});
    }
  }
  // Shuffles the array
  this.deck.sort(()=>(Math.round(Math.random())-0.5));
}


// increases the total number of cards drawn
// and returns the amount of cards asked
deal(ammount){
  if(this.drawn+ammount > 52){
    throw "I'm sorry, I don't have enough cards.";
  }
  let returnArr = this.deck.slice(this.drawn, this.drawn+ammount);
  this.drawn = this.drawn + ammount;
  return returnArr;
}


// For convenience, you can copy this function from
// http://gist.github.com/cassiozen/2e8f18af18021ac68607
rankPokerHand(hand) {
  if(hand.length < 5) return;
  let v, i, o, s = 1 << hand[0].rank | 1 << hand[1].rank | 1 << hand[2].rank |
                   1 << hand[3].rank | 1 << hand[4].rank;
  for (i = 0, v = o = 0; i < 5; i++) {
      o = Math.pow(2, hand[i].rank * 4);
      v += o * ((v / o & 15) + 1);
  }
  v = v % 15 - ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
  v -= (SUITS[hand[0].suit].value ==
         (SUITS[hand[1].suit].value | SUITS[hand[2].suit].value | SUITS[hand[3].suit].value |
          SUITS[hand[4].suit].value)) * ((s == 0x7c00) ? -5 : 1);
  return v;
}

}

export default new Dealer();
