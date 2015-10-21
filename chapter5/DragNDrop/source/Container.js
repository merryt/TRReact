import React, { Component } from 'react';
import CircleBin from './CircleBin';
import Circle from './Circle';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/node_modules/backends/HTML5';

class Container extends Component {
  render() {
    return (
      <div>
        <Circle name='Cookie'/>
        <Circle name='Pizza'/>
        <Circle name='Pie'/>
        <Circle name='Cake'/>
        <Circle name='Donut'/>
        <Circle name='Oreo'/>
        <CircleBin/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
