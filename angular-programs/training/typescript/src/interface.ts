// //interfcae define the structure of the object
 
// // what properties an object must have and what type of value it should have
// //what methods it must implement and what parameters and return type those methods should have
 
// interface User {
//     id: number;
//     name: string;
//     email: string;
// }
 
 
// let user: User = {
//    id: 1,
//     name: "Alice",
//     email: "shiva@gmail.com"
// };
// console.log(user.id); //1
// console.log(user.name);TextMetrics
// console.log(user.email); //
 
 
// interface Employee {
//     id: number;
//     name: string;
//     department: string;
//     getDetails(): string;
// }
 
// let emp: Employee = {
//      id: 101,
//     name: "Bob",
//     department: "IT",
//     getDetails() {
//         return `Employee ${this.name} works in ${this.department} department.`;
//     }
// };
 
// console.log(emp.getDetails()); //Employee Bob works in IT department.
 
 
 interface Base{
    id:number;
 }
 
 interface User extends Base{
    name:string;
 }
 
 const u:User = {id:101,name:"Kavya"};
 console.log(u);
 
 
 interface BankingAccount{
    accountNumber:string;
    balance:number;
    deposit(amount:number):void;
    withdraw(amount:number):void;
 }
 
    class SavingsAccount implements BankingAccount{
        accountNumber:string;
        balance:number;
        constructor(accountNumber:string, balance:number){
            this.accountNumber=accountNumber;
            this.balance=balance;
        }
        deposit(amount:number):void{
            this.balance+=amount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        }
        withdraw(amount:number):void{
            if(amount>this.balance){
                console.log("Insufficient balance");  
                throw new Error("Insufficient balance");
            }else{
                this.balance-=amount;
                console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
            }  
        }
    }
 
    class CurrentAccount implements BankingAccount{
        accountNumber:string;
        balance:number;
        constructor(accountNumber:string, balance:number){
            this.accountNumber=accountNumber;
            this.balance=balance;
        }
        deposit(amount:number):void{
            this.balance+=amount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        }
 
        withdraw(amount:number):void{
            if(amount>this.balance){
                console.log("Insufficient balance");
            }else{
                this.balance-=amount;
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
 