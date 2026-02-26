class Employee {
    constructor(public name: string, public salary: number) { }

    info() {
        console.log(`${this.name} earns ${this.salary}`);
    }
}

class Manager extends Employee {
    department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary);
        this.department = department;
    }

    manage() {
        console.log(`${this.name} manages ${this.department}`);
    }
}

let mgr = new Manager("Dikshita", 700000000, "IT");
mgr.info();
mgr.manage();