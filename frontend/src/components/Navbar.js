import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <button className="nav-btn" onClick={() => navigate('/people')}>People</button>
            <button className="nav-btn" onClick={() => navigate('/tasks')}>Tasks</button>
        </nav>
    );
}

export default Navbar;