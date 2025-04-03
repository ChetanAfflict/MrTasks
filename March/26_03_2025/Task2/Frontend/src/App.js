import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getUsers"); // Request users from the server
    socket.on("users", (data) => setUsers(data)); // Receive the users list
    return () => socket.off("users"); // Cleanup listener on unmount
  }, []);

  const deleteUser = (id) => {
    socket.emit("deleteUser", id); // Emit delete user event
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Link to={`/edit/${user.id}`}>Edit</Link>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserForm = ({ isEdit }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      socket.emit("getUser", id); // Request specific user data
      socket.on("user", (data) => setUser(data)); // Receive user data
    }
    return () => socket.off("user"); // Cleanup listener on unmount
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      socket.emit("editUser", { id, ...user }); // Emit edit user event
    } else {
      socket.emit("addUser", user); // Emit add user event
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{isEdit ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm isEdit={false} />} />
        <Route path="/edit/:id" element={<UserForm isEdit={true} />} />
      </Routes>
    </Router>
  );
};

export default App;