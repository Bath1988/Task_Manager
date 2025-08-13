import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import People from './components/People';
import Task from './components/Task';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('/api/people')
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Router>
            <Navbar />
            <div className='page'>
                <Routes>
                    <Route path="/people" element={<People people={people} setPeople={setPeople} />} />
                    <Route path="/tasks" element={<Task />} />
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;