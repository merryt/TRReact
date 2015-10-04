var React = require("react");
var marked = require('marked');

class App extends React.Component {
  render(){
    return (
      <div className="app">
        <List title="To Do" cards={
         this.props.cardsList.filter((card) => card.status === "todo")
        } />
        <List title="In Progress" cards={
         this.props.cardsList.filter((card) => card.status == "in-progress")
        } />
        <List title="Done" cards={
         this.props.cardsList.filter((card) => card.status == "done") } />
      </div>
    )
  }
}

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "React"
    };
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    return (
      <div>
        Search Term:
        <input type="search" value={this.state.searchTerm}
                onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

class List extends React.Component {
  render() {
    var cards = this.props.cards.map((card) => {
      return <Card key={card.id}
                    title={card.title}
                    description={card.description}
                    color={card.color}
                    tasks={card.tasks} />
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    var cardDetails;
      if (this.state.showDetails) {
        cardDetails = (
          <div className="card__details">
            <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
            <CheckList tasks={this.props.tasks} />
          </div>
        );
      }
      var sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: this.props.color
      };

    return (
      <div className="card">
        <div style={sideColor}/>
        <div className={
                this.state.showDetails? "card__title card__title--is-open" : "card__title"
           } onClick={this.toggleDetails.bind(this)}>
            {this.props.title}
        </div>
        {cardDetails}
      </div>
    )
  }
}

class CheckList extends React.Component {
  render(){
    var tasks = this.props.tasks.map((task) => {
      return <Task key={task.id} name={task.name} done={task.done} />
    });
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
      </div>
    )
  }
}

class Task extends React.Component {
  render(){
    return (
      <li className="checklist__task">
        <input type="checkbox" defaultChecked={this.props.done} />
        {this.props.name}
        <a href="#" className="checklist__task--remove" />
      </li>
    )
  }
}


var cardsList = [
  {
    id:1,
    title: "Read the Book",
    description: "I should read the book",
    color: '#BD8D31',
    status: "in-progress",
    tasks: []
  },
  {
    id:2,
    title: "Write some code",
    description: "Code along with the samples … at [github](https://github.com/pro-react)",
    color: '#3A7E28',
    status: "todo",
    tasks: [
      {id: 1, name:"ContactList Example", done:true},
      {id: 2, name:"Kanban Example", done:false},
      {id: 3, name:"My own experiments", done:false}
    ]
  },
];




React.render(<App cardsList={cardsList}  />, document.getElementById('app'));
