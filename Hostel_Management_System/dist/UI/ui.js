import { hostelService } from "../service/hostel_service.js";
const service = new hostelService();
// DOM elements
const addForm = document.getElementById("addForm");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const showAddFormBtn = document.getElementById("showAddFormBtn");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");
const checkinInput = document.getElementById("checkin");
const roomSelect = document.getElementById("roomSelect");
const searchInput = document.getElementById("search");
const tableBody = document.querySelector("#residentTable tbody");
// ------------------------------
// POPULATE ROOM DROPDOWN
// ------------------------------
function loadRooms() {
    roomSelect.innerHTML = "";
    service.getRooms.forEach(room => {
        if (!room.isOccupied) {
            const opt = document.createElement("option");
            opt.value = room.roomNumber.toString();
            opt.textContent = room.roomNumber.toString();
            roomSelect.appendChild(opt);
        }
    });
}
// DELETE RESIDENT
window.deleteResident = function (id) {
    if (confirm("Are you sure you want to delete this resident?")) {
        service.deleteResident(id);
        displayResidents();
        loadRooms();
    }
};
let currentEditID = null;
window.startEditResident = function (id) {
    currentEditID = id;
    const resident = service.getResidents.find(r => r.id === id);
    if (!resident)
        return;
    // Show form
    addForm.classList.remove("hidden");
    // Pre-fill inputs
    nameInput.value = resident.name;
    ageInput.value = resident.age.toString();
    phoneInput.value = resident.phone;
    checkinInput.value = resident.checkInDate;
    loadRooms(); // load only available rooms
    // Ensure current room is selectable
    const opt = document.createElement("option");
    opt.value = resident.roomNumber.toString();
    opt.textContent = resident.roomNumber.toString();
    opt.selected = true;
    roomSelect.appendChild(opt);
    // Change button text from Add → Update
    addBtn.textContent = "Update";
};
// ------------------------------
// DISPLAY RESIDENTS IN TABLE
// ------------------------------
export function displayResidents(search = "") {
    tableBody.innerHTML = "";
    const template = document.getElementById("residentRowTemplate");
    service.getResidents
        .filter(res => res.name.toLowerCase().includes(search) ||
        res.phone.includes(search) ||
        res.roomNumber.toString().includes(search))
        .forEach(res => {
        const row = template.content.cloneNode(true);
        row.querySelector(".res-name").textContent = res.name;
        row.querySelector(".res-age").textContent = res.age.toString();
        row.querySelector(".res-phone").textContent = res.phone;
        row.querySelector(".res-room").textContent = res.roomNumber.toString();
        row.querySelector(".res-checkin").textContent = res.checkInDate;
        // Add event listeners
        row.querySelector(".edit-btn").addEventListener("click", () => {
            window.startEditResident(res.id);
        });
        row.querySelector(".delete-btn").addEventListener("click", () => {
            window.deleteResident(res.id);
        });
        tableBody.appendChild(row);
    });
}
// ------------------------------
// SHOW ADD FORM
// ------------------------------
showAddFormBtn.addEventListener("click", () => {
    addForm.classList.remove("hidden");
    loadRooms();
});
// ------------------------------
// CANCEL FORM
// ------------------------------
cancelBtn.addEventListener("click", () => {
    addForm.classList.add("hidden");
});
// ------------------------------
// ADD RESIDENT FUNCTIONALITY
// ------------------------------
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const phone = phoneInput.value.trim();
    const room = Number(roomSelect.value);
    const checkin = checkinInput.value.trim();
    if (!name || !age || !phone || !room || !checkin) {
        alert("Please fill all fields");
        return;
    }
    try {
        // -----------------------------
        // UPDATE RESIDENT (EDIT MODE)
        // -----------------------------
        if (currentEditID !== null) {
            service.updateresident(currentEditID, {
                name,
                age,
                phone,
                roomNumber: room,
                checkInDate: checkin
            });
            alert("Resident updated successfully");
            currentEditID = null; // RESET edit-mode
            addBtn.textContent = "Add"; // RESET BUTTON TEXT
        }
        // -----------------------------
        // ADD NEW RESIDENT
        // -----------------------------
        else {
            service.addResident(name, age, phone, room, checkin);
            alert("Resident added successfully");
        }
        // Refresh table + UI
        displayResidents();
        loadRooms();
        addForm.classList.add("hidden");
        // Clear inputs
        nameInput.value = "";
        ageInput.value = "";
        phoneInput.value = "";
        checkinInput.value = "";
    }
    catch (error) {
        alert(error.message);
    }
});
// ------------------------------
// SEARCH FUNCTIONALITY
// ------------------------------
searchInput.addEventListener("input", () => {
    displayResidents(searchInput.value.toLowerCase());
});
// ------------------------------
// INITIAL TABLE LOAD
// ------------------------------
displayResidents();
