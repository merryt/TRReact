import React, { Component, PropTypes } from 'react';

// Main (stateful) component. 
// Renders a SearchBar and a ContactList
// Passes down filterText state and handleUserInput callback as props
class ContactsApp extends Component {
  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }

  handleUserInput(searchTerm){
    this.setState({filterText:searchTerm})
  }

  render(){
    return(
      <div>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    )
  }
}
ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(React.PropTypes.object)
}


// Pure component that receives 2 props from the parent
// filterText (string) and onUserInput (callback function)
class SearchBar extends Component {
  handleChange(event){
    this.props.onUserInput(event.target.value)
  }

  render(){
    return <input type="search"
                  placeholder="search"
                  value={this.props.filterText}
                  onChange={this.handleChange.bind(this)} />
  }
}
SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
}

// Pure component that receives both contacts and filterText as props
// The component is responsible for actualy filtering the
// contacts before displaying them.
// It's considered a pure component because given the same
// contacts and filterText props the output will always be the same.
class ContactList extends Component {
  render(){
    var filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );
    return(
      <ul>
        {filteredContacts.map(
          (contact) => <ContactItem key={contact.email}
                                    name={contact.name}
                                    email={contact.email} />
        )}
       </ul>
    )
  }
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(React.PropTypes.object),
  filterText: PropTypes.string.isRequired
}

class ContactItem extends Component {
  render() {
    return <li>{this.props.name} - {this.props.email}</li>
  }
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

var contacts = [
  { name: "Cassio Zen", email: "cassiozen@gmail.com" },
  { name: "Dan Abramov", email: "gaearon@somewhere.com" },
  { name: "Pete Hunt", email: "floydophone@somewhere.com" },
  { name: "Paul O’Shannessy", email: "zpao@somewhere.com" },
  { name: "Ryan Florence", email: "rpflorence@somewhere.com" },
  { name: "Sebastian Markbage", email: "sebmarkbage@here.com" },
]

React.render(
   <ContactsApp contacts={contacts} />, document.getElementById('app')
);
