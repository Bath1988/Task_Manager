import { useState, useEffect } from 'react';


function Num(props) {

	console.log(props);

	function onClick() {


		fetch(`http://localhost/api/phones/${props.id}`, {
            		method: 'DELETE',
        	})
        	.then(() => {
           		 
            		props.setNums(nums => nums.filter(num => num.id !== props.id));
        	})
        	.catch((error) => {
            		console.error('Error:', error);
        	});
}
		
	return (
		<li><button type="button" onClick={onClick}>delete</button> { props.name}{props.num}</li>
	);
}


function Chil(props) {

	const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");

	function onChange1(event) {
		setNewName(event.target.value);
	}

    function onChange2(event) {
		setNewNum(event.target.value);
	}
	
	
	function onClick() {

		fetch('http://localhost/api/phones', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: newName, num: newNum })
				})
			.then(response => response.json())
			.then(data => {
				props.setNums(nums => [...nums, data]);
			})
				.catch((error) => {
				console.error('Error:', error);
			});
	}

	return (
		<div>
			
			<input type="text" placeholder="Add name" onChange={onChange1} />
            <input type="text" placeholder="Add number" onChange={onChange2} />
			<button type="button" onClick={onClick}>Add</button>
			<ul>
				{ props.nums.map(num => <Num setNums={props.setNums} id={num.id} name={num.name+'  --'} num={num.number} />) }
				
			</ul>

		</div>
	);
	}

export default Chil;