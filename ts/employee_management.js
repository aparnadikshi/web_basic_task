var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    Employee.prototype.info = function () {
        console.log("".concat(this.name, " earns ").concat(this.salary));
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, salary, department) {
        var _this = _super.call(this, name, salary) || this;
        _this.department = department;
        return _this;
    }
    Manager.prototype.manage = function () {
        console.log("".concat(this.name, " manages ").concat(this.department));
    };
    return Manager;
}(Employee));
var mgr = new Manager("Dikshita", 700000000, "IT");
mgr.info();
mgr.manage();
