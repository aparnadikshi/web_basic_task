var BankAccount = /** @class */ (function () {
    function BankAccount(owner, balance, accountType) {
        this.owner = owner;
        this.balance = balance;
        this.accountType = accountType;
    }
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.getBalance = function () {
        return this.balance;
    };
    return BankAccount;
}());
var acc = new BankAccount("John", 1000, "Savings");
acc.deposit(500);
console.log(acc.getBalance());
