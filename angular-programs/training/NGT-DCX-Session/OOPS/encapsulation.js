class Account{
    #balance = 0;
    deposit(amount) {
        this.#balance += amount;
    }
    Balance() {
        return this.#balance;
    }
}
const acc = new Account();
acc.deposit(500);
console.log(acc.Balance());  
//console.log(acc.#balance);     
//overriding 
class Animal{
    sound(){
        console.log("Animal sound");
    }
}
class Dog extends Animal {
    sound() {
        console.log("Dog barks");
    }
}
const d = new Dog();
d.sound(); 