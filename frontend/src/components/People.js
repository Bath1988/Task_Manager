import { useState } from 'react';
import '../App.css';

function People(props) {
    const [form, setForm] = useState({ name: '', phone: '', email: '', job: '' });
    const [showPeopleCount, setShowPeopleCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pagedPeople, setPagedPeople] = useState([]);

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function onAdd() {
        fetch('/api/people', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            props.setPeople(people => [...people, data]);
            setForm({ name: '', phone: '', email: '', job: '' });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function onDelete(id) {
        fetch(`/api/people/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            props.setPeople(people => people.filter(person => person.id !== id));
            setPagedPeople(pagedPeople => pagedPeople.filter(person => person.id !== id));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function fetchPeople(pageNum = 0) {
        fetch(`/api/people?limit=10&offset=${pageNum * 10}`)
            .then(res => res.json())
            .then(data => setPagedPeople(data));
    }

    function handleShowPeople() {
        const newCount = showPeopleCount + 1;
        setShowPeopleCount(newCount);
        if (newCount % 2 === 1) {
            fetchPeople(page);
        }
    }

    function handleNext() {
        setPage(prev => prev + 1);
        fetchPeople(page + 1);
    }

    function handlePrev() {
        if (page > 0) {
            setPage(prev => prev - 1);
            fetchPeople(page - 1);
        }
    }

    return (
        <div className='people-page'>
            <div className="people-form-card">
                <h1 className='topic1'>Add New Person</h1>
                <div className="form-row">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} placeholder="Name" onChange={onChange} />
                </div>
                <div className="form-row">
                    <label>Phone</label>
                    <input type="text" name="phone" value={form.phone} placeholder="Phone" onChange={onChange} />
                </div>
                <div className="form-row">
                    <label>Email</label>
                    <input type="text" name="email" value={form.email} placeholder="Email" onChange={onChange} />
                </div>
                <div className="form-row">
                    <label>Job</label>
                    <input type="text" name="job" value={form.job} placeholder="Job" onChange={onChange} />
                </div>
                <div className="form-actions">
                    <button type="button" className='button1 same-btn' onClick={onAdd}>Add</button>
                    <button type="button" className='button1 same-btn' onClick={handleShowPeople}>Show People</button>
                </div>
            </div>
            {(showPeopleCount % 2 === 1) && (
                <div className="table-container">
                    <table className="people-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Job</th>
                                <th></th> {/* For delete button, no heading */}
                            </tr>
                        </thead>
                        <tbody>
                            {pagedPeople.map(person =>
                                <tr key={person.id}>
                                    <td>{person.id}</td>
                                    <td>{person.name}</td>
                                    <td>{person.phone}</td>
                                    <td>{person.email}</td>
                                    <td>{person.job}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button1 delete-btn"
                                            onClick={() => onDelete(person.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
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

export default People;