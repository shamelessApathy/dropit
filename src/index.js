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
			);
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
			);
	}
	rebuildTasks(element, column)
	{
		if (column === "complete")
		{
			let todos = this.state.todos;
			for (let i = 0; i < todos.length; i++)
			{
				if (todos[i].id === element.id)
				{
					todos.splice(i, 1);
				}
			}
			let completes = this.state.completes;
			completes.push(element);
			this.setState({
				todos: todos,
				completes: completes
			})
		}
		if (column === "todo")
		{
			let completes = this.state.completes;
			for (let i = 0; i < completes.length; i++)
			{
				if (completes[i].id === element.id)
				{
					completes.splice(i, 1);
				}
			}
			let todos = this.state.todos;
			todos.push(element);
			this.setState({
				todos: todos,
				completes: completes
			})
		}
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

		ev.preventDefault();
		let data = ev.dataTransfer.getData("text");
		let text = document.getElementById(data).innerHTML;
		let task = {"text":text, "class":"task","id":data};
		console.log("data:" + data);
		console.log("text:" + text);
		if (ev.target.id === "complete-div")
		{
			this.rebuildTasks(task, "complete");
		}
		if (ev.target.id === "todo-div")
		{
			this.rebuildTasks(task, "todo");
		}
		
	}
	componentDidCatch(error, info) 
	{
    	// Display fallback UI
    	this.setState({
			todos: [],
			completes: []
    	 });
    	console.log(error);

  	}
	render()
	{
		return(
			<div>
				<div className="dropit-container">
					<h4 className="title">DropIt Component</h4>
					<h4 className="title-left">To Do's</h4>
					<div id="todo-div" className="todo-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						
						{this.renderToDoTasks()}
					</div>
					<h4 className="title-right">Completed</h4>
					<div id="complete-div" className="completed-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						
						{this.renderCompleteTasks()}
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<DropIt />, document.getElementById('root'));

