import React, { Component } from 'react';
import Container from './Container'

class App extends Component {
  render(){
    return (
      <Container />
    );
  }
}
React.render(<App />, document.getElementById('app'));
