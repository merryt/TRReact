import React, { Component } from 'react';
import KanbanBoardContainer from './KanbanBoardContainer';

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
			{id: 1, name:"ContactList Example", done:false},
			{id: 2, name:"Kanban Example", done:true},
			{id: 3, name:"My own experiments", done:false}
		]
	},
	{
		id:3,
		title: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla.",
		description: "Code along with the samples … at [github](https://github.com/pro-react)",
		color: '#3A7E28',
		status: "todo",
		tasks: [
			{id: 1, name:"ContactList Example", done:false},
			{id: 2, name:"Kanban Example", done:true},
			{id: 3, name:"My own experiments", done:false}
		]
	},
];

React.render(<KanbanBoardContainer />, document.getElementById('root'));
