import React, { Component } from 'react';

class CheckList extends React.Component {

render(){

var tasks = this.props.tasks.map((task) => {

//return <Task key={task.id} name={task.name} done={task.done} />

});

return (

<div className="checklist">

<ul>{tasks}</ul>

</div>

)

}

}

export default CheckList;
