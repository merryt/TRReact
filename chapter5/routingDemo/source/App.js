import React, { Component } from 'react';

// first we import some components
import { Router, Route, IndexRoute, Link } from 'react-router';

import About from './About';
import Home from './Home';
import Repos from './Repos';

class App extends Component {
  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/repos">Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="repos" component={Repos}>
        {/* Add the route, nested where we want the UI to nest */}
        <Route path="details/:repo_name" component={RepoDetails} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
