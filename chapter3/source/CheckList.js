import React, { Component, PropTypes } from 'react';

class CheckList extends Component {

	render(){
		var tasks = this.props.tasks.map((task) => {
		 return (
			<li className="checklist__task" key={task.id}>
				<input type="checkbox" defaultChecked={task.done} />
				{task.name}
				<a href="#" className="checklist__task--remove" />
			</li>
			)
		});

		return (
			<div className="checklist">
				<ul>{tasks}</ul>
			</div>
		)
	}
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(React.PropTypes.object)
};

export default CheckList;
