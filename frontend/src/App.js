import { useState, useEffect} from 'react';
import List from './components/List';
import Stat from './components/Stat';
import './App.css';

function App() {
	
    const [tasks, setTasks] = useState([]);
    
        useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    },[]);

    return (
        <div className='page'>     
            <List tasks={tasks} setTasks={setTasks}/>
            <Stat />
        </div>
    );
}

export default App;
