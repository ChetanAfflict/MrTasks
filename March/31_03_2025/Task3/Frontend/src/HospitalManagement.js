import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to the Socket.io server
const socket = io("http://localhost:5000");

// Parent Component
const HospitalManagement = () => {
  const [patients, setPatients] = useState([]); 

  useEffect(() => {
    // Listen for updates to the patients list
    socket.on("updatePatients", (data) => {
      setPatients(data); // Update state with received data
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("updatePatients");
    };
  }, []);

  // Emit new patient data to the server
  const addPatient = (patient) => {
    socket.emit("addPatient", patient); // Send patient data to the server
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Hospital Management</h1>
      <PatientForm onAddPatient={addPatient} />
      <PatientList patients={patients} />
    </div>
  );
};

// Child Component Patient Form
const PatientForm = ({ onAddPatient }) => {
  const [name, setName] = useState(""); // State for patient name input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onAddPatient({ id: Date.now(), name }); // Call the callback to add a new patient
      setName(""); // Clear the input field
    }
  };
  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter patient name"
        // className="border p-2 w-full mb-3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Patient
      </button>
    </form>
  );
};

// Child Component Patient List
const PatientList = ({ patients }) => {
  if (patients.length === 0) {
    return <p>No patients added yet.</p>;
  }
  return (
    <ul className="list-disc">
      {patients.map((patient) => (
        <li key={patient.id} className="mb-2">
          {patient.name}
        </li>
      ))}
    </ul>
  );
};
export default HospitalManagement;