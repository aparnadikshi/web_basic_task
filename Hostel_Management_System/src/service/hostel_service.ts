import { Rooms } from "../model/rooms.js";
import { Resident } from "../model/resident.js";
import { roomsAvalability } from "../data/roomsdata.js";
export class hostelService {
    private rooms: Rooms[] = [];
    private resident: Resident[] = [];
    constructor() {
        // localStorage.removeItem("residents");
        // localStorage.removeItem("rooms");
        this.loadData(); //if nothing is ther in data then also load data

    }
    //to load data from memory
    loadData(): void {
        const storedRooms = localStorage.getItem("rooms");//gives null so falsey value
        const storedResidents = localStorage.getItem("residents");
        if (storedRooms) {
            this.rooms = JSON.parse(storedRooms);//converting json to js
        }
        else {
            this.rooms = roomsAvalability;
        }
        if (storedResidents) {
            this.resident = JSON.parse(storedResidents);
        }
        else {
            this.resident = []; //no residents then give empty array
        }
        console.log(this.rooms);
        console.log(this.resident);
    }
    //geters for rooms and residents
    get getRooms() {
        return this.rooms;
    }
    get getResidents() {
        return this.resident;
    }
    //storing the data
    saveData() {
        localStorage.setItem("rooms", JSON.stringify(this.rooms));
        localStorage.setItem("residents", JSON.stringify(this.resident));
    }
    //add resident
    addResident(
        name: string,
        age: number,
        phone: string,
        roomNumber: number,
        checkInDate: string,
    ) {
        const room = this.rooms.find((r) => r.roomNumber === roomNumber);//=== value and type;
        if (!room) {
            throw new Error("Room does not exist");
        }
        else if (room.isOccupied) {
            throw new Error("Room is already occupied");
        }
        const newResident: Resident = {
            id: Date.now().toString(),
            name: name,
            age: age,
            phone: phone,
            roomNumber: roomNumber,
            checkInDate: checkInDate,
        };
        this.resident.push(newResident);
        room.isOccupied = true;
        this.saveData();
        // console.log(this.rooms);
        // console.log(this.resident);
    }
    //delete resident
    deleteResident(rid: string): void {
        // Find the resident
        const index = this.resident.findIndex(r => r.id === rid);

        if (index === -1) {
            throw new Error("Resident not found");
        }
        const roomNumb = this.resident[index].roomNumber;
        //splice(start index,delete count), used to remove elements from array
        const room = this.rooms.find(r => r.roomNumber === roomNumb);
        if (!room) {
            throw new Error("room doesnot exist");
        }
        // Save updated data
        room.isOccupied = false;
        this.resident.splice(index, 1);
        this.saveData();
    }
    updateresident(rid: string,
        updatedData: {
            name?: string;
            age?: number;
            phone?: string;
            checkInDate?: string;
            roomNumber?: number;
        }) {
        const resident = this.resident.find(r => r.id === rid);
        if (!resident) {
            throw new Error("resident doesnot exist");
        }
        if (updatedData.roomNumber && updatedData.roomNumber !== resident.roomNumber) {
            const oldRoom = this.rooms.find(r => r.roomNumber === resident.roomNumber);
            const newRoom = this.rooms.find(r => r.roomNumber === updatedData.roomNumber);
            if (!newRoom) {
                throw new Error("new room doesnot exist");
            }
            if (newRoom.isOccupied) {
                throw new Error("Room is occupied");
            }
            if (oldRoom) {
                oldRoom.isOccupied = false;//free old room
            }
            newRoom.isOccupied = true;
            resident.roomNumber = updatedData.roomNumber;
        }
        // Update other fields
        if (updatedData.name !== undefined) resident.name = updatedData.name;
        if (updatedData.age !== undefined) resident.age = updatedData.age;
        if (updatedData.phone !== undefined) resident.phone = updatedData.phone;
        if (updatedData.checkInDate !== undefined) resident.checkInDate = updatedData.checkInDate;

        // Save updated data
        this.saveData();
        console.log("resident updated");
    }
    //get vacant rooms
    getVacantRooms() {
        console.log("vacant rooms");
        this.rooms.filter((r) => !r.isOccupied);

    }
    //get occupied rooms
    getOccupiedRooms() {
        console.log("Occupied rooms");
        return this.rooms.filter((r) => r.isOccupied);
    }
    //get total rooms
    getRoomstates() {
        const total = this.rooms.length;
        const occupied = this.getOccupiedRooms.length;
        const result = total - occupied;

        return { total, occupied, result };
    }
}