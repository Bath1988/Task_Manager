import { useState,useEffect } from 'react';
import Chil from './Chil';
import './index.css';


function Task(props) {

	console.log(props);

	const [nums, setNums] = useState([]);



	function onClick() {
		fetch(`/api/contacts/${props.id}`, {
            		method: 'DELETE',
        	})
        	.then(() => {
           		 // remove it from the state
            		props.setTasks(tasks => tasks.filter(task => task.id !== props.id));
        	})
        	.catch((error) => {
            		console.error('Error:', error);
        	});
}
	return (
		<li><button type="button" onClick={onClick}>delete</button> { props.description }<Chil nums={nums} setNums={setNums} /></li>
	);
}

function List(props) {

	const [newTask, setNewTask] = useState(" ");

	function onChange(event) {
		setNewTask(event.target.value);
	}

	function onClick() {
		fetch('/api/contacts', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ description: newTask})
		})
			.then(response => response.json())
			.then(data => {
				props.setTasks(tasks => [...tasks, data]);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
			
	  	setNewTask("");  // Clear the input field
	}
	return (
		<div className='centre'>

			<h1 className='topic1'> Contactor</h1>
			<input type="text" className='text1' placeholder="Add a new task" onChange={onChange} />
			<button type="button" className='button1' onClick={onClick}>Add</button>
			<ul>
				{ props.tasks.map(task => <Task setTasks={props.setTasks} id={task.id} description={task.description} />) }
				
			</ul>

			
		</div>
	);
}

export default List;
