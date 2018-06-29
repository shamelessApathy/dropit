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
	rebuildCompletes()
	{
		let container = document.getElementById('complete-div');
		let children = container.children;
		console.log(children);
		let completes_array = [];
		for (let i = 0; i < children.length; i++)
		{
			if (children[i].className === "outer-tasks")
			{
				let secondChildren = children[i].children;
				for (let j = 0; j < secondChildren.length; j++)
				{
					let dataText = secondChildren[j].getAttribute('data-text');
					let id = secondChildren[j].id;

					completes_array.push({"text":dataText,"class":"task","id":id});
				}
			}
			else
			{
				let dataText = children[i].getAttribute('data-text');
				let id = children[i].id;
				completes_array.push({"text":dataText, "class":"task","id":id});
			}
		}
		return completes_array;

	}
	rebuildToDos()
	{
		let container = document.getElementById('todo-div');
		let children = container.children;
		let todos_array = [];
		for (let i = 0; i < children.length; i++)
		{
			if (children[i].className === "outer-tasks")
			{
				let secondChildren = children[i].children;
				for (let j = 0; j < secondChildren.length; j++)
				{
					let dataText = secondChildren[j].getAttribute('data-text');
					let id = secondChildren[j].id;

					todos_array.push({"text":dataText,"class":"task","id":id});
				}
			}
			else
			{
				let dataText = children[i].getAttribute('data-text');
				let id = children[i].id;
				todos_array.push({"text":dataText, "class":"task","id":id});
			}
		}
		return todos_array;
	}
	rebuildTasks()
	{
		let completes = this.rebuildCompletes();
		let todos = this.rebuildToDos();
		this.setState({
			todos: todos,
			completes: completes 
		})
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
		console.log(data);
		ev.target.appendChild(document.getElementById(data));

		// Needs to be below appendChild to count right number of child divs
		console.log(ev.target.className);
		if (ev.target.className === "completed-container")
		{
			this.rebuildTasks();
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

