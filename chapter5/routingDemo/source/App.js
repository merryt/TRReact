import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';

import About from './About';
import RepoDetails from './RepoDetails';
import Repos from './Repos';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/repos" activeClassName="active">Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}


React.render((
  // <Router history={history}>
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} title="About Us" />
      <Route path="repos" component={Repos}>
        <Route path="details/:repo_name" component={RepoDetails} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
