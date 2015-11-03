import React, { Component } from 'react';
import 'whatwg-fetch';

class RepoDetails extends Component {
  constructor(){
    super(...arguments);
    this.state={
      repository:{}
    };
  }
  componentWillReceiveProps(props){
    // The Router injects the key repo_name inside the params prop
    let repo_name = props.params.repo_name;

    fetch('https://api.github.com/repos/pro-react/'+repo_name)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({repository:responseData});
    });
  }

  render() {
    let stars = [];
    for (var i = 0; i < this.state.repository.stargazers_count; i++) {
      stars.push('★');
    }
    return (
      <div>
        <h2>{this.state.repository.name}</h2>
        <p>{this.state.repository.description}</p>
        <span>{stars}</span>
      </div>
    );
  }
}

export default RepoDetails;
