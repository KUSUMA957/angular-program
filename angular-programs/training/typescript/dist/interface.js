"use strict";
// //interfcae define the structure of the object
Object.defineProperty(exports, "__esModule", { value: true });
const u = { id: 101, name: "Kavya" };
console.log(u);
class SavingsAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient balance");
            throw new Error("Insufficient balance");
        }
        else {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
        }
    }
}
class CurrentAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient balance");
        }
        else {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
        }
    }
}
const saving = new SavingsAccount("SA123", 1000);
saving.deposit(500);
saving.withdraw(200);
const current = new CurrentAccount("CA456", 2000);
current.deposit(1000);
current.withdraw(1500);
