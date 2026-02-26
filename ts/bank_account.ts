class BankAccount {
    public owner: string;
    private balance: number;
    protected accountType: string;

    constructor(owner: string, balance: number, accountType: string) {
        this.owner = owner;
        this.balance = balance;
        this.accountType = accountType;
    }

    deposit(amount: number) {
        this.balance += amount;
    }

    getBalance() {
        return this.balance;
    }
}

const acc = new BankAccount("John", 1000, "Savings");
acc.deposit(500);
console.log(acc.getBalance());