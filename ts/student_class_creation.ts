class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, I am ${this.name}`;
    }
}

const stu = new Student("Dikshita", 20);
console.log(stu.name);
console.log(stu.greet());