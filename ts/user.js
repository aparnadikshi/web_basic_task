"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.greet = function () {
        console.log("Hello, ".concat(this.name));
    };
    return User;
}());
exports.User = User;
