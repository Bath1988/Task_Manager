import { useState, useEffect, useRef } from 'react';
import '../App.css';

function Task() {
    const [form, setForm] = useState({ action: '', remarks: '', personId: '', search: '' });
    const [people, setPeople] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showTasksCount, setShowTasksCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pagedTasks, setPagedTasks] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetch('/api/people')
            .then(res => res.json())
            .then(data => setPeople(data));
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function onAdd() {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: form.action,
                remarks: form.remarks,
                personId: Number(form.personId)
            })
        })
        .then(response => response.json())
        .then(data => {
            setTasks(tasks => [...tasks, data]);
            setForm({ action: '', remarks: '', personId: form.personId, search: form.search });
        });
    }

    function onDelete(id) {
        fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            .then(() => setTasks(tasks => tasks.filter(task => task.id !== id)));
    }

    function fetchTasks(pageNum = 0) {
        fetch(`/api/tasks?limit=10&offset=${pageNum * 10}`)
            .then(res => res.json())
            .then(data => setPagedTasks(data));
    }

    function handleShowTasks() {
        const newCount = showTasksCount + 1;
        setShowTasksCount(newCount);
        if (newCount % 2 === 1) {
            fetchTasks(page);
        }
    }

    function handleNext() {
        setPage(prev => prev + 1);
        fetchTasks(page + 1);
    }

    function handlePrev() {
        if (page > 0) {
            setPage(prev => prev - 1);
            fetchTasks(page - 1);
        }
    }

    // Filter people for dropdown based on search
    const filteredPeople = people.filter(person =>
        !form.search ||
        person.name.toLowerCase().includes(form.search.toLowerCase())
    );

    // Custom dropdown logic
    const dropdownRef = useRef(null);

    function handleDropdownSelect(id, name) {
        setForm({ ...form, personId: id, search: name });
        setDropdownOpen(false);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="tasks-page">
            <div className="tasks-form-card">
                <div className="form-row">
                    <label htmlFor="search-person">Search Person</label>
                    <div style={{ position: 'relative', flex: 1 }} ref={dropdownRef}>
                        <input
                            id="search-person"
                            type="text"
                            placeholder="Search person..."
                            value={form.search}
                            onChange={e => setForm({ ...form, search: e.target.value, personId: '' })}
                            style={{ padding: '8px', width: '100%' }}
                            onFocus={() => setDropdownOpen(true)}
                            autoComplete="off"
                        />
                        {dropdownOpen && (
                            <div className="dropdown-list">
                                {filteredPeople.length === 0 && (
                                    <div className="dropdown-list-item" style={{ color: '#888' }}>No people found</div>
                                )}
                                {filteredPeople.map(person => (
                                    <div
                                        key={person.id}
                                        className={`dropdown-list-item${form.personId === person.id ? ' selected' : ''}`}
                                        onClick={() => handleDropdownSelect(person.id, person.name)}
                                    >
                                        {person.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <label>Action</label>
                    <input type="text" name="action" value={form.action} placeholder="Action" onChange={onChange} />
                </div>
                <div className="form-row">
                    <label>Remarks</label>
                    <input type="text" name="remarks" value={form.remarks} placeholder="Remarks" onChange={onChange} />
                </div>
                <div className="form-actions">
                    <button type="button" className='button1 same-btn' onClick={onAdd} disabled={!form.personId}>Add</button>
                    <button type="button" className='button1 same-btn' onClick={handleShowTasks}>Show Tasks</button>
                </div>
            </div>
            {(showTasksCount % 2 === 1) && (
                <div className="table-container">
                    <table className="people-table">
                        <thead>
                            <tr>
                                <th>Person</th>
                                <th>Action</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(form.personId
                                ? pagedTasks.filter(task => String(task.personId) === String(form.personId))
                                : pagedTasks
                            ).map(task => {
                                const person = people.find(p => p.id === task.personId);
                                return (
                                    <tr key={task.id}>
                                        <td>{person ? person.name : 'Unknown'}</td>
                                        <td>{task.action}</td>
                                        <td>{task.remarks}</td>
                                        <td>
                                            <button type="button" className="button1 delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePrev} disabled={page === 0}>←</button>
                        <button onClick={handleNext}>→</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;