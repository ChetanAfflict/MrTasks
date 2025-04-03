import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentApp = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", age: "", course: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const { data } = await axios.get("http://localhost:5000/students");
        setStudents(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`http://localhost:5000/students/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:5000/students", form);
        }
        setForm({ name: "", age: "", course: "" });
        fetchStudents();
    };

    const handleEdit = (student) => {
        setForm(student);
        setEditingId(student._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`);
        fetchStudents();
    };

    return (
        <div>
            <h2>Student Management</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input type='number' placeholder='Age' value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
                <input type='text' placeholder='Course' value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required />
                <button type='submit'>{editingId ? "Update" : "Add"}</button>
            </form>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        {student.name} ({student.age}) - {student.course}
                        <button onClick={() => handleEdit(student)}>Edit</button>
                        <button onClick={() => handleDelete(student._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentApp;
