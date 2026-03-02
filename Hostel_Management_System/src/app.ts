import { hostelService } from "./service/hostel_service.js";
import "./UI/ui.js"

let service = new hostelService();
service.getOccupiedRooms();