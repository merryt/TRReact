import React, { Component } from 'react/addons';

// Easier reference to React.addons.CSSTransitionGroup;
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class AnimatedTodo extends Component {
  constructor(){
    super(...arguments);

    // Create an "items" state pre-populated with some tasks
    this.state={
      items: [
        {id:1, name: 'Buy Milk'},
        {id:2, name: 'Add Task'}
      ]
    }
  }

  // Called when the user changes the input field
  handleChange(evt) {
    if(evt.key === 'Enter'){
      // Create a new item and set the current time as it's id
      let newItem = {id:Date.now(), name:evt.target.value}
      // Create a new array with the previous items plus the value the user typed
      let newItems = this.state.items.concat(newItem);
      // Clear the text field
      evt.target.value='';
      // Set the new state
      this.setState({items: newItems});
    }

  }

  handleRemove(i) {
    // Create a new array without the clicked item
    var newItems = this.state.items;
    newItems.splice(i, 1);
    // Set the new state
    this.setState({items: newItems});
  }

  render(){
    let todoItems = this.state.items.map((item, i) => (
      <div key={item.id} className="item" onClick={this.handleRemove.bind(this, i)}>{item.name}</div>
    ));

    return(
      <div>
        <ReactCSSTransitionGroup transitionName="example">
        {todoItems}
        </ReactCSSTransitionGroup>
        <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)}/>
      </div>
    );

  }
};

React.render(<AnimatedTodo />, document.getElementById('app'));
