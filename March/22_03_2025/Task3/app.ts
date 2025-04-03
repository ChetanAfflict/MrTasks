// app.ts

interface Patient {
    id: number;
    name: string;
}

interface Doctor {
    id: number;
    name: string;
    patients: Patient[];
}

const doctors: Doctor[] = [
    { id: 1, name: "Dr. John Smith", patients: [{ id: 101, name: "Alice Brown" }, { id: 102, name: "Bob Williams" }] },
    { id: 2, name: "Dr. Sarah Johnson", patients: [{ id: 103, name: "Charlie Davis" }, { id: 104, name: "Diana Evans" }] },
    { id: 3, name: "Dr. Robert Wilson", patients: [{ id: 105, name: "Evan Parker" }] }
];

document.addEventListener("DOMContentLoaded", () => {
    const doctorList = document.getElementById("doctorList") as HTMLUListElement;
    const patientList = document.getElementById("patientList") as HTMLUListElement;
    const selectedDoctor = document.getElementById("selectedDoctor") as HTMLSpanElement;

    function displayDoctors() {
        doctorList.innerHTML = "";
        doctors.forEach((doctor) => {
            const li = document.createElement("li");
            li.textContent = doctor.name;
            li.classList.add("list-group-item", "list-group-item-action");
            li.addEventListener("click", () => displayPatients(doctor));
            doctorList.appendChild(li);
        });
    }

    function displayPatients(doctor: Doctor) {
        selectedDoctor.textContent = doctor.name;
        patientList.innerHTML = "";

        if (doctor.patients.length === 0) {
            patientList.innerHTML = "<li class='list-group-item text-muted'>No patients assigned</li>";
            return;
        }

        doctor.patients.forEach((patient) => {
            const li = document.createElement("li");
            li.textContent = patient.name;
            li.classList.add("list-group-item");
            patientList.appendChild(li);
        });
    }

    displayDoctors();
});
