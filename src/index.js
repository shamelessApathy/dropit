import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tasks extends React.Component {
	render(props)
	{
		return (
			this.props.value
			);
	}
}
class DropIt extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			todos: [{
				text: "Brush Hair",
				class: "task",
				id: "task-01"
			},{
				text: "Tie Shoes",
				class: "task",
				id: "task-02"
			},{
				text: "Walk Dog",
				class: "task",
				id: "task-03"
			}],
			completes: [{
				text: "Shave",
				class: "task",
				id: "task-04"
			}]
		}
	}
	renderToDoTasks ()
	{
		let tasks = this.state.todos;
		let tasks_array = [];

		for (let i =0; i < tasks.length; i++)
		{
			tasks_array.push(<div draggable data-text={tasks[i].text} onDragStart={ (event) => this.drag(event) } key={tasks[i].id} className={tasks[i].class} id={tasks[i].id}>{tasks[i].text}</div>);
		}
		return (
			<Tasks
				value={tasks_array}
			/>
			)
	}
	renderCompleteTasks()
	{
		let tasks = this.state.completes;
		let tasks_array = [];

		for (let i =0; i < tasks.length; i++)
		{
			tasks_array.push(<div draggable data-text={tasks[i].text} onDragStart={ (event) => this.drag(event) } key={tasks[i].id} className={tasks[i].class} id={tasks[i].id}>{tasks[i].text}</div>);
		}
		return (
			<Tasks
				value={tasks_array}
			/>
			)
	}
	rebuildCompletes()
	{
		let container = document.getElementById('complete-div');
		let children = container.getElementsByClassName('task');
		console.log(children.length);
		for (let i = 0; i < children.length; i++)
		{
			console.log(children[i]);
		}

	}
	rebuildTasks()
	{
		this.rebuildCompletes();
	}
	allowDrop(ev)
	{
		ev.preventDefault();

	}
	drag(ev)
	{
		ev.dataTransfer.setData("text", ev.target.id);
	}
	drop(ev)
	{
				console.log(ev.target.className);
		if (ev.target.className === "completed-container")
		{
			this.rebuildTasks();
		}
		ev.preventDefault();
		let data = ev.dataTransfer.getData("text");
		console.log(data);
		ev.target.appendChild(document.getElementById(data));
	}
	render()
	{
		return(
			<div>
				<div className="dropit-container">
					<h4 className="title">DropIt Component</h4>
					<div id="todo-div" className="todo-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						<h4 className="title">To Do's</h4>
						{this.renderToDoTasks()}
					</div>
					<div id="complete-div" className="completed-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						<h4 className="title">Completed</h4>
						{this.renderCompleteTasks()}
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<DropIt />, document.getElementById('root'));

