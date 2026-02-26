var Student = /** @class */ (function () {
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    Student.prototype.greet = function () {
        return "Hello, I am ".concat(this.name);
    };
    return Student;
}());
var stu = new Student("Dikshita", 20);
console.log(stu.name);
console.log(stu.greet());
