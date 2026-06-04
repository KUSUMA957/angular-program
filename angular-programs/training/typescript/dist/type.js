"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const u = { id: 101, name: "Kavya" };
console.log(u);
let s = "pending";
const startServer = (port) => console.log(`start on ${port}`);
startServer(9090);
//void returns nothing
const logMessage = (message) => {
    console.log(message);
};
logMessage("Hello, TypeScript!");
// //never return at all, used for functions that throw errors or have infinite loops
// const throwError = (message:string):never => {
//     throw new Error(message);
// }
// throwError("This is an error!");
function greet(name) {
    return `Hello, ${name} Team!`;
}
let msg = greet("Kavya");
const isEven = (n) => n % 2 == 0;
console.log(isEven(10)); //true
console.log(isEven(11)); //false
