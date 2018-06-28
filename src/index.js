import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DropIt extends React.Component {
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
	}
	render()
	{
		return(
			<div>
				<div className="dropit-container">
					<h4 className="title">DropIt Component</h4>
					<div id="todo-div" className="todo-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						<h4 className="title">To Do's</h4>
						<div className="todo" id="todo-01" draggable onDragStart={ (event) => this.drag(event) }>Tie my shoes</div>
						<div className="todo" id="todo-02" draggable onDragStart={ (event) => this.drag(event) }>Brush Hair</div>
					</div>
					<div id="complete-div" className="completed-container" onDragOver={(event)=> this.allowDrop(event)} onDrop={(event) => this.drop(event)}>
						<h4 className="title">Completed</h4>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<DropIt />, document.getElementById('root'));

