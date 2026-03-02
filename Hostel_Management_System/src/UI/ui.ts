import { hostelService } from "../service/hostel_service.js";

const service = new hostelService();

// DOM elements
const addForm = document.getElementById("addForm") as HTMLDivElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
const showAddFormBtn = document.getElementById("showAddFormBtn") as HTMLButtonElement;

const nameInput = document.getElementById("name") as HTMLInputElement;
const ageInput = document.getElementById("age") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const checkinInput = document.getElementById("checkin") as HTMLInputElement;
const roomSelect = document.getElementById("roomSelect") as HTMLSelectElement;

const searchInput = document.getElementById("search") as HTMLInputElement;
const tableBody = document.querySelector("#residentTable tbody") as HTMLTableSectionElement;

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
(window as any).deleteResident = function (id: string) {
    if (confirm("Are you sure you want to delete this resident?")) {
        service.deleteResident(id);
        displayResidents();
        loadRooms();
    }
};
let currentEditID: string | null = null;

(window as any).startEditResident = function (id: string) {
    currentEditID = id;

    const resident = service.getResidents.find(r => r.id === id);
    if (!resident) return;

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

    const template = document.getElementById("residentRowTemplate") as HTMLTemplateElement;

    service.getResidents
        .filter(res =>
            res.name.toLowerCase().includes(search) ||
            res.phone.includes(search) ||
            res.roomNumber.toString().includes(search)
        )
        .forEach(res => {
            const row = template.content.cloneNode(true) as HTMLElement;

            (row.querySelector(".res-name") as HTMLElement).textContent = res.name;
            (row.querySelector(".res-age") as HTMLElement).textContent = res.age.toString();
            (row.querySelector(".res-phone") as HTMLElement).textContent = res.phone;
            (row.querySelector(".res-room") as HTMLElement).textContent = res.roomNumber.toString();
            (row.querySelector(".res-checkin") as HTMLElement).textContent = res.checkInDate;

            // Add event listeners
            (row.querySelector(".edit-btn") as HTMLButtonElement).addEventListener("click", () => {
                (window as any).startEditResident(res.id);
            });

            (row.querySelector(".delete-btn") as HTMLButtonElement).addEventListener("click", () => {
                (window as any).deleteResident(res.id);
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

    } catch (error: any) {
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